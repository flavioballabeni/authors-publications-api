exports.up = pgm => {
  pgm.createTable('system_settings', {
    id: 'id',
    key: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    value: 'text',
    createdAt: 'bigint',
    updatedAt: 'bigint',
  });
};

exports.down = pgm => {
  pgm.dropTable('system_settings');
};
