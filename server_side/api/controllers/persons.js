const mongoose = require('mongoose')
const Person = require('../models/person')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const config = require('../../config/config')

exports.persons_get_all = (req, res, next) => {
  Person.find()
    .select('name')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        persons: docs.map(doc => {
          return {
            name: doc.name,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      }
      //   if (docs.length >= 0) {
      res.status(200).json(response)
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.persons_create_person = (req, res, next) => {
  Person.find({ phone: req.body.phone, email: req.body.email })
    .exec()
    .then(person => {
      if (person.length >= 1) {
        return res
          .status(409)
          .send({
            message: 'Номер телефона и email уже существует',
            code: 409
          })
      } else {
        const person = new Person({
          _id: new mongoose.Types.ObjectId(),
          surname: req.body.surname,
          name: req.body.name,
          patronymic: req.body.patronymic,
          gender: req.body.gender,
          phone: req.body.phone,
          phoneType: req.body.phoneType,
          phoneProvider: req.body.phoneProvider,
          fullEngName: req.body.fullEng,
          fullRusName: req.body.fullRus,
          ad: req.body.ad,
          email: req.body.email
        })
        console.log(person)
        person
          .save()
          .then(result => {
            console.log(result)
            res
              .status(201)
              .json({
                message: 'Данные сохранены',
                createdperson: {
                  name: result.name,
                  _id: result._id,
                  request: {
                    type: 'GET',
                    url: 'http://localhost:3000/persons/' + result._id
                  }
                }
              })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
          })
      }
    })
}
/* let token = jwt.sign({
  phone: req.body.phone }, config.jwt).split('.')
console.log(token[1]) */

exports.persons_get_person = (req, res, next) => {
  const id = req.params.personId
  Person.findById(id)
    .select('name')
    .exec()
    .then(doc => {
      console.log('From database', doc)
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/persons'
          }
        })
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}
