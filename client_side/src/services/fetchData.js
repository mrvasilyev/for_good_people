import api from '@/services/api'

export default {
  post (result) {
    return api().post('dadata', result)
  }
}
