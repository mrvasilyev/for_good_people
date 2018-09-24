const mongoose = require('mongoose')

// DONE: Схема настроена

const personsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  surname: { type: String, required: true },
  name: { type: String, required: true },
  patronymic: { type: String, required: true },
  gender: { type: String, required: false },
  phone: { type: String, required: true },
  phoneType: { type: String, required: false },
  phoneProvider: { type: String, required: false },
  fullEngName: { type: String, required: true },
  fullRusName: { type: String, required: true },
  ad: { type: String, required: true },
  email: { type: String, required: true }
})
module.exports = mongoose.model('Persons', personsSchema)
