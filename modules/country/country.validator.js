const { body } = require('express-validator');


const countryValidator = [
    body('name').not().isEmpty(),
    body('code').not().isEmpty(),
    body('status').isBoolean()
]


module.exports = {
    countryValidator
}