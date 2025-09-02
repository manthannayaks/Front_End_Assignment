# Front_End_Assignment

# React Component Assignment – InputField & DataTable

Tech: **React 18 · TypeScript · TailwindCSS · Storybook · Vitest**

## Quickstart

```bash
# 1) Install
npm i

# 2) Run the dev demo (Vite)
npm run dev

# 3) Run Storybook
npm run storybook

# 4) Run tests
npm test
```

Deploy Storybook with **Chromatic** or **Vercel** per your assignment.

## Components

### `InputField`
- Label, placeholder, helper & error
- States: `disabled`, `invalid`, `loading`
- Variants: `filled | outlined | ghost`
- Sizes: `sm | md | lg`
- Options: `clearable`, `passwordToggle`, light/dark support (via `dark` class on parent)

**Props**
```ts
export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: React.HTMLInputTypeAttribute;
  clearable?: boolean;
  passwordToggle?: boolean;
  id?: string;
}
```

### `DataTable<T>`
- Sortable columns
- Optional row selection (multi-select)
- Loading skeleton & empty state
- Accessible headers with `aria-sort`

**Types**
```ts
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyText?: string;
}
```

## Project Structure
```
.
├─ .storybook/          # Storybook config
├─ src/
│  ├─ components/
│  │  ├─ InputField.tsx
│  │  ├─ DataTable.tsx
│  │  ├─ index.ts
│  │  └─ __tests__/
│  │     ├─ InputField.test.tsx
│  │     └─ DataTable.test.tsx
│  ├─ stories/
│  │  ├─ InputField.stories.tsx
│  │  └─ DataTable.stories.tsx
│  ├─ App.tsx            # Demo usage
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.ts
├─ tsconfig.json
└─ tsconfig.node.json
```

## Accessibility
- Inputs: `aria-invalid`, `aria-describedby` for helper text, clear button with `aria-label`.
- Table headers expose `aria-sort` and use large click targets. Row selection has checkbox labels.

## Notes
- Selection is multi-select by default when `selectable` is true.
- Sorting toggles asc/desc on click when `sortable` is enabled for the column.
- Dark mode: wrap in a parent with `class="dark"` to preview.

---

**Approach**: Clean prop-driven APIs, Tailwind utility variants, strong TypeScript generics for `DataTable<T>`, Storybook-driven development, and unit tests for core behaviors.
