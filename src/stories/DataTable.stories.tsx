import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from '../components/DataTable';
import React from 'react';
import { fn } from '@storybook/test';

type Row = { id: number; name: string; email: string; age: number }
const data: Row[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@compute.io', age: 36 },
  { id: 2, name: 'Alan Turing', email: 'alan@compute.io', age: 41 },
  { id: 3, name: 'Grace Hopper', email: 'grace@navy.mil', age: 85 }
];
const columns: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
];

const meta: Meta<typeof DataTable<Row>> = {
  title: 'Data/DataTable',
  component: DataTable<Row>,
};
export default meta;

type Story = StoryObj<typeof DataTable<Row>>;

export const Basic: Story = {
  args: {
    data,
    columns,
    selectable: true,
    onRowSelect: fn(),
  },
};

export const Loading: Story = {
  args: {
    data,
    columns,
    loading: true,
    onRowSelect: fn(),
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    selectable: true,
    onRowSelect: fn(),
  },
};