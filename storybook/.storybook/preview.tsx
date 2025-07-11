import { TimberProvider } from "../../src/providers/TimberProvider";
import { themes } from "storybook/theming";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let globalApiToken = "";

if (typeof window !== "undefined") {
  globalApiToken = localStorage.getItem("storybook-api-token") || "";
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const decorators = [
  (Story, context) => {
    const apiToken = context.args?.apiToken || context.globals?.apiToken;

    if (apiToken && apiToken !== globalApiToken) {
      globalApiToken = apiToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("storybook-api-token", apiToken);
      }
    }

    const config = {
      apiKey:
        apiToken || globalApiToken || "demo-token-please-enter-real-token",
    };

    return (
      <QueryClientProvider client={queryClient}>
        <TimberProvider config={config}>
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
      </QueryClientProvider>
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
      brandTitle: "Timber",
      brandUrl: "https://app.timber.me",
      brandTarget: "_self",
      brandImage: "/logo.png",
    },
    light: {
      ...themes.light,
      appBorderRadius: 14,
      brandTitle: "Timber",
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
  args: {
    apiToken: globalApiToken,
  },
  argTypes: {
    apiToken: {
      name: "API Token",
      control: {
        type: "text",
      },
      table: {
        category: "Global Configuration",
      },
    },
  },
};

export default preview;
