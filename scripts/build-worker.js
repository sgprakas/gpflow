const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./core/workers/function.worker.ts'],
  outfile: './.next/workers/function.worker.js',
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  external: ['isolated-vm'], // 👈 Leave native module external
}).then(() => {
  console.log('Worker built successfully');
}).catch(() => process.exit(1));