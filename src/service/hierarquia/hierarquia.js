import { http } from './config.js'

export default {
  buscar: () => {
    return http.get(`/`)
  },
  buscarUsuario: () => {
    return http.get(`/`)
  }
}
