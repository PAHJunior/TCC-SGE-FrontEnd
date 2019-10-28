import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/produtos`,
  timeout: 10000
})
