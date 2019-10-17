import { http } from './config.js'

export default {
  cadastrar: (categoria) => {
    return http.post('/', categoria)
  },
  buscarID: (id) => {
    return http.get(`/${id}`)
  },
  buscar: () => {
    return http.get(`/`)
  }
}
