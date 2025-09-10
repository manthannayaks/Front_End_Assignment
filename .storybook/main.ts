import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  export default {
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
