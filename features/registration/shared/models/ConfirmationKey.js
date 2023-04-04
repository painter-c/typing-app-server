const crypto = require('node:crypto')
const validator = require('validator')
const RegistrationErrors = require('../RegistrationErrors')

class ConfirmationKey {
    constructor (confirmationKeyString) {
        if (!ConfirmationKey.validate(confirmationKeyString)) {
            throw RegistrationErrors.ConfirmationKey.InvalidConstructorArg
        }

        this.value = confirmationKeyString
    }

    static validate (confirmationKeyString) {
        return validator.isUUID(confirmationKeyString, 4)
    }

    static generate () {
        return crypto.randomUUID()
    }

    equals (other) {
        return this.value === other.value
    }
}

module.exports = ConfirmationKey
