import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxleGFuZGVyIFZhc2lseWV2ICJ9.f6RKWg2BMVsuz6ZWS7cOFMKIh8Q5Tw5vvrcu3gWjJiI'
    }
  })
}
