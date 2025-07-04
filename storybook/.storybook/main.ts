import {dirname, join} from "path";
import remarkGfm from "remark-gfm";
import type {StorybookConfig} from "@storybook/react-vite";
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
    "./addons/react-strict-mode/register"
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
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../../src/components"),
      "@hooks": path.resolve(__dirname, "../../src/hooks"),
      "@utils": path.resolve(__dirname, "../../src/utils"),
      "@types": path.resolve(__dirname, "../../src/types"),
    };
    
    return config;
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

export default config;
