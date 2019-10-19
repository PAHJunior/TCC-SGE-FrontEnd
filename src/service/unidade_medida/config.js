import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/unidade_medidas`,
  timeout: 10000
})
