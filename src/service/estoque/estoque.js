import { http } from './config.js'

export default {
  cadEstoque: (estoque) => {
    return http.post('/', estoque)
  },
  buscarUmEstoque: (id) => {
    return http.get(`/${id}`)
  },
  buscarEstoque: () => {
    return http.get(`/`)
  },
  modificar: (id, body) => {
    return http.patch(`/${id}`, body)
  }
}
