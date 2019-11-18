import { http } from './config.js'

export default {
  cadastrar: (categoria) => {
    return http.post('/', categoria)
  },
  buscarUm: (id) => {
    return http.get(`/${id}`)
  },
  buscar: () => {
    return http.get(`/`)
  },
  modificar: (id, categoria) => {
    return http.patch(`/${id}`, categoria)
  }
}
