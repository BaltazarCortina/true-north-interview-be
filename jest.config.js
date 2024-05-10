/** @type {import('ts-jest').JestConfigWithTsJest} */

process.env.STARTING_CREDITS = 100;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
