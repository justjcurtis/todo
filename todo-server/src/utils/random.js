const crypto = require('crypto');
const randomString = () => {
    return crypto.randomBytes(128).toString('hex');
}

module.exports = {
    randomString
}
