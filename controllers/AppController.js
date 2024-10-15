#!/usr/bin/node

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  static getStatus (req, res) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      res.json({ redis: true, db: true });
      res.end();
    }
  }

  static async getStats (req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.json({ users, files });
    res.end();
  }
}
module.exports = AppController;
