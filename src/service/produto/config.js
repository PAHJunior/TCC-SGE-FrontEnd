import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://api-sge.herokuapp.com/api/produto',
  timeout: 10000
})
