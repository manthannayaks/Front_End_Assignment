import React from 'react'
import { clsx } from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyText?: string
}

type SortState<T> = { key: keyof T, direction: 'asc' | 'desc' } | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyText = 'No data'
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>(null)
  const [selectedKeys, setSelectedKeys] = React.useState<Set<number>>(new Set())

  // Apply sorting
  const sorted = React.useMemo(() => {
    if (!sort) return data
    const { key, direction } = sort
    const copy = [...data]
    copy.sort((a, b) => {
      const av = a[key]
      const bv = b[key]
      if (av == null && bv != null) return -1
      if (av != null && bv == null) return 1
      if (av == null && bv == null) return 0
      if (typeof av === 'number' && typeof bv === 'number') return direction === 'asc' ? av - bv : bv - av
      return direction === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })
    return copy
  }, [data, sort])

  // Handle sorting toggle
  function toggleSort(col: Column<T>) {
    if (!col.sortable) return
    const key = col.dataIndex as keyof T
    setSort(prev => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' }
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
    })
  }

  // Handle row selection
  function toggleSelect(index: number) {
    const next = new Set(selectedKeys)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    setSelectedKeys(next)
  }

  // Emit selected rows when selection changes
  React.useEffect(() => {
    if (!onRowSelect) return
    const rows = [...selectedKeys].map(i => sorted[i]).filter(Boolean)
    onRowSelect(rows as T[])
  }, [selectedKeys, sorted, onRowSelect])

  return (
    <div className="w-full overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
      <table className="w-full text-left border-collapse" role="table">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && <th className="w-10 p-3">
              <span className="sr-only">Select</span>
            </th>}
            {columns.map(col => {
              const isSorted = sort && sort.key === col.dataIndex
              const ariaSort = isSorted ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : 'none'
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort as any}
                  className={clsx("p-3 text-sm font-semibold text-gray-700 dark:text-gray-200 select-none",
                    col.sortable && "cursor-pointer")}
                  onClick={() => toggleSort(col)}
                >
                  <div className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden className="text-xs">
                        {isSorted ? (sort!.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 3 }).map((_, r) => (
              <tr key={'s' + r} className="animate-pulse-slow">
                {selectable && <td className="p-3"><div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"/></td>}
                {columns.map((c, i) => (
                  <td key={c.key + i} className="p-3">
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td className="p-6 text-center text-sm text-gray-500" colSpan={(columns.length + (selectable ? 1 : 0))}>
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, rIndex) => (
              <tr key={rIndex} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-950">
                {selectable && (
                  <td className="p-3 align-middle">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${rIndex + 1}`}
                      className="h-4 w-4"
                      checked={selectedKeys.has(rIndex)}
                      onChange={() => toggleSelect(rIndex)}
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className="p-3 text-sm">
                    {col.render ? col.render(row[col.dataIndex], row) : String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
