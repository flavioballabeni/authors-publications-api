/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  require("dotenv").config();

  try {
    // checkEnvVars();

    if (process.env.RUN_SEEDERS) {
      seedFakeData(cb);
    } else {
      cb();
    }
  } catch (ex) {
    cb(ex);
  }
};

function seedFakeData(cb) {
  const drops = [];
  const seeders = [];

  sails.config.seeders.forEach(seedConfig => {
    const seed = require("../seeders/" + seedConfig.model + "Seeder");

    if (seedConfig.drop) {
      drops.push(seed.drop);
    }

    for (i = 0; i < seedConfig.qty; i++) {
      seeders.push(seed.insert);
    }
  });

  runSerial([].concat(drops, seeders))
    .then(() => cb())
    .catch(err => cb(err));
}

function runSerial(tasks) {
  let result = Promise.resolve();

  tasks.forEach(task => {
    result = result.then(() => task());
  });

  return result;
}

function checkEnvVars() {
  ["REDISTOGO_URL"].forEach(name => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} is missing`);
    }
  });
}