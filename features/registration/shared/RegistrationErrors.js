const RegistrationErrors = {

    ConfirmationKey: {

        InvalidConstructorArg: new Error(
            'Cannot construct with invalid UUID4 string'
        )
    }
}

module.exports = RegistrationErrors