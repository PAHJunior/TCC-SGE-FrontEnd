import axios from 'axios'

export const http = axios.create({
  // baseURL: 'http://api-sge.herokuapp.com/api/estoque',
  baseURL: `${process.env.API}/grupo_produtos`,
  timeout: 10000
})
