const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { validateRequest } = require('@simply-eat/common')

const userController = new (require('./user.controller'))();

router.post('/signup', userController.signUp)
router.post('/login', userController.logIn)
router.post('/confirmEmail' , userController.confirmEmail.cofirmEmail ); 

module.exports = router;