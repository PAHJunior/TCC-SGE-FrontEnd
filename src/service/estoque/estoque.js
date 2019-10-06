import { http } from './config.js'

export default {
  cadEstoque: (estoque) => {
    return http.post('/estoque', estoque)
  },
  buscarUmEstoque: (id) => {
    return http.get(`/${id}`)
  },
  buscarEstoque: () => {
    return http.get(`/`)
  }
}
