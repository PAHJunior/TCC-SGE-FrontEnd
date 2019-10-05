import { http } from './config.js'

export default {
  login: (usuario) => {
    return http.post('/login', usuario)
  },
  buscarUmUsuario: (id) => {
    return http.get(`/${id}`)
  },
  buscarUsuario: () => {
    return http.get(`/`)
  }
}
