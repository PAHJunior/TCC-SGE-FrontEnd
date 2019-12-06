import { http } from './config.js'

export default {
  buscar: (limite) => {
    return http.get(`/${limite}`)
  }
}
