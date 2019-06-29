/**
 * PublicationController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const BadDataError = require('../errors/BadData');
const NotFoundError = require('../errors/NotFound');

module.exports = {
  create: async function(req, res) {
    try {
      const publicationAttb = _.pick(
        req.body,
        'author',
        'body',
        'title',
      );

      if (!isPublicationValid(publicationAttb)) {
        return res.badRequest('Must provide a valid publication object');
      }
      const authorExists = await Author.findOne({ email: publicationAttb.author });

      if (!authorExists) {
        return res.badRequest("The author email doesn't exists");
      }
      publicationAttb.author = authorExists.id;
      console.log(publicationAttb);
      const pub = await Publication.create(publicationAttb).meta({ fetch: true });
      res.ok(pub);
    } catch (err) {
      return res.serverError(err);
    }
  },

  destroy: function(req, res) {
    const publicationId = req.param('id');
    Publication.findOne({ id: publicationId })
      .then(publication => {
        if (!publication) {
          throw new NotFoundError('Publication not found');
        }
        return Publication.destroy({ id: publicationId });
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
        Publication.count(),
        Publication.find()
          .limit(limit)
          .skip(skip)
          .sort('createdAt DESC')
      ]);
      const publications = allResponses[1];
      if (!publications) {
        return res.badRequest('There is no publications related to query');
      }
      return res.ok({
        data: publications,
        pagination: {
          total: allResponses[0],
        },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  findByAuthor: async function(req, res) {
    const authorId = req.param('authorId');
    const { skip = 0, limit = 10 } = req.query;
    try {
      const allResponses = await Promise.all([
        Publication.count(),
        Publication.find({author: authorId})
          .limit(limit)
          .skip(skip)
          .sort('createdAt DESC')
      ]);
      const publications = allResponses[1];
      console.log(publications);
      console.log(authorId);
      if (!publications) {
        return res.badRequest('There is no publications related to author');
      }
      return res.ok({
        data: publications,
        pagination: {
          total: allResponses[0],
        },
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  findById: async function(req, res) {
    const publicationId = req.param('id');
    try {
      const [publication] = await Publication.find(publicationId);
      if (!publication) {
        return res.badRequest('There is no publication related to the id');
      }
      publication.author = await Author.findOne(publication.author);
      return res.ok(publication);
    } catch (err) {
      return res.serverError(err);
    }
  },

  updatePublication: async function(req, res) {
    const id = req.param('id');
    const publicationAttb = _.pick(
      req.body,
      'author',
      'body',
      'title',
    );
    try {
      const authorExists = await Author.findOne({ email: publicationAttb.author });
      if (!authorExists) {
        return res.badRequest("The author email doesn't exists");
      }
      const publicationUpdated = await Publication.update(id)
        .set(publicationAttb)
        .meta({ fetch: true });
      return res.ok(publicationUpdated);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

};

function isPublicationValid(pub) {
  const pubAttb = [
    'author',
    'body',
    'title',
  ];
  for (const attb of pubAttb) {
    if (!pub[attb]) {
      return false;
    }
  }
  return true;
}

