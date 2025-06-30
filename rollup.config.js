import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  // Main build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
        svgr(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx'],
      }),
      postcss({
        extract: false,
        modules: false,
        use: ['sass'],
        minimize: true,
      }),
      terser(),
    ],
    external: [
      'react',
      'react-dom',
      '@heroui/react',
      '@tanstack/react-query',
      'formik',
      'date-fns',
      '@internationalized/date',
      'yup',
    ],
  },
  // Types build
{
  input: 'dist/types/index.d.ts', // input from tsc's output
  output: {
    file: 'dist/index.d.ts', // output that rollup will bundle
    format: 'esm',
  },
  plugins: [dts()],
  external: [/\.css$/, /\.scss$/],
}


];