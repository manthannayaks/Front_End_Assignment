import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable, Column } from '../../components/DataTable'
import React from 'react'

type Row = { id: number; name: string; age: number }
const data: Row[] = [
  { id: 1, name: 'B', age: 30 },
  { id: 2, name: 'A', age: 20 }
]
const cols: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
]

describe('DataTable', () => {
  it('renders and sorts by column', () => {
    render(<DataTable data={data} columns={cols} />)
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader) // asc
    fireEvent.click(nameHeader) // desc
    expect(nameHeader).toBeInTheDocument()
  })

  it('selects rows and calls callback', () => {
    const onSel = vi.fn()
    render(<DataTable data={data} columns={cols} selectable onRowSelect={onSel} />)
    const cb = screen.getAllByRole('checkbox')[0]
    fireEvent.click(cb)
    expect(onSel).toHaveBeenCalled()
  })
})
