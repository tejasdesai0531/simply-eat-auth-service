const { body } = require('express-validator');


const cityValidator = [
    body('name').not().isEmpty(),
    body('code').not().isEmpty(),
    body('status').isBoolean()
]


module.exports = {
    cityValidator
}