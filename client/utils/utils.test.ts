import { randomDigit, randomLetter, generateInvoiceId } from '.'

describe('randomDigit', () => {
  it('should generate random number between 0 and 9', () => {
    const result = randomDigit()

    expect(result).toBeLessThanOrEqual(9)
    expect(result).toBeGreaterThanOrEqual(0)
  })
})

describe('randomLetter', () => {
  it('should generate random letter between A and Z', () => {
    const result = randomLetter()

    expect(result).toEqual(expect.stringMatching(/[A-Z]/))
  })
})

describe('generateInvoiceId', () => {
  it('should generate invoice in format AB1234', () => {
    const result = generateInvoiceId()

    const characters = result.split('')
    expect(characters).toHaveLength(6)

    expect(characters[0]).toEqual(expect.stringMatching(/[A-Z]/i))
    expect(characters[1]).toEqual(expect.stringMatching(/[A-Z]/i))
    expect(parseInt(characters[2])).toBeLessThanOrEqual(9)
    expect(parseInt(characters[2])).toBeGreaterThanOrEqual(0)
    expect(parseInt(characters[3])).toBeLessThanOrEqual(9)
    expect(parseInt(characters[3])).toBeGreaterThanOrEqual(0)
    expect(parseInt(characters[4])).toBeLessThanOrEqual(9)
    expect(parseInt(characters[4])).toBeGreaterThanOrEqual(0)
    expect(parseInt(characters[5])).toBeLessThanOrEqual(9)
    expect(parseInt(characters[5])).toBeGreaterThanOrEqual(0)
  })
})
