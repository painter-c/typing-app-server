const ConfirmationCodeService = require('./PendingRegistrationService')

describe('Pending Registration Service', () => {

    let codeService

    beforeEach(() => {
        codeService = new ConfirmationCodeService()
    })

    it('can be instantiated', () => {
        expect(codeService).toBeDefined()
    })

    it('can generate a random UUID confirmation code', () => {
        let confirmationCode = codeService.generate()
        expect(confirmationCode).toBeTruthy()
        // UUID version 4 strings are 36 characters in length
        expect(confirmationCode.length).toBe(36)
    })
})