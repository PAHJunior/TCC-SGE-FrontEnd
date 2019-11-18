import { http } from './config.js'

export default {
  cadastrar: (fornecedor) => {
    return http.post('/', fornecedor)
  },
  buscarUm: (id) => {
    return http.get(`/${id}`)
  },
  buscar: () => {
    return http.get(`/`)
  },
  modificar: (id, fornecedor) => {
    return http.patch(`/${id}`, fornecedor)
  }
}
