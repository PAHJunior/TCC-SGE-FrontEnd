import axios from 'axios'

export const http = axios.create({
  baseURL: `${process.env.API}/tipo_documento`,
  timeout: 10000
})
