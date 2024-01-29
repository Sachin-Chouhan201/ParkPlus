module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageReporters: ['lcov', 'text', 'html'],
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      "\\.(jpg|jpeg|png|gif|webp|svg|ico|ttf|woff|woff2|eot)$": "identity-obj-proxy",
      '^recoil$': '<rootDir>/node_modules/recoil',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  };