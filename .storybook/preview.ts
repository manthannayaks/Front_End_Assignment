import type { Preview } from '@storybook/react';
import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true }
  },
};

export default preview;
