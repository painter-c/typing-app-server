const MongoDBClientService = require('./MongoDBClientService')
const MongoClient = require('mongodb').MongoClient
const Db = require('mongodb').Db
const Errors = require('../../errors/ApplicationErrors')

describe('MongoDBClientService', () => {

    test('should throw an error if nothing is passed into it', () => {

        expect(() => {
            new MongoDBClientService()
        }).toThrow(Errors.Database.MongoClientEmptyConstructor)
    })

    test('should throw an error if passed an invalid MongoClient object', () => {

        expect(() => {
            new MongoDBClientService(false)
        }).toThrow(Errors.Database.MongoClientInvalidClientObject)
    })

    test('should not throw an error if passed a valid MongoClient object', () => {

        expect(() => {
            let connectionString = 'mongodb://localhost:27017'
            new MongoDBClientService(new MongoClient(connectionString))
        }).not.toThrow(Errors.Database.MongoClientInvalidClientObject)
    })

    test('calling init() should call MongoClient.connect', async () => {
        
        let client = new MongoClient('mongodb://localhost:27017')

        let spy = jest.spyOn(client, 'connect')
            .mockImplementation(() => {Promise.resolve()})
        
        let clientService = new MongoDBClientService(client)

        await clientService.init()

        expect(spy).toHaveBeenCalled()
    })

    test('calling init() with an wrongly configured MongoClient object should throw an error', () => {

        let client = new MongoClient('mongodb://garbage')

        jest.spyOn(client, 'connect')
            .mockImplementation(() => Promise.reject())

        let clientService = new MongoDBClientService(client)

        return expect(clientService.init()).rejects.toBe(Errors.Database.MongoClientInitFailure)
    })

    test('calling getClient should return a MongoClient object', () => {

        let client = new MongoClient('mongodb://foo')
        let clientService = new MongoDBClientService(client)

        expect(clientService.getClient()).toBeInstanceOf(MongoClient)
    })

    test('calling getConnection should call MongoClient.db with the database name', async () => {

        let client = new MongoClient('mongodb://foo')

        let spy = jest.spyOn(client, 'db')
            .mockImplementation(() => Promise.resolve())

        let clientService = new MongoDBClientService(client)

        await clientService.getConnection('arg')

        expect(spy).toHaveBeenCalledWith('arg')
    })

    test('calling getConnection with an invalid database name should return an error', () => {

        let client = new MongoClient('mongodb://foo')

        jest.spyOn(client, 'db')
            .mockImplementation(() => Promise.reject())

        let clientService = new MongoDBClientService(client)

        return expect(clientService.getConnection('arg')).rejects.toBe(Errors.Database.MongoClientUnknownDatabase)
    })
})