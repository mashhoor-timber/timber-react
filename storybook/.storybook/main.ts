import { dirname, join } from "path";
import remarkGfm from "remark-gfm";
import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "./welcome.mdx",
    "../../src/components/forms/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  staticDirs: ["../public"],

  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-links"),
    // getAbsolutePath("storybook-dark-mode"),
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "./addons/react-strict-mode/register",
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: false,
  },

  async viteFinal(config) {
    // Configure build options to properly handle @tanstack/react-query
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    
    // Reset external to empty array to ensure nothing gets externalized inappropriately
    config.build.rollupOptions.external = [];
    
    // Configure dependency optimization
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      '@tanstack/react-query',
      'sonner'
    ];

    // Configure resolve aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../../src/components"),
      "@hooks": path.resolve(__dirname, "../../src/hooks"),
      "@utils": path.resolve(__dirname, "../../src/utils"),
      "@types": path.resolve(__dirname, "../../src/types"),
      // Mock the TimberProvider to avoid React Query dependency in Storybook
      // "@/providers/TimberProvider": path.resolve(__dirname, "./TimberProviderMock"),
    };

    // Ensure proper dependency resolution
    config.define = config.define || {};
    config.define.global = 'globalThis';

    return config;
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

export default config;
