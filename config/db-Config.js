const mongoose = require('mongoose')

exports.connect = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Successfully connected to database'))
    .catch((err) => console.log('ERROR : ', err))
}
