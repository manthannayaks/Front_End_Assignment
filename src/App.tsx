import React from 'react'
import { InputField } from './components/InputField'
import { DataTable, Column } from './components/DataTable'

type User = { id: number; name: string; email: string; age: number }

const sample: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@compute.io', age: 36 },
  { id: 2, name: 'Alan Turing', email: 'alan@compute.io', age: 41 },
  { id: 3, name: 'Grace Hopper', email: 'grace@navy.mil', age: 85 }
]

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
]

export default function App() {
  const [value, setValue] = React.useState('')
  const [dark, setDark] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">React Components Demo</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setDark(d => !d)}
              className="px-3 py-1.5 rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
            >
              Toggle {dark ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500)}}
              className="px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700"
            >
              Simulate Loading
            </button>
          </div>
        </header>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">InputField</h2>
            <InputField
              label="Email"
              placeholder="you@example.com"
              helperText="We’ll never share your email."
              value={value}
              onChange={e => setValue(e.target.value)}
              variant="outlined"
              size="md"
              clearable
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              type="password"
              passwordToggle
              variant="filled"
              size="md"
            />
            <InputField
              label="Username (invalid)"
              placeholder="username"
              invalid
              errorMessage="This username is taken."
              variant="ghost"
              size="sm"
            />
            <InputField
              label="Loading state"
              placeholder="Fetching suggestion..."
              loading={loading}
              helperText="Displays a spinner."
              variant="outlined"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium">DataTable</h2>
            <DataTable<User>
              data={sample}
              columns={columns}
              selectable
              loading={loading}
              onRowSelect={(rows) => console.log('Selected', rows)}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
