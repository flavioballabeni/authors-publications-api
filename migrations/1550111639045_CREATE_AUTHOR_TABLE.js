exports.up = pgm => {
  pgm.createTable('author', {
    id: 'id',
    name: {
      type: 'text',
      notNull: true,
    },
    email: {
      type: 'text',
      notNull: true,
    },
    dateOfBirth: {
      type: 'bigint',
      notNull: true
    },
    createdAt: 'bigint',
    updatedAt: 'bigint',
  });
  pgm.sql(
    'ALTER TABLE author DROP CONSTRAINT IF EXISTS unique_email;\
    ALTER TABLE author ADD CONSTRAINT unique_email UNIQUE ("email");'
  );
};

exports.down = pgm => {
  pgm.dropTable('author');
};
