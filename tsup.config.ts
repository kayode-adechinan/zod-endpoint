import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/spec.ts',
        'src/server.ts',
        'src/client.ts'
    ],
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['esm', 'cjs']
});
