import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/movimentacao`,
  timeout: 3000
})
