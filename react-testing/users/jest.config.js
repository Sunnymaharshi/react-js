export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
};
