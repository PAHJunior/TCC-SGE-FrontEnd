import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://api.postmon.com.br/v1/movimentacao/',
  timeout: 3000
})