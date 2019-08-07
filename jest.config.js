// tslint:disable
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  rootDir: './test/jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
  globals: {
    'ts-jest': {
      tsConfig: 'test/jest/tsconfig.json'
    }
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
