// jest.config.ts
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  extensionsToTreatAsEsm: [".ts"], // important for ts-jest with ESM
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default config;
