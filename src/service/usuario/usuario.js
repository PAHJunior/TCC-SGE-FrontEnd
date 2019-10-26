import { http } from './config.js'

export default {
  login: (usuario) => {
    return http.post('/login', usuario)
  },
  cadastrar: (usuario) => {
    return http.post('/', usuario)
  },
  buscarUmUsuario: (id) => {
    return http.get(`/${id}`)
  },
  buscarUsuario: () => {
    return http.get(`/`)
  },
  modificar: (id, body) => {
    return http.patch(`/${id}`, body)
  }
}
