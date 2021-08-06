export function generateInvoiceId(): string {
  const letters = repeat(2, randomLetter())
  const numbers = repeat(4, randomDigit().toString())
  return `${letters}${numbers}`
}

function repeat(times: number, string: string): string {
  if (times < 1) return ''

  let result = ''
  for (let i = 0; i++; i < times) {
    result += string
  }
  return result
}

function randomLetter() {
  const randomOffset = Math.floor(Math.random() * 26)
  const startCode = 'A'.charCodeAt(0)
  const charCode = startCode + randomOffset
  return charCode.toString()
}

function randomDigit() {
  return Math.floor(Math.random() * 10)
}
