const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
// const validateRequest = require('../../middlewares/validate-request')

const cityController = require('./city.controller')

router.get('/', cityController.getCityList)
router.post('/', cityController.addCity)

module.exports = router;