
const routes = [
  {
    path: '/login/:empresa',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/LayoutPrincipal.vue'),
    children: [
      // Cadastro
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/cadastro_usuario', component: () => import('pages/cadastrar/Cad_usuario.vue') },
      { path: '/cadastro_estoque', component: () => import('pages/cadastrar/Cad_estoque.vue') },
      { path: '/cadastro_produtos', component: () => import('pages/cadastrar/Cad_produtos.vue') },
      { path: '/cadastro_fornecedor', component: () => import('pages/cadastrar/Cad_fornecedor.vue') },
      { path: '/cadastro_categoria_produto', component: () => import('pages/cadastrar/Cad_categoria.vue') },
      { path: '/cadastro_grupo_produto', component: () => import('pages/cadastrar/Cad_grupo.vue') },
      { path: '/cadastro_unid_medida', component: () => import('pages/cadastrar/Cad_unid-medida.vue') },
      { path: '/cadastro_hierarquia', component: () => import('pages/cadastrar/Cad_hierarquias.vue') },
      { path: '/cadastro_movimentacao', component: () => import('pages/cadastrar/Cad_Movimentacao.vue') },
      { path: '/cadastrar_tipo_documento', component: () => import('pages/cadastrar/Cad_tipo-documento.vue') },
      // Consultar

      { path: '/consultar_usuario', component: () => import('pages/consultar/Consultar_usuario.vue') },
      { path: '/consultar_estoque', component: () => import('pages/consultar/Consultar_Estoque.vue') },
      { path: '/consultar_produtos', component: () => import('pages/consultar/Consultar_Produto.vue') },
      { path: '/consultar_fornecedor', component: () => import('pages/consultar/Consultar_Fornecedor.vue') },
      { path: '/consultar_categoria', component: () => import('pages/consultar/Consultar_Categoria.vue') },
      { path: '/consultar_grupo', component: () => import('pages/consultar/Consultar_Grupo.vue') },
      { path: '/consultar_unid_medida', component: () => import('pages/consultar/Consultar_Unid_Medida.vue') },
      { path: '/consultar_hierarquia', component: () => import('pages/consultar/Consultar_hierarquia.vue') },
      { path: '/consultar_movimentacao', component: () => import('pages/consultar/Consultar_Movimentacao.vue') },
      { path: '/consultar_relatório', component: () => import('pages/consultar/Consultar_relatorio.vue') },
      { path: '/consultar_tipo_documento', component: () => import('pages/consultar/Consultar_tipo-documento.vue') }
    ]
  },
  {
    path: '/',
    // component: () => import('layouts/MyLayout.vue'),
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
