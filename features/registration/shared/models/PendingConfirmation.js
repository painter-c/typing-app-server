const ConfirmationKey = require('./ConfirmationKey')
const RegistrationErrors = require('../RegistrationErrors')

class PendingConfirmation {
    constructor (confirmationKey, userId) {
        if (!(confirmationKey instanceof ConfirmationKey)) {
            throw RegistrationErrors.PendingConfirmation.InvalidConfirmationKey
        }

        if (userId == null) {
            throw RegistrationErrors.PendingConfirmation.InvalidUserId
        }

        this.confirmationKey = confirmationKey
        this.userId = userId
    }
}

module.exports = PendingConfirmation
