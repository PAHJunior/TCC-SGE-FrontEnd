import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/produto`,
  timeout: 10000
})
