// import path from "path";
/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../admin/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../customer/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../shared-lib/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    // "@storybook/preset-create-react-app",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  /*
  webpackFinal: async (config) => {
    // Remove any existing .css rules to avoid conflicts
    config.module.rules = config.module.rules.filter(
      (rule) => !(rule.test && rule.test.toString().includes("css"))
    );
    // Add our own .css rule for all frontend packages
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            // Use root postcss.config.js automatically, but plugins can be explicit if needed
            postcssOptions: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        },
      ],
      include: [
        path.resolve(__dirname, "../admin"),
        path.resolve(__dirname, "../customer"),
        path.resolve(__dirname, "../shared-lib"),
      ],
    });
    return config;
  },
  */
};
export default config;
