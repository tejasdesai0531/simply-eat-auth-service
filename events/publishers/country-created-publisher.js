const { Publisher } = require('@simply-eat/common')

class CountryCreatedPublisher extends Publisher {

    getSubject() { return 'country:created' }
}

module.exports = CountryCreatedPublisher