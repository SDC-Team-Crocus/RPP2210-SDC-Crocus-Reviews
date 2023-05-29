const redis = require('ioredis');

const redisClient = redis.createClient({
  host:'172.17.0.3', //ip address of the redis container
  port: 6379,
  postword: 'password'
});

// const redisClient = redis.createClient();

const expiration = 36000;

redisClient.on('connect',() => {
    console.log('connected to redis successfully!');
})

redisClient.on('error',(error) => {
    console.log('Redis connection error :', error);
})


exports.getOrSetCache = (key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) {
        return reject(error);
      }

      if (data != null) {
        return resolve(JSON.parse(data));
      }

      try {
        const freshData = await cb();
        redisClient.setex(key, expiration, JSON.stringify(freshData));
        resolve(freshData);
      } catch (err) {
        reject(err);
      }
    });
  });
};




// const Redis = require('redis');

// const redisClient = Redis.createClient() //can pass the production instance of redis

// const start = async () => {
//   await redisClient.connect();
// };
// start();

// const expiration = 3600;

// exports.getOrSetCache = (key, cb) => {
//   return new Promise((resolve, reject)=> {
//     redisClient.get(key, async (error, data)=>{
//       if (error) return reject(error);
//       if (data != null) return resolve(JSON.parse(data));
//       const freshData = await cb();
//       redisClient.setex(key, expiration, JSON.stringify(freshData));
//       resolve(freshData)
//     })
//   })
// }

// // module.exports.getOrSetCache = getOrSetCache;

// const Redis = require('redis');
// const redisClient = Redis.createClient();
// redisClient.connect();