
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
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/cadastro_usuario', component: () => import('pages/Cad_usuario.vue') },
      { path: '/cadastro_estoque', component: () => import('pages/Cad_estoque.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
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
