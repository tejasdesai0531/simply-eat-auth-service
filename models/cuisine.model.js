const mongoose = require('mongoose')

const cuisineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true },
},{
    collation: { locale: 'en_US', strength: 1 },
    usePushEach: true,
    timestamps : {createdAt: 'created_at', updatedAt: 'updated_at'}
})

cuisineSchema.options.toJSON = {
    transfrom: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret
    }
}

cuisineSchema.statics.addCuisine = (cuisine) => {
    return Cuisine.create(cuisine)
}

cuisineSchema.statics.getCuisineList = () => {
    return Cuisine.find({})
}


const Cuisine = mongoose.model('Cuisine', cuisineSchema)

module.exports = Cuisine

