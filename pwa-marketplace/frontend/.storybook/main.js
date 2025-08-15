import { mergeConfig } from "vite";

const config = {
  stories: [
    "../admin/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../customer/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../shared-lib/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    // "@storybook/addon-interactions",
    // "storybook-dark-mode", // It's not recognised by Storybook 9.0+, waiting for an update
  ],
  framework: {
    name: "@storybook/react-vite", // or "@storybook/vue-vite", etc.
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  /**
  docs: {
    autodocs: true,
  },
  */
  async viteFinal(config) {
    return mergeConfig(config, {
      // Your custom Vite configuration here
    });
  },
};

export default config;
