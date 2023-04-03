const PendingConfirmation = require('./PendingConfirmation')
const ConfirmationKey = require('./ConfirmationKey')
const RegistrationErrors = require('../RegistrationErrors')

describe('PendingConfirmation', () => {

    test('should throw an error if invalid ConfirmationKey passed into constructor', () => {
        let badKey = 'foo'
        expect(() => {
            new PendingConfirmation(badKey, 'userid')
        }).toThrow(RegistrationErrors.PendingConfirmation.InvalidConfirmationKey)
    })

    test('should have confirmationKey and userId properties', () => {
        let key = new ConfirmationKey(ConfirmationKey.generate())
        let id = 'userid'
        let pc = new PendingConfirmation(key, id)
        expect(pc.confirmationKey.value).toBe(key.value)
        expect(pc.userId).toBe(id)
    })

    test('should throw error if null or undefined is passed to userId in constructor', () => {
        let key = new ConfirmationKey(ConfirmationKey.generate())
        expect(() => {
            new PendingConfirmation(key, null)
        }).toThrow(RegistrationErrors.PendingConfirmation.InvalidUserId)
        expect(() => {
            new PendingConfirmation(key, undefined)
        }).toThrow(RegistrationErrors.PendingConfirmation.InvalidUserId)
    })
})