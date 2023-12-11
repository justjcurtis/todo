const crypto = require('crypto');
const randomString = () => {
    return crypto.randomBytes(64).toString('hex');
}

module.exports = {
    randomString
}
