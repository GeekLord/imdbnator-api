const mongoose = require('mongoose')
const host = process.env.MONGODB_HOST || 'localhost:27017'

function mongoConnect (req, res, next) {
  mongoose.Promise = global.Promise
  const db = mongoose.connect(`mongodb://${host}/imdbnator`, { useMongoClient: true })
  db.on('error', (err) => {
    return res.send({success: false, message: err.message})
  })
  db.once('open', () => {
    req.db = db
    return next()
  })
}

module.exports = mongoConnect
