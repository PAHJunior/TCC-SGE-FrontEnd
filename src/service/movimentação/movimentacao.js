import { http } from './config.js'

export default {
  Produto: (produto) => {
    return http.get('produto', produto)
  },
  CadastrarProduto: (produto) => {
    return http.post('/', produto)
  },
  buscarUmProduto: (id) => {
    return http.get(`/${id}`)
  },
  buscarProduto: () => {
    return http.get(`/`)
  }
}
