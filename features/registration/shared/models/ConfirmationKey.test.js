const ConfirmationKey = require('./ConfirmationKey')
const RegistrationErrors = require('../RegistrationErrors')
const validator = require('validator')

function isUUID4(received) {
    const pass = validator.isUUID(received, 4)
    if (pass) {
        return {
            message: () => `Expected '${received}' not to be a valid UUID4`,
            pass: true
        }
    }
    else {
        return {
            message: () => `Expected '${received}' to be a valid UUID4`,
            pass: false
        }
    }
}

expect.extend({isUUID4})

describe('ConfirmationKey', () => {

    test('validate should return true if passed a valid UUID version 4', () => {
        let uuid4 = 'af4fd497-30cc-479a-aa7d-3fb4320bc86d'
        expect(ConfirmationKey.validate(uuid4)).toBe(true)
    })

    test('validate should return false if passed an invalid UUID version 4', () => {
        let invalid = 'notauuid'
        expect(ConfirmationKey.validate(invalid)).toBe(false)
    })

    test('should return error if constructed with invalid UUID version 4', () => {
        let invalid = 'notauuid'
        expect(() => {
            new ConfirmationKey(invalid)
        }).toThrow(RegistrationErrors.ConfirmationKey.InvalidConstructorArg)
    })

    test('constructed object should have value property containing UUID4 string', () => {
        let uuid4 = 'af4fd497-30cc-479a-aa7d-3fb4320bc86d'
        let key = new ConfirmationKey(uuid4)
        expect(key.value).toBe(uuid4)
    })

    test('generate should return a valid UUID4 string', () => {
        expect(ConfirmationKey.generate()).isUUID4()
    })
})