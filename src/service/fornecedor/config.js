import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://api-sge.herokuapp.com/api/fornecedor',
  timeout: 10000
})
