const express = require('express')
const router = express.Router()

const countryRouter = require('./country/country.route')
const cuisineRouter = require('./cuisine/cuisine.route')
const cityRouter = require('./city/city.route')
const userRouter = require('./user/user.route')

router.use('/auth', userRouter);
// router.use('/country', countryRouter);

module.exports = router;