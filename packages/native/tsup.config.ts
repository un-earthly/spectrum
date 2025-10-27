import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable for now due to workspace import issues
  clean: true,
  external: ['react', 'react-native', '@spectrum/core'],
  treeshake: true,
  splitting: false,
  sourcemap: true
})