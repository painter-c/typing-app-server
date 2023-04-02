const crypto = require('node:crypto')

class ConfirmationCodeService {
    constructor() {}

    generate() {
        return crypto.randomUUID()
    }
}

module.exports = ConfirmationCodeService