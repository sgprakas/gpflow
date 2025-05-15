import { parentPort } from 'worker_threads';
import ivm from 'isolated-vm';
import { FunctionWorkerInput } from '../models/worker';

if (!parentPort) throw new Error('No parent port in worker');

parentPort.on('message', async (input: FunctionWorkerInput) => {
  const isolate = new ivm.Isolate({ memoryLimit: 8 }); // 8 MB memory limit
  const context = await isolate.createContext();

  // Capture logs
  const logs: string[] = [];

  const jail = context.global;
  await jail.set('global', jail.derefInto());

  await context.evalClosure(`
    globalThis.console = {
      log: $0
    }
  `,
    [
      (...args: any[]) => {
        const output = args.map(arg => {
          try {
            if (typeof arg === 'object' && arg !== null) {
              return JSON.stringify(arg);
            }
            return String(arg);
          } catch (e) {
            return '[Unserializable]';
          }
        }).join(' ');
        logs.push(output);
      }
    ]);

  try {
    const wrappedCode = `
      async function run(input, env) {
        return (async () => {
          ${input.code}
        })();
      }
    `;

    const script = await isolate.compileScript(wrappedCode);
    await script.run(context, { timeout: 1000 }); // 1 sec execution time limit

    const runFn = await context.global.get('run', { reference: true });

    const result = await runFn.apply(undefined, [input.input, input.env], {
      arguments: { copy: true },
      result: { promise: true, copy: true },
      timeout: 1000,
    });
    parentPort!.postMessage({ result, logs });

  } catch (error) {
    parentPort!.postMessage({
      error: {
        message: (error as Error).message,
        stack: (error as Error).stack,
      },
      logs,
    });
  }
});