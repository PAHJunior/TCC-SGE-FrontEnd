import { http } from './config.js'

export default {
  Produto: (produto) => {
     return http.get(produto)
   },
   salvar: (produto) => {
     return http.post('produto', produto)
   }
}