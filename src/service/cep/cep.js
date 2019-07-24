import { http } from './config.js'

export default {
  cep: (cep) => { return http.get(cep) }
}
