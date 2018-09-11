const request = require('request')
const config = require('../../config/config')

exports.dadata_check = (req, res, next) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${config.token}`,
    'X-Secret': `${config.secret}`
  }
  const dataString = {
    structure: ['NAME', 'ADDRESS', 'PHONE', 'PASSPORT'],
    data: [[req.body.fio, req.body.sourceAddr, req.body.sourcePhone, req.body.sourcePassport]]
  }
  const requestBody = JSON.stringify(dataString)
  console.log(dataString)
  const options = {
    url: 'https://dadata.ru/api/v2/clean',
    method: 'POST',
    headers: headers,
    body: requestBody
  }

  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body)
      var result = JSON.parse(body)
      res.send(result)
    } else {
      res.json(error)
    }
  }
  request(options, callback)
}
