import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default {
  // your existing config...
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // This makes Storybook assets work on GitHub Pages
    config.base = '/Front_End_Assignment/';
    return config;
  },
};
