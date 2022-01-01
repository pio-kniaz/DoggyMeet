module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@pages(.*)$': '<rootDir>/src/pages/$1',
  },
};
