import { TimberProvider } from "../../src/providers/TimberProvider";
import { themes } from "storybook/theming";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let globalApiToken = "";

if (typeof window !== "undefined") {
  globalApiToken = localStorage.getItem("storybook-api-token") || "";
}

// Create a single QueryClient instance with proper configuration for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Don't retry failed requests in Storybook
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // Don't refetch on window focus in Storybook
    },
    mutations: {
      retry: false, // Don't retry failed mutations in Storybook
    },
  },
});

const decorators = [
  (Story, context) => {
    // Get token from args (Controls panel) or globals
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
  args: {
    apiToken: globalApiToken,
  },
  argTypes: {
    apiToken: {
      name: "API Token",
      description: "Enter your Timber API token (saved in localStorage)",
      control: {
        type: "text",
      },
      table: {
        category: "Global Configuration",
        defaultValue: { summary: "From localStorage" },
      },
    },
  },
};

export default preview;
