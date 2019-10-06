import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://api-sge.herokuapp.com/api/usuarios',
  timeout: 10000
})
