import { TimberProvider } from "../../src/providers/TimberProvider";
import { themes } from "storybook/theming";
import "./style.css";

const mockConfig = {
  apiKey: "storybook-mock-api-key",
  baseUrl: "https://mock-api.timber.me",
};

const decorators = [
  (Story) => {
    return (
      <TimberProvider config={mockConfig}>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#ffffff",
            padding: "1rem",
          }}
        >
          <Story />
        </div>
      </TimberProvider>
    );
  },
];

const parameters = {
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "light",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
    dark: {
      ...themes.dark,
      appBorderRadius: 14,
      brandTitle: "HeroUI",
      brandUrl: "https://app.timber.me",
      brandTarget: "_self",
      brandImage: "/logo.png",
    },
    light: {
      ...themes.light,
      appBorderRadius: 14,
      brandTitle: "HeroUI",
      brandUrl: "https://app.timber.me",
      brandTarget: "_self",
      brandImage: "/logo.png",
    },
  },
};

const preview = {
  decorators,
  parameters,
  tags: ["autodocs"],
};

export default preview;
