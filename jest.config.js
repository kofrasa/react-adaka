/* eslint-disable */
// See: https://jestjs.io/docs/en/configuration.html

module.exports = {

  // The test environment that will be used for testing.
  testEnvironment: "jsdom",

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: { lines: 100 }
  },

  // A preset that is used as a base for Jest's configuration.
  preset: "ts-jest",

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        compiler: "ttypescript"
      }
    ]
  }

  // testMatch: ["**/__tests__/**/*.test.ts[x]?", "**/?(*.)+(spec|test)\.ts[x]?"],
};
