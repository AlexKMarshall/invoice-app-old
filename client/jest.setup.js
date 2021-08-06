import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { server } from '@mocks/server/test-server'

process.env.DEBUG_PRINT_LIMIT = 1500

beforeAll(() => {
  server.listen()
})
afterAll(() => {
  server.close()
})
afterEach(() => {
  server.resetHandlers()
})
