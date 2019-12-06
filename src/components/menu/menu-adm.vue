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
  <q-expansion-item
    icon="img:statics/file-chart.png"
    expand-separator
    label="Relatórios"
    class="text-white"
  >
    <q-card class="bg-grey-9">
      <q-item
        :active="link === 'dashboard'"
        @click="link = 'dashboard'"
        class="text-grey-1"
        clickable
        tag="a">
        <q-item-section avatar />
        <q-item-section @click="relatorio01 = true">
          <q-item-label>Relatório de Produtos</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </q-expansion-item>
  <q-expansion-item
    icon="img:statics/settings.png"
    expand-separator
    label="Configurações"
    class="text-white"
  >
    <q-card class="bg-grey-9">
      <q-item
        class="text-grey-1"
        clickable
        to="/logs"
        tag="a">
        <q-item-section avatar />
        <q-item-section>
          <q-item-label>Log do Sistema</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        tag="a"
        class="text-grey-1"
        to="/alterar_senha"
        >
        <q-item-section avatar />
        <q-item-section>
          <q-item-label>Alterar Senha</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </q-expansion-item>

</q-list>
 <q-dialog v-model="relatorio01">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="statics/logo_tcc.png">
          </q-avatar>

          <q-toolbar-title>
            <span class="text-weight-bold">S.G.E</span>
          </q-toolbar-title>
          <q-space/>

          <span class="text-weight-bold">Relatório de Produtos</span>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="row">
          <div class="col">
            <div class="q-gutter-y-md row justify-center col-12">
              <div class="col-12">
                <div class="q-col-gutter-sm row items-start">

                  <div class="row col-md-6 col-xs-12 col-sm-12">
                    <q-input
                      class="col-12"
                      dense
                      outlined
                      mask="##-##-####"
                      v-model="relatorio.dtinicial"
                      label="Data inicial"
                    >
                      <template v-slot:prepend>
                        <!-- <q-icon name="event" /> -->
                        <q-btn round flat dense icon="event">
                          <q-menu fit anchor="bottom left" self="top left">

                            <q-date
                              v-model="relatorio.dtinicial"
                              minimal
                              mask="DD-MM-YYYY"
                            />

                          </q-menu>

                        </q-btn>
                      </template>
                    </q-input>
                  </div>

                  <div class="row col-md-6 col-xs-12 col-sm-12">
                    <q-input
                      class="col-12"
                      dense
                      outlined
                      mask="##-##-####"
                      v-model="relatorio.dtfinal"
                      label="Data final"
                    >
                      <template v-slot:prepend>
                        <!-- <q-icon name="event" /> -->
                        <q-btn round flat dense icon="event">
                          <q-menu fit anchor="bottom left" self="top left">

                            <q-date
                              v-model="relatorio.dtfinal"
                              minimal
                              mask="DD-MM-YYYY"
                            />

                          </q-menu>

                        </q-btn>
                      </template>
                    </q-input>
                  </div>

                  <div class="row col-md-12 col-xs-12 col-sm-12">
                    <q-select
                      outlined
                      label="Selecione o estoque"
                      class="col-12"
                      v-model="relatorio.estoque"
                      dense
                      options-dense
                      :options="estoqueOpt"
                      option-value="id"
                      option-label="desc"
                      map-options
                      emit-value
                      >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Nenhum estoque encontrado
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>

                  <div class="row col-6">
                   <q-btn class="bg-primary text-white col-12" label="GERAR RELATÓRIO" @click="gerarRelatorio()"/>
                  </div>

                  <div class="row col-6">
                   <q-btn class="bg-primary text-white col-12" label="GERAR EXCEL" @click="gerarRelatorio()"/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</q-scroll-area>
</template>

<script>

import Estoque from '../../service/estoque/estoque.js'

export default {
  data () {
    return {
      estoqueOpt: [],
      relatorio: {
        dtinicial: '',
        dtfinal: '',
        estoque: ''
      },
      dados: {
        'recipe': 'chrome-pdf',
        'engine': 'handlebars',
        'template': {
          'shortid': 'rkJTnK2ce'
        },
        'data': {
          'items': [
            {
              'cod_produto': 'ABC123',
              'produto': 'Calça jeans',
              'saldo': 203,
              'dtcriacao': '10/11/2019',
              'estoque': 'Principal',
              'status': 'Ativo',
              'precounit': 6.00
            },
            {
              'cod_produto': 'ABC123',
              'produto': 'Calça jeans',
              'saldo': 203,
              'dtcriacao': '10/11/2019',
              'estoque': 'Principal',
              'status': 'Ativo',
              'precounit': 6.00
            }
          ]
        },
        'options': {
          'reports': {
            'save': true
          },
          'language': 'en'
        }
      },
      relatorio01: false,
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
        }
      }
    }
  },
  mounted () {
    Estoque.buscarEstoqueAtivo()
      .then((estoque) => {
        this.estoqueOpt = estoque.data.response.map((e) => {
          return {
            id: e.id_estoque,
            desc: e.nome_estoque
          }
        })
      })
  },
  methods: {
    gerarRelatorio () {
      window.open(`${process.env.API}/relatorios/produtos/${this.relatorio.estoque}/${this.relatorio.dtinicial}/${this.relatorio.dtfinal}/`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes')
    }
  }
}
</script>
