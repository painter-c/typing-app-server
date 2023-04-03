const ApplicationErrors = {
    
    Database: {

        MongoClientEmptyConstructor: new Error(
            'MongoDBClientService must be provided with MongoClient instance'
        ),

        MongoClientInvalidClientObject: new Error(
            'MongoDBClientService must be provided with a valid MongoClient instance'
        ),

        MongoClientInitFailure: new Error(
            'MongoDBClientService init failed, check MongoClient configuration'
        ),

        MongoClientUnknownDatabase: new Error(
            'Unknown database name'
        )
    }
}

module.exports = ApplicationErrors