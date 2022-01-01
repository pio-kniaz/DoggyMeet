module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@pages(.*)$': '<rootDir>/src/pages/$1',
    '^@assets(.*)$': '<rootDir>/src/assets/$1',
    '^@components(.*)$': '<rootDir>/src/components/$1',
    '^@helpers(.*)$': '<rootDir>/src/helpers/$1',
    '^@redux(.*)$': '<rootDir>/src/redux/$1',
    '^@routes(.*)$': '<rootDir>/src/routes/$1',
    '^@styles(.*)$': '<rootDir>/src/styles/$1',
  },
};
