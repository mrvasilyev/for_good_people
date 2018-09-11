import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxleGFuZGVyIn0.I7pOUCHWK9bpyGBUyR1qIdNIAIHRqBvqmQme9ppHPkA'
    }
  })
}
