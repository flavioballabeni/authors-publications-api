let redis = require('redis');
let url = process.env.REDISTOGO_URL || 'redis://localhost:6379';
let redisClient = redis.createClient(url);

redisClient.on('ready', function() {
  console.log('Redis is ready');
});

redisClient.on('error', function() {
  console.log('Error in Redis');
});

module.exports = {
  set: (key, value, proceed) => {
    redisClient.set(key, value, function(err, reply) {
      proceed(err, reply);
    });
  },
  get: (key, proceed) => {
    redisClient.get(key, function(err, reply) {
      proceed(err, reply);
    });
  },
  del: (key, proceed) => {
    redisClient.del(key, function(err, reply) {
      if (!err) {
        if (reply === 1) {
          console.log('Key is deleted');
        } else {
          console.log("Does't exists");
        }
      }
      proceed(err, reply);
    });
  },
};
