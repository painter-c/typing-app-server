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
    }
}

module.exports = RegistrationErrors