import { http } from './config.js'

export default {
  cadastrar: (undMedida) => {
    return http.post('/', undMedida)
  },
  buscarUm: (id) => {
    return http.get(`/${id}`) // retorna pelo ID
  },
  buscarTodos: () => {
    return http.get(`/`)
  }
}
