const {BadRequestError} = require('@simply-eat/common')
const CityModel = require('../../models/city.model')
const { validationResult } = require('express-validator')
const {RequestValidationError} = require('@simply-eat/common')
const CityCreatedPublisher = require('../../events/publishers/city-created-publisher')
const natsWrapper = require('../../config/nats-wrapper')


async function addCity(req, res, next) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors)
        }

        const name = req.body.name
        const code = req.body.code
        const status = req.body.status
        const countryId = req.body.countryId
    
        const city = await CityModel.addCity({ name, code, status })
    
        res.send({
            error: false,
            message: "City created successfully",
            data: {
                city
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getCityList(req, res) {

    const cities = await CityModel.getCityList()

    res.send({
        error: false,
        data: {
            cityList: cities
        }
    })
}

module.exports = {
    addCity,
    getCityList
}