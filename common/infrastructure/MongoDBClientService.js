const Errors = require('../errors/Errors')
const MongoClient = require('mongodb').MongoClient

class MongoDBClientService {
    constructor (mongoClient) {
        if (mongoClient == null) {
            throw Errors.Database.MongoClientEmptyConstructor
        }
        if (!(mongoClient instanceof MongoClient)) {
            throw Errors.Database.MongoClientInvalidClientObject
        }

        this.mongoClient = mongoClient
    }

    async init () {
        try {
            await this.mongoClient.connect()
        } catch (error) {
            throw Errors.Database.MongoClientInitFailure
        }
    }

    getClient () {
        return this.mongoClient
    }

    async getConnection (dbName) {
        try {
            const db = await this.mongoClient.db(dbName)
            return db
        } catch (error) {
            throw Errors.Database.MongoClientUnknownDatabase
        }
    }
}

module.exports = MongoDBClientService
