const express = require('express')
const app = express()
const cors = require('cors')

const indexRouter = require('./modules/route')
const { NotFoundError } = require('@simply-eat/common')
const { errorHandler } = require('@simply-eat/common')
const { currentUser, requireAuth } = require("@simply-eat/common")

app.use(express.json())
app.use(cors())

// app.use(currentUser)
// app.use(requireAuth)

app.use('/api', indexRouter)

app.all('*', async (req, res, next) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})


app.use(errorHandler)

module.exports = app