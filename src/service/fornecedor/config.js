import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/fornecedor`,
  timeout: 10000
})
