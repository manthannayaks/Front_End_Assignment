import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../components/InputField';
import React from 'react'

const meta: Meta<typeof InputField> = {
  title: 'Forms/InputField',
  component: InputField,
  args: {
    label: 'Label',
    placeholder: 'Type here...',
    helperText: 'Helper info',
    variant: 'outlined',
    size: 'md'
  }
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Basic: Story = {}

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'This field is required' }
}

export const Loading: Story = {
  args: { loading: true }
}

export const Password: Story = {
  args: { type: 'password', passwordToggle: true, placeholder: '••••••••' }
}

export const Variants: Story = {
  render: (args) => (
    <div className="space-y-3 w-96">
      <InputField {...args} variant="filled" label="Filled" />
      <InputField {...args} variant="outlined" label="Outlined" />
      <InputField {...args} variant="ghost" label="Ghost" />
    </div>
  )
}

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-3 w-96">
      <InputField {...args} size="sm" label="Small" />
      <InputField {...args} size="md" label="Medium" />
      <InputField {...args} size="lg" label="Large" />
    </div>
  )
}
