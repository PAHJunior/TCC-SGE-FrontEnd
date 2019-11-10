import { http } from './config.js'

export default {
  Buscar: (tipodoc) => {
    return http.get('/', tipodoc)
  },
  Cadastrar: (tipodoc) => {
    return http.post('/', tipodoc)
  },
  BuscarUm: (id) => {
    return http.get(`/${id}`)
  },
  Modificar: (id, body) => {
    return http.patch(`/${id}`, body)
  }
}
