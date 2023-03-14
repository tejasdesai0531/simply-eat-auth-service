const request = require('supertest')
const app = require('../../../app')


it('This test case will create an cuisine', async () => {

    await request(app).post('/api/cuisine').send({name: 'Desert', code: 'DST', status: true})

    const response = await request(app).get('/api/cuisine').send()

    console.log(response.body.data)

    expect(response.body.data.cuisineList.length).toEqual(1);
    expect(response.body.data.cuisineList[0].name).toEqual('Desert');
})

it('returns 400 status code if name is not provided', async () => {

    await request(app)
        .post('/api/cuisine')
        .send({code: 'DST', status: true})
        .expect(400)
})