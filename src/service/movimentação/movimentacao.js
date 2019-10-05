import { http } from './config.js'

export default {
  movimentacao: (movimentacao) => { return http.get(movimentacao) }
}