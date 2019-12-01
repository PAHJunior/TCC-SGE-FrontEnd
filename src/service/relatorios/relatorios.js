import { http } from './config.js'

export default {
  produtos: (data) => {
    return http.post('/', data) // cadastrar
  }
}
