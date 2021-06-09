const tsPreset = require('ts-jest/jest-preset');

const mongoPreset = require('@shelf/jest-mongodb/jest-preset');

const jestOverwrites = {
  testMatch: ['**/tests/**/?(*.)+(spec|test).ts?(x)'],
  roots: ['<rootDir>/tests'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules'],
};

module.exports = { ...tsPreset, ...mongoPreset, ...jestOverwrites };
