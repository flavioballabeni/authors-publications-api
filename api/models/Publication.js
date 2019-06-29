/**
 * Publication.js
 *
 * @description :: A model definition. Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    author: {
      model: 'Author',
      required: true,
    },
    body: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
  },
};
