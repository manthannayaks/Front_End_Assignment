import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from '../../components/InputField'
import React from 'react'

describe('InputField', () => {
  it('renders label and helper', () => {
    render(<InputField label="Email" helperText="help" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('help')).toBeInTheDocument()
  })

  it('supports clearable', () => {
    const onChange = vi.fn()
    render(<InputField label="Name" value="Ada" onChange={onChange} clearable />)
    fireEvent.click(screen.getByLabelText('Clear input'))
    expect(onChange).toHaveBeenCalled()
  })

  it('shows error when invalid', () => {
    render(<InputField label="U" invalid errorMessage="Bad" />)
    expect(screen.getByText('Bad')).toBeInTheDocument()
  })
})
