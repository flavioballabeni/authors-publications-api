const resolveNativeQuery = async function resolveNativeQuery(query) {
  return new Promise(function(resolve, reject) {
    Question.getDatastore().sendNativeQuery(query, function(err, data) {
      if (err) return reject(err);
      resolve(data.rows);
    });
  });
};

module.exports = {
  resolveNativeQuery,
};
