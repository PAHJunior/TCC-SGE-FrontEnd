import { http } from './config.js'

export default {
  Buscar: () => {
    return http.get('/')
  },
  Cadastrar: (movimentacao) => {
    return http.post('/', movimentacao)
  },
  BuscarUm: (id) => {
    return http.get(`/${id}`)
  }
}
