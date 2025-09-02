// App.tsx
import { useState } from "react";
import { DataTable, Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 22, email: "charlie@example.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

function App() {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Frontend Assignment Demo</h1>

      {/* ✅ DataTable with selection & sorting */}
      <DataTable<User>
        data={sampleData}
        columns={columns}
        selectable
        onRowSelect={(rows) => setSelectedRows(rows)}
      />

      {selectedRows.length > 0 && (
        <p className="mt-4">
          Selected: {selectedRows.map((row) => row.name).join(", ")}
        </p>
      )}
    </div>
  );
}

export default App;
