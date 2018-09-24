const request = require('request')
const config = require('../../config/config')

exports.translit = (req, res, next) => {
// Основные переменные для сервиса DADATA
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
  // Функция транслитерации ISO-9
  function cyrillicToTranslit (config) {
    const _preset = config ? config.preset : 'ru'

    const _firstLetterAssociations = {
      а: 'a',
      б: 'b',
      в: 'v',
      ґ: 'g',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      є: 'ye',
      ж: 'zh',
      з: 'z',
      и: 'i',
      і: 'i',
      ї: 'yi',
      й: 'i',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: "sh'",
      ъ: '',
      ы: 'i',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya'
    }

    if (_preset === 'uk') {
      Object.assign(_firstLetterAssociations, {
        г: 'h',
        и: 'y',
        й: 'y',
        х: 'kh',
        ц: 'ts',
        щ: 'shch',
        "'": '',
        '’': '',
        ʼ: ''
      })
    }

    const _associations = Object.assign({}, _firstLetterAssociations)

    if (_preset === 'uk') {
      Object.assign(_associations, {
        є: 'ie',
        ї: 'i',
        й: 'i',
        ю: 'iu',
        я: 'ia'
      })
    }

    function transform (input, spaceReplacement) {
      if (!input) {
        return ''
      }

      let newStr = ''
      for (let i = 0; i < input.length; i++) {
        const isUpperCaseOrWhatever = input[i] === input[i].toUpperCase()
        let strLowerCase = input[i].toLowerCase()
        if (strLowerCase === ' ' && spaceReplacement) {
          newStr += spaceReplacement
          continue
        }
        let newLetter =
        _preset === 'uk' &&
          strLowerCase === 'г' &&
          i > 0 &&
          input[i - 1].toLowerCase() === 'з'
          ? 'gh'
          : (i === 0 ? _firstLetterAssociations : _associations)[strLowerCase]
        if (typeof newLetter === 'undefined') {
          newStr += isUpperCaseOrWhatever
            ? strLowerCase.toUpperCase()
            : strLowerCase
        } else {
          newStr += isUpperCaseOrWhatever ? newLetter.toUpperCase() : newLetter
        }
      }
      return newStr
    }

    return {
      transform: transform
    }
  }

  // Функция преобразования
  function capitalizeFirstLetter (result) {
    var pieces = result.split(' ')

    for (var i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase()
      pieces[i] = j + pieces[i].substr(1).toLowerCase()
    }
    return pieces.join(' ')
  }

  // Функция парсинга массива и создание данных для выгрузки на frond-end
  function translit (fio) {
    var result = cyrillicToTranslit().transform(fio).toLowerCase()
    let translinName = result.split(' ')
    console.log(translinName.length)
    if (translinName.length === 3) {
      let surname = translinName[0]
      let name = translinName[1]
      let patronymic = translinName[2]
      let localDomain = '@'
      let globalDomaim = '@'
      let ad = surname.toLowerCase() + name[0].toLowerCase() + patronymic[0].toLowerCase()
      let email = name[0].toLowerCase() + '.' + surname.toLowerCase()
      let fio = capitalizeFirstLetter(result)
      // console.log(`Полное имя пользователя ISO-9: ${result}`)
      // console.log(`Учетная запись для компьютера: ${ad}${localDomain}`)
      // console.log(`Учетная запись почты: ${email}${globalDomaim}`)
      let answ = {
        engname: fio,
        rusname: fio.toUpperCase(),
        ad: ad + localDomain,
        email: email + globalDomaim
      }
      res.send(answ)
    } else {
      let answ = {
        error: 'Данных для создания учетных записей недостаточно'
      }
      res.send(answ)
    }
  }

  // Callback для сервиса DADATA
  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body)
      var result = JSON.parse(body)
      var fio = result.data[0][0].result
      console.log(fio)
      // Передаем "чистое ФИО" в транслитерацию
      translit(fio)
      // res.sendStatus(200)
    } else {
      res.json(error)
    }
  }
  request(options, callback)
}
