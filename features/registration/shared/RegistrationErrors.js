const RegistrationErrors = {
    ConfirmationKey: {
        InvalidConstructorArg: new Error(
            'Cannot construct with invalid UUID4 string'
        )
    },
    PendingConfirmation: {
        InvalidConfirmationKey: new Error(
            'confirmationKey not instance of class ConfirmationKey'
        ),
        InvalidUserId: new Error(
            'userId cannot be null or undefined'
        )
    },
    PendingConfirmationDAO: {
        NullPassedToCreate: new Error(
            'Cannot call create with null PendingConfirmation object'
        ),
        InvalidConfirmationKeyPassedToRead: new Error(
            'Invalid ConfirmationKey object passed to read'
        )
    }
}

module.exports = RegistrationErrors
