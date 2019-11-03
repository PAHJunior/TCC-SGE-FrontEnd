import { http } from './config.js'

export default {
  buscarByUser: (user, hierarquia) => {
    return http.get(`/${user}/${hierarquia}`)
  }
}
