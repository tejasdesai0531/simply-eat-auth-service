const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { validateRequest } = require('@simply-eat/common')

const { cuisineValidator } = require('./cuisine.validator')

const cuisineController = require('./cuisine.controller')

router.get('/', cuisineController.getCuisineList)
router.post('/', cuisineValidator, validateRequest, cuisineController.addCuisine)

module.exports = router;