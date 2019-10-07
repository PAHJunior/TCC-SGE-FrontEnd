import axios from 'axios'

export const http = axios.create({
  // baseURL: 'http://api-sge.herokuapp.com/api/usuarios',
  baseURL: 'http://localhost:3000/api/usuarios',
  timeout: 10000
})
