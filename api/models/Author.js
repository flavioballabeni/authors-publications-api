/**
 * Author.js
 *
 * @description :: A model definition. Represents a database table/collection/etc.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    dateOfBirth: {
      type: 'number',
      columnType: 'timestamptz',
      required: true,
    },
  },
};
