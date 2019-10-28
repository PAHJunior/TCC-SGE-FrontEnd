import { http } from './config.js'

export default {
  Cadastrar: (produto) => {
    return http.post('/', produto) // cadastrar
  },
  buscarUmProduto: (id) => {
    return http.get(`/${id}`) // retorna pelo ID
  },
  buscarProduto: () => {
    return http.get(`/`) // retorna tudo
  }
}
