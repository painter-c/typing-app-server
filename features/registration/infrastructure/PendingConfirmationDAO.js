const RegistrationErrors = require('../shared/RegistrationErrors')
const ConfirmationKey = require('../shared/models/ConfirmationKey')
const PendingConfirmation = require('../shared/models/PendingConfirmation')

class PendingConfirmationDAO {
    dbName = 'typing-app-db'
    collectionName = 'pending-confirmation'

    constructor (clientService) {
        this.clientService = clientService
    }

    async #getCollection () {
        const db = await this.clientService.getConnection(this.dbName)
        const collection = await db.collection(this.collectionName)
        return collection
    }

    async create (pendingConfirmation) {
        if (pendingConfirmation == null) {
            throw RegistrationErrors.PendingConfirmationDAO.NullPassedToCreate
        }

        const collection = await this.#getCollection()

        await collection.insertOne({
            confirmationKey: pendingConfirmation.confirmationKey.value,
            userId: pendingConfirmation.userId
        })
    }

    async read (confirmationKey) {
        if (!(confirmationKey instanceof ConfirmationKey)) {
            throw RegistrationErrors
                .PendingConfirmationDAO.InvalidConfirmationKeyPassedToRead
        }

        const collection = await this.#getCollection()

        const result = await collection.findOne({ confirmationKey: confirmationKey.value })

        if (result != null) {
            const key = new ConfirmationKey(result.confirmationKey)

            return new PendingConfirmation(
                key,
                result.userId
            )
        }
        return null
    }

    async delete (confirmationKey) {
        if (!(confirmationKey instanceof ConfirmationKey)) {
            throw RegistrationErrors
                .PendingConfirmationDAO.InvalidConfirmationKeyPassedToRead
        }

        const collection = await this.#getCollection()

        collection.deleteOne({ confirmationKey: confirmationKey.value })
    }
}

module.exports = PendingConfirmationDAO
