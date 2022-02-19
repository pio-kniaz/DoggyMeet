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
    '^@helpers(.*)$': '<rootDir>/src/utils/helpers/$1',
    '^@hooks(.*)$': '<rootDir>/src/utils/hooks/$1',
    '^@constants(.*)$': '<rootDir>/src/utils/constants/$1',
    '^@interfaces(.*)$': '<rootDir>/src/utils/interfaces/$1',
    '^@services(.*)$': '<rootDir>/src/utils/services/$1',
    '^@redux(.*)$': '<rootDir>/src/redux/$1',
    '^@routes(.*)$': '<rootDir>/src/routes/$1',
    '^@styles(.*)$': '<rootDir>/src/styles/$1',
    '^@queries(.*)$': '<rootDir>/src/queries/$1',
  },
};
