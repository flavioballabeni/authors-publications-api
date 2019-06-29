const faker = require('faker');
const moment = require("moment");

module.exports = {
  drop: () => Author.destroy({}),

  insert: () => {
    if (process.env.RUN_SEEDERS) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const name = firstName + ' ' + lastName;
      const email = firstName + '.' + lastName + '@example.com';
      const dateOfBirth = faker.date.past();

      return Author.create({
        name: name,
        email: email.toLocaleLowerCase(),
        dateOfBirth: moment(dateOfBirth).unix(),
      });
    }
  },
};