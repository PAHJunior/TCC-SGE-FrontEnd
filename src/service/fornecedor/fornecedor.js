import { http } from './config.js'

export default {
  login: (fornecedor) => {
    return http.post('/fornecedor', fornecedor)
  },
  buscarUmUsuario: (id) => {
    return http.get(`/${id}`)
  },
  buscarUsuario: () => {
    return http.get(`/`)
  }
}
