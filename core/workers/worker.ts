import { Worker } from 'worker_threads';
import path from 'path';
import { NodeResult, NodeType } from '../models/node';
import { FunctionWorkerInput } from '../models/worker';

export class FunctionWorker {
  static run<T extends NodeType>(input: FunctionWorkerInput): Promise<NodeResult[T]> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.resolve(process.cwd(), '.next/workers/function.worker.js'));

      worker.on('message', (msg) => {
        resolve(msg);
        worker.terminate();
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
      });

      worker.postMessage(input);
    });
  }
}