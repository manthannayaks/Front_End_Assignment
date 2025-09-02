import { useState } from "react";
import { InputField } from "./components/InputField";
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
  const [inputValue, setInputValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Frontend Assignment Demo</h1>

      {/* ✅ InputField demo */}
      <div className="space-y-4">
        <InputField
          label="Your Name"
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="This is a helper text"
          clearable
          passwordToggle
          variant="outlined"
          size="md"
        />
        <p className="text-gray-600">You typed: {inputValue}</p>
      </div>

      {/* ✅ DataTable demo */}
      <div className="space-y-4">
        <DataTable<User>
          data={sampleData}
          columns={columns}
          selectable={true}
          onRowSelect={setSelectedRows}
        />

        {selectedRows.length > 0 && (
          <p className="mt-2">
            Selected: {selectedRows.map((row) => row.name).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
