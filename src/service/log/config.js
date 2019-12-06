import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/log`,
  timeout: 10000
})
