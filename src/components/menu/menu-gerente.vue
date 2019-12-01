<template>
<q-scroll-area style="height: calc(100% );">
<q-toolbar class="bg-primary text-white shadow-2">

</q-toolbar>

<q-list >
  <q-item
    :active="link === 'dashboard'"
    @click="link = 'dashboard'"
    class="text-grey-1"
    clickable
    tag="a"
    to="/dashboard"
  >

    <q-item-section avatar>

      <q-icon name="img:statics/dashboard.png" />

    </q-item-section>

    <q-item-section>
      <q-item-label>Dashboard</q-item-label>
    </q-item-section>

  </q-item>

  <q-item
    :active="link === 'dashboard'"
    @click="link = 'dashboard'"
    class="text-grey-1"
    clickable
    tag="a"
    to="/cadastro_movimentacao"
  >

    <q-item-section avatar>

      <q-icon name="fas fa-dolly" />

    </q-item-section>

    <q-item-section>
      <q-item-label>Movimentação</q-item-label>
    </q-item-section>

  </q-item>

  <q-expansion-item
    v-for="(menus, idx) in menu"
    :key="idx"
    :icon="menus.icon"
    expand-separator
    :label="menus.label"
    class="text-white"
  >
    <q-card class="bg-grey-9">
      <q-item
        :active="link === 'dashboard'"
        @click="link = 'dashboard'"
        class="text-grey-1"
        clickable
        tag="a"
        v-for="(submenus, idy) in menus.submenu"
        :key="idy"
        :to="submenus.link">
        <q-item-section avatar />
        <q-item-section>
          <q-item-label>{{ submenus.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </q-expansion-item>

</q-list>
</q-scroll-area>
</template>

<script>
export default {
  data () {
    return {
      link: '',
      menu: {
        cadastros: {
          id: 0,
          label: 'Cadastros Gerais',
          icon: 'img:statics/database.png',
          submenu: [
            { label: 'Cadastrar Usuário', link: '/cadastro_usuario' },
            { label: 'Cadastrar Estoque', link: '/cadastro_estoque' },
            { label: 'Cadastro de Produto', link: 'cadastro_produtos' },
            { label: 'Cadastro do Fornecedor', link: '/cadastro_fornecedor' },
            { label: 'Cadastro de Categorias', link: '/cadastro_categoria_produto' },
            { label: 'Cadastro de Grupos', link: '/cadastro_grupo_produto' },
            // { label: 'Cadastro de Hierarquias', link: '/cadastro_hierarquia' },
            { label: 'Cadastro de Unid. de Medidas', link: '/cadastro_unid_medida' },
            { label: 'Cadastrar tipo de doc.', link: '/cadastrar_tipo_documento' }
          ]
        },
        consulta: {
          id: 1,
          label: 'Consultar',
          icon: 'img:statics/feature-search-white.png',
          submenu: [
            { label: 'Consultar Usúario', link: '/consultar_usuario' },
            { label: 'Consultar Estoque', link: '/consultar_estoque' },
            { label: 'Consultar Produto', link: '/consultar_produtos' },
            { label: 'Consultar Fornecedor', link: '/consultar_fornecedor' },
            { label: 'Consultar Categorias', link: '/consultar_categoria' },
            { label: 'Consultar Grupos', link: '/consultar_grupo' },
            { label: 'Consultar Unid. de Medida', link: '/consultar_unid_medida' },
            { label: 'Consultar Tipo do doc.', link: '/consultar_tipo_documento' },
            // { label: 'Consultar Hierarquia', link: 'consultar_hierarquia' },
            { label: 'Consultar Movimentações', link: '/consultar_movimentacao' }
          ]
        },
        relatorio: {
          id: 2,
          label: 'Relatório',
          icon: 'img:statics/file-chart.png',
          submenu: [
            { label: 'Relatório de produtos', link: 'consultar_relatorio' }
          ]
        }
      }
    }
  }
}
</script>
