const { Publisher } = require('@simply-eat/common')

class CityCreatedPublisher extends Publisher {

    getSubject() { return 'city:created' }
}

module.exports = CityCreatedPublisher