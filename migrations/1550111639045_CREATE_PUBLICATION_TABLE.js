exports.up = pgm => {
  pgm.createTable('publication', {
    id: 'id',
    author: {
      type: 'integer',
      references: 'author',
      notNull: true,
      onDelete: 'cascade',
    },
    body: {
      type: 'string',
      notNull: true,
    },
    title: {
      type: 'string',
      notNull: true,
    },
    createdAt: 'bigint',
    updatedAt: 'bigint',
  });
};

exports.down = pgm => {
  pgm.dropTable('publication');
};
