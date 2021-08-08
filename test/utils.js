import { render as rtlRender } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

function Providers({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

function render(ui, options = {}) {
  return rtlRender(ui, { wrapper: Providers, Providers, ...options })
}

export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { render }
