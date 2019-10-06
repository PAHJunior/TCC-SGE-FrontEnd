import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://api-sge.herokuapp.com/api/estoque',
  timeout: 10000
})
