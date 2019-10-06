import { http } from './config.js'

export default {
  cadProduto: (produto) => {
    return http.post('/produto', produto) //pega
  },
  buscarUmProduto: (id) => {
    return http.get(`/${id}`) // retorna pelo ID
  },
  buscarProduto: () => {
    return http.get(`/`) //retorna tudo
  }
}
