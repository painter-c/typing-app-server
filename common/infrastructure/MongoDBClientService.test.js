const MongoDBClientService = require('./MongoDBClientService')
const MongoClient = require('mongodb').MongoClient
const Errors = require('../errors/Errors')

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
            const connectionString = 'mongodb://localhost:27017'
            new MongoDBClientService(new MongoClient(connectionString))
        }).not.toThrow(Errors.Database.MongoClientInvalidClientObject)
    })

    test('calling init() should call MongoClient.connect', async () => {
        const client = new MongoClient('mongodb://localhost:27017')

        const spy = jest.spyOn(client, 'connect')
            .mockImplementation(() => { Promise.resolve() })

        const clientService = new MongoDBClientService(client)

        await clientService.init()

        expect(spy).toHaveBeenCalled()
    })

    test('calling init() with an wrongly configured MongoClient object should throw an error', () => {
        const client = new MongoClient('mongodb://garbage')

        jest.spyOn(client, 'connect')
            .mockImplementation(() => Promise.reject(new Error()))

        const clientService = new MongoDBClientService(client)

        return expect(clientService.init()).rejects.toBe(Errors.Database.MongoClientInitFailure)
    })

    test('calling getClient should return a MongoClient object', () => {
        const client = new MongoClient('mongodb://foo')
        const clientService = new MongoDBClientService(client)

        expect(clientService.getClient()).toBeInstanceOf(MongoClient)
    })

    test('calling getConnection should call MongoClient.db with the database name', async () => {
        const client = new MongoClient('mongodb://foo')

        const spy = jest.spyOn(client, 'db')
            .mockImplementation(() => Promise.resolve())

        const clientService = new MongoDBClientService(client)

        await clientService.getConnection('arg')

        expect(spy).toHaveBeenCalledWith('arg')
    })

    test('calling getConnection with an invalid database name should return an error', () => {
        const client = new MongoClient('mongodb://foo')

        jest.spyOn(client, 'db')
            .mockImplementation(() => Promise.reject(new Error()))

        const clientService = new MongoDBClientService(client)

        return expect(clientService.getConnection('arg')).rejects.toBe(Errors.Database.MongoClientUnknownDatabase)
    })
})
