module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@pages(.*)$': '<rootDir>/src/pages/$1',
    '^@assets(.*)$': '<rootDir>/src/assets/$1',
    '^@components(.*)$': '<rootDir>/src/components/$1',
    '^@helpers(.*)$': '<rootDir>/src/utils/helpers/$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks/$1',
    '^@constants(.*)$': '<rootDir>/src/utils/constants/$1',
    '^@interfaces(.*)$': '<rootDir>/src/utils/interfaces/$1',
    '^@services(.*)$': '<rootDir>/src/utils/services/$1',
    '^@routes(.*)$': '<rootDir>/src/routes/$1',
    '^@styles(.*)$': '<rootDir>/src/styles/$1',
    '^@queries(.*)$': '<rootDir>/src/queries/$1',
  },
  modulePathIgnorePatterns: ['@reduxjs'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
};
