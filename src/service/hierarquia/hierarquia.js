import { http } from './config.js'

export default {
  buscar: () => {
    return http.get(`/`)
  },
  cadastrar: (hierarquia) => {
    return http.post(`/`, hierarquia)
  }
}
