module.exports = {
  setupFilesAfterEnv: ['./jest.setup.node.js'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/$1',
    // '\\.(jpg)$': '<rootDir>/__mocks__/fileMock.js',
    // '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testRegex: '.test.ts$',
  testEnvironment: 'node',
  collectCoverageFrom: [
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
  coverageDirectory: './coverage/node',
}
