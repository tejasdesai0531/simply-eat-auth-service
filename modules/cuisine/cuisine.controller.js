const { BadRequestError } = require('@simply-eat/common')
const CuisineModel = require('../../models/cuisine.model')
const { RequestValidationError } = require('@simply-eat/common')
const CityCreatedPublisher = require('../../events/publishers/city-created-publisher')
const natsWrapper = require('../../config/nats-wrapper')


async function addCuisine(req, res, next) {

    try {

        const name = req.body.name
        const code = req.body.code
        const status = req.body.status

        const cuisine = await CuisineModel.addCuisine({ name, code, status })

        res.send({
            error: false,
            message: "Cuisine created successfully",
            data: {
                cuisine
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getCuisineList(req, res) {

    const countries = await CuisineModel.getCuisineList()

    res.send({
        error: false,
        data: {
            cuisineList: countries
        }
    })
}

module.exports = {
    addCuisine,
    getCuisineList
}