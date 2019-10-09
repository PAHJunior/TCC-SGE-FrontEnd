import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/hierarquias`,
  timeout: 10000
})
