import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.APIREPORT}/`,
  timeout: 100000
})
