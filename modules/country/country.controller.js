const CountryModel = require('../../models/country.model')
const { validationResult } = require('express-validator')
const CityCreatedPublisher = require('../../events/publishers/city-created-publisher')
const natsWrapper = require('../../config/nats-wrapper')
const { BadRequestError } = require('@simply-eat/common')
const CountryCreatedPublisher = require('../../events/publishers/country-created-publisher')


async function addCountry(req, res, next) {

    try {
        console.log('====req.body',req.body);
        const name = req.body.name
        const code = req.body.code
        const status = req.body.status
    
        const existingCountry = await CountryModel.getCountryByCode(code)
        if(existingCountry) {
            throw new BadRequestError('Country code already exists')
        }

        const country = await CountryModel.addCountry({ name, code, status })

        new CountryCreatedPublisher(natsWrapper.getClient()).publish(country)
    
        res.send({
            error: false,
            message: "Country created successfully",
            data: {
                country
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getCountryList(req, res) {

    const countries = await CountryModel.getCountries()

    res.send({
        error: false,
        data: {
            countryList: countries
        }
    })
}

async function editCountry(req, res, next) {

    try {

        console.log('====req.body',req.body);
        const id = req.body.id
        const name = req.body.name
        const code = req.body.code
        const status = req.body.status

        const country = await CountryModel.editCountry({ id, name, code, status })

        res.send({
            error: false,
            message: "Country edited successfully",
            data: {
                country
            }
        })
        
    } catch (error) {
        
    }
}

module.exports = {
    addCountry,
    getCountryList,
    editCountry
}