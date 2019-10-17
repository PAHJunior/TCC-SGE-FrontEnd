import { http } from './config.js'

export default {
  token: (id, token) => {
    return http.get(`/${id}/${token}`)
  }
}
