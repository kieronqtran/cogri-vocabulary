
const NodeEnvironment = require('jest-environment-node');

const database = global.__SQLJS__;

/**
 * Jest runs each test files in the single thread and has it own environment.
 * Passing the initialized sql.js db instance into each test files
 * from the db instance of setup.js
 */
module.exports = class SqlJsEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    this.global.__SQLJS__ = database;

    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}
