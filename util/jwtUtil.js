
const jwt = require("jsonwebtoken");
module.exports = function signToken(payload, secretKey, expiresIn) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: expiresIn,
            issuer: 'auth',
        };

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                reject({ isError: true, message: 'Invalid operation!' });
            } else {
                resolve(token);
            }
        })
    });
}
