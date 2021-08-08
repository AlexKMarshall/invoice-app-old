module.exports = {
  setupFilesAfterEnv: ['./jest.setup.dom.js'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^@/prisma(.*)$': '<rootDir>/prisma/$1',
    // '\\.(jpg)$': '<rootDir>/__mocks__/fileMock.js',
    // '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testRegex: '.test.tsx$',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/**/*.tsx',
    '<rootDir>/**/*.ts',
    '!.*\\.spec\\.ts$',
    '!.*\\.test\\.ts$',
    '!**/test/**',
    '!**/types/**',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/.next',
    '<rootDir>/src/prisma',
    '<rootDir>/src/mocks',
    '<rootDir>/src/test',
  ],
  coverageDirectory: './coverage/dom',
}
