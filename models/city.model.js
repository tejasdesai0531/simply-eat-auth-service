const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country' }
},{
    collation: { locale: 'en_US', strength: 1 },
    usePushEach: true,
    timestamps : {createdAt: 'created_at', updatedAt: 'updated_at'}
})

citySchema.options.toJSON = {
    transfrom: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id
        delete ret.__v;
        return ret
    }
}

citySchema.statics.addCity = (city) => {
    return City.create(city)
}

citySchema.statics.getCity = () => {
    return City.find({})
}


const City = mongoose.model('City', citySchema)

module.exports = City

