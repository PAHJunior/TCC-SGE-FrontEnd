import { http } from './config.js'

export default {
  Buscar: (tipodoc) => {
    return http.get('/', tipodoc)
  },
  Cadastrar: (tipodoc) => {
    return http.post('/', tipodoc)
  },
  buscarUm: (id) => {
    return http.get(`/${id}`)
  },
  modificar: (id, tipoDoc) => {
    return http.patch(`/${id}`, tipoDoc)
  }
}
