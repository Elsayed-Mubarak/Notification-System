"use strict";
var envs = {
    production: "production",
    development: "development",
    staging: "staging",
    test: "test",
};
var currentEnv = process.env.NODE_ENV || envs.development;
var config = require("./env/" + currentEnv + ".ts");
config.envs = envs;
config.currentEnv = currentEnv;
console.log("===================== CONFIG [" + currentEnv + "] =====================");
module.exports = config;
