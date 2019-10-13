import { http } from './config.js'

export default {
  token: (token) => {
    return http.get(`/${token}`)
  }
}
