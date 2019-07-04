/**
 * AuthorController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const BadDataError = require('../errors/BadData');
const NotFoundError = require('../errors/NotFound');
const _ = require('underscore');

module.exports = {
  create: async function(req, res) {
    try {
      const authorAttb = _.pick(req.body, 'name', 'email', 'dateOfBirth');
      if (!isAuthorValid(authorAttb)) {
        return res.badRequest('Must provide a valid author object');
      }
      const authorExists = await Author.find({ email: authorAttb.email });
      if (!_.isEmpty(authorExists)) {
        return res.badRequest('This author already exits');
      }
      const author = await Author.create(authorAttb).meta({ fetch: true });
      return res.ok(author);
    } catch (err) {
      return res.serverError(err);
    }
  },

  destroy: function(req, res) {
    const authorId = req.param('id');
    Author.findOne({ id: authorId })
      .then(author => {
        if (!author) {
          throw new NotFoundError('Author not found');
        }
        return Author.destroy({ id: authorId });
      })
      .then(res.ok)
      .catch(NotFoundError, e => {
        return res.notFound(e.message);
      })
      .catch(BadDataError, e => {
        return res.badRequest(e.message);
      })
      .catch(res.serverError);
  },

  findAll: async function(req, res) {
    const { skip = 0, limit = 10 } = req.query;
    try {
      const allResponses = await Promise.all([
        Author.count(),
        Author.find()
          .populate('publication')
          .limit(limit)
          .skip(skip)
          .sort('name ASC'),
      ]);
      const authors = allResponses[1];
      if (!authors) {
        return res.badRequest('There is no authors related to query');
      }
      return res.ok({
        data: authors,
        pagination: {
          total: allResponses[0],
        },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  findById: async function(req, res) {
    const authorId = req.param('id');
    if (!authorId) {
      return res.notFound('Need provide an id param');
    }
    try {
      const [author] = await Author.find(authorId).populate('publication');
      if (!author) {
        return res.badRequest('There is no author related to the id');
      }
      // author.publication = await Publication.find({ author: author.id });
      return res.ok(author);
    } catch (err) {
      return res.serverError(err);
    }
  },

  updateAuthor: async function(req, res) {
    const authorId = req.param('id');
    if (!authorId) {
      return res.notFound('Need provide an id param');
    }
    const authorAttb = _.pick(req.body, 'name', 'email', 'dateOfBirth');
    try {
      const authorUpdated = await Author.update(authorId)
        .set(authorAttb)
        .meta({ fetch: true });
      return res.ok(authorUpdated);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};

function isAuthorValid(author) {
  const authorAttb = ['name', 'email', 'dateOfBirth'];
  for (const attb of authorAttb) {
    if (!author[attb]) {
      return false;
    }
  }
  return true;
}
