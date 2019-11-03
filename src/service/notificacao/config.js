import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/notificacoes`,
  timeout: 3000
})
