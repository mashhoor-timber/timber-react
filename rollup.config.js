import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';
import { createFilter } from '@rollup/pluginutils';
import strip from '@rollup/plugin-strip';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      entryFileNames: 'index.js',
    },
    plugins: [
      {
        name: 'strip-use-client',
        transform(code, id) {
          if (
            /node_modules\/.*\.(js|mjs)$/.test(id) &&
            code.includes('"use client"')
          ) {
            return {
              code: code.replace(/["']use client["'];?/g, ''),
              map: null,
            };
          }
          return null;
        },
      },
      peerDepsExternal(),
      svgr(),
      resolve({
        browser: true,
        preferBuiltins: false,
        // Don't bundle React or React-DOM
        skip: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx'],
        compilerOptions: {
          outDir: 'dist/cjs',
          declaration: false,
          declarationMap: false,
        },
      }),
      postcss({
        extract: 'style.css',
        modules: false,
        use: ['sass'],
        minimize: true,
      }),
      terser(),
      strip({
        include: ['**/node_modules/@heroui/**/*.js', '**/node_modules/@heroui/**/*.mjs'],
        functions: [],
        labels: [],
        sourceMap: true,
      }),
    ],
    external: (id) => {
      // External all React-related packages
      if (id.startsWith('react') || id.startsWith('react-dom')) {
        return true;
      }
      
      // External specific packages
      const externals = [
        'framer-motion',
        '@heroui/react',
        'date-fns',
        '@internationalized/date',
        'yup',
        'tailwindcss'
      ];
      
      return externals.includes(id);
    },
    onwarn(warning, warn) {
      if (
        warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
        /use client/.test(warning.message)
      ) {
        return;
      }
      warn(warning);
    },
  },
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
      entryFileNames: 'index.js',
    },
    plugins: [
      {
        name: 'strip-use-client',
        transform(code, id) {
          if (
            /node_modules\/.*\.(js|mjs)$/.test(id) &&
            code.includes('"use client"')
          ) {
            return {
              code: code.replace(/["']use client["'];?/g, ''),
              map: null,
            };
          }
          return null;
        },
      },
      peerDepsExternal(),
      svgr(),
      resolve({
        browser: true,
        preferBuiltins: false,
        // Don't bundle React or React-DOM
        skip: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx'],
        compilerOptions: {
          outDir: 'dist/esm',
          declaration: false,
          declarationMap: false,
        },
      }),
      postcss({
        extract: 'style.css',
        modules: false,
        use: ['sass'],
        minimize: true,
      }),
      terser(),
      strip({
        include: ['**/node_modules/@heroui/**/*.js', '**/node_modules/@heroui/**/*.mjs'],
        functions: [],
        labels: [],
        sourceMap: true,
      }),
    ],
    external: (id) => {
      // External all React-related packages
      if (id.startsWith('react') || id.startsWith('react-dom')) {
        return true;
      }
      
      // External specific packages
      const externals = [
        'framer-motion',
        '@heroui/react',
        'date-fns',
        '@internationalized/date',
        'yup',
        'tailwindcss'
      ];
      
      return externals.includes(id);
    },
    onwarn(warning, warn) {
      if (
        warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
        /use client/.test(warning.message)
      ) {
        return;
      }
      warn(warning);
    },
  },
  // Types build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/types/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
    external: [/\.css$/, /\.scss$/],
  }
];