const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true },
},{
    collation: { locale: 'en_US', strength: 1 },
    usePushEach: true,
    timestamps : {createdAt: 'created_at', updatedAt: 'updated_at'}
})

countrySchema.options.toJSON = {
    transfrom: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret
    }
}

countrySchema.statics.addCountry = (country) => {
    return Country.create(country)
}

countrySchema.statics.getCountries = () => {
    return Country.find({})
}

countrySchema.statics.editCountry = () => {
    return Country.edit({})

}

countrySchema.statics.getCountryByCode = (code) => {
    return Country.findOne({code: code})
}


const Country = mongoose.model('Country', countrySchema)

module.exports = Country

