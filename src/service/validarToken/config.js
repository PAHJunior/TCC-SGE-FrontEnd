import axios from 'axios'

export const http = axios.create({
  // baseURL: 'http://api-sge.herokuapp.com/api/usuarios',
  baseURL: `${process.env.API}/validar`,
  timeout: 10000
})
