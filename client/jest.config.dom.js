module.exports = {
  setupFilesAfterEnv: ['./jest.setup.dom.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@mocks/(.*)$': '<rootDir>/mocks/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
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
    '<rootDir>/prisma',
    '<rootDir>/mocks',
    '<rootDir>/test',
  ],
  coverageDirectory: './coverage/dom',
}
