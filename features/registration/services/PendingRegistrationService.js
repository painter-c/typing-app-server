const crypto = require('node:crypto')

class PendingRegistrationService {
    constructor() {}

    generate() {
        return crypto.randomUUID()
    }
}

module.exports = PendingRegistrationService