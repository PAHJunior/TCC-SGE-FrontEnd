import { http } from './config.js'

export default {
  Produto: (produto) => {
     return http.get('produto',produto)
   },
   salvar: (produto) => {
     return http.post('produto', produto)
   }
}