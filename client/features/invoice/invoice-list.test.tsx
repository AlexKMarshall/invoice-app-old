import { render, screen } from '@testing-library/react'
import { InvoiceList } from './invoice-list'

it('should display heading', () => {
  render(<InvoiceList />)
  screen.debug()
})
