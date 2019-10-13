const USUARIO = (state, usuario) => {
  state.usuario.token = usuario.token
  state.usuario.isLogado = usuario.isLogado
  state.usuario.id_usuario = usuario.id_usuario
  state.usuario.nome = usuario.nome
  state.usuario.email = usuario.email
  state.usuario.login = usuario.login
  state.usuario.empresa.id_empresa = usuario.empresa.id_empresa
  state.usuario.empresa.nome_fantasia = usuario.empresa.nome_fantasia
  state.usuario.empresa.razao_social = usuario.empresa.razao_social
  state.usuario.empresa.cnpj = usuario.empresa.cnpj
}

export {
  USUARIO
}
