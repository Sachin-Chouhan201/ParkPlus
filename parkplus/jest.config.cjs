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
    // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transformIgnorePatterns: [
      "/node_modules/(?!react-toastify)", // Ignore node_modules except for react-toastify
      "\\.css$"
    ],
    // eslint-disable-next-line no-dupe-keys
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
  };