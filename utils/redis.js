const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => {
            console.log(`Redis client error: ${err}`);
        });
    }

    isAlive() {
        if (this.client.connected) {
            return true
        } else{
            return false
        }
    }

    async get (key) {
        return new Promise((res, rej) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    rej(err);
                } else {
                    res(reply)
                }
            });
        });
    }

    async set (key, value, dur) {
        return new Promise((res, rej) => {
            this.client.set(key, value, 'EX', dur, (err, reply) => {
                if (err) {
                    rej(err)
                } else {
                    res(reply)
                }
            });
        });
    }

    async del (key) {
        return new Promise((res, rej) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    rej(err)
                } else {
                    res(reply)
                }
            });
        });
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
