const envs = {
  production: "production",
  development: "development",
  staging: "staging",
  test: "test",
};

const currentEnv = process.env.NODE_ENV || envs.development;
const config = require(`./env/${currentEnv}.ts`);

config.envs = envs;
config.currentEnv = currentEnv;

console.log(
  `===================== CONFIG [${currentEnv}] =====================`
);

module.exports = config;
