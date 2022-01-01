module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/utils/test-utils/setupTests.ts'],
  testEnvironment: 'jsdom',
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
