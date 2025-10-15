import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from "@storybook/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      themes: { light: '', dark: 'dark' },
    }),
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <Story />
        </ChakraProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
