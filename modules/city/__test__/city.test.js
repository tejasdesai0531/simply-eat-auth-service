const request = require('supertest')
const app = require('../../../app')
const CountryModel = require('../../../models/country.model')


it('This test case will create an city', async () => {

    let country = await CountryModel.addCountry({name: 'India', code: 'IND', status: true})

    console.log("Country ID : ", country.id)

    await request(app).post('/api/city').send({name: 'Mumbai', code: 'MUM', status: true, countryId: country.id})

    const response = await request(app).get('/api/city').send()

    console.log(response.body.data)

    expect(response.body.data.cityList.length).toEqual(1);
    expect(response.body.data.cityList[0].name).toEqual('Mumbai');
})

