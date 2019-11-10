<template>
  <q-layout view="lHh LpR lfr">
    <q-header elevated class="row">

      <!-- Toolbar para o nome do sistema -->
      <q-toolbar class="col-md-2 col-xs-2 text-white bg-secondary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title v-if="!this.$q.screen.lt.md">
          SGE
        </q-toolbar-title>
      </q-toolbar>

      <!-- Toolbar para barra de busca -->
      <q-toolbar class="col-md-7 col-xs-5 col-sm-7 text-white bg-secondary row">

        <q-select
          use-input
          hide-dropdown-icon
          dark
          dense
          standout
          v-model="searchText"
          @filter="filterFn"
          :options="optSearch"
          input-class="text-right"
          class="absolute-center col-md-10 col-xs-12 col-sm-12"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section thumbnail>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

      </q-toolbar>

      <!-- ToolBar para os botões de ação com o usuario -->
      <q-toolbar class="col-md-3 col-xs-5 col-sm-3 text-white bg-secondary">

        <q-space />

        <q-btn  flat round dense icon="notifications">
          <q-badge v-if="notificacoes.length > 0" color="red" floating>
            {{ notificacoes.length }}
          </q-badge>
          <q-menu fit anchor="bottom right" self="top right">
            <q-toolbar class="shadow-2">
              <q-toolbar-title class="text-center">Notificações</q-toolbar-title>
            </q-toolbar>
            <!-- <q-item-label header>Notificações</q-item-label> -->
            <q-list bordered class="rounded-borders" style="max-width: 400px" v-for="(notify, nid) in notificacoes" :key="nid">

              <q-item>
                <!-- <q-item-section avatar top>
                  <q-icon name="feedback" size="34px" />
                </q-item-section> -->

                <q-item-section top>
                  <q-item-label caption>
                    {{notify.descricao}}
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn size="12px" flat dense round icon="more_vert" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn  flat round dense icon="img:statics/calendar.png">
          <q-menu  anchor="bottom middle" self="top middle">
            <q-date
              class="text-black"
              v-model="dia_atual"
              minimal
            />
          </q-menu>
        </q-btn>

        <q-btn flat dense>
          <div class="row items-center no-wrap">
            <q-icon left name="img:statics/user.png" />
            <div class="text-center" v-if="!$q.screen.lt.md">
              Olá, {{ usuario.login ? usuario.login : usuarioLocal.login }}
            </div>
          </div>
          <q-menu  anchor="bottom middle" self="top middle">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Configurações</div>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ this.userLocal.login }}</div>

                <q-btn
                  to="/"
                  @click="sair"
                  color="red-10"
                  label="Sair"
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>

        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
      content-class="bg-fundo-menu"
      :breakpoint="400"
    >
    <q-scroll-area style="height: calc(100% );">

      <q-toolbar class="bg-primary text-white shadow-2  ">
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Validar from '../service/validarToken/validar'
import Usuario from '../service/usuario/usuario'
import Notificacao from '../service/notificacao/notificacoes'
import { mapState, mapMutations } from 'vuex'
import { Loading, QSpinnerGears } from 'quasar'

const stringOptions = [
  { label: 'Dashboard', link: '/dashboard', description: 'Ir para dashboard', icon: 'dashboard' },
  { label: 'Cadastrar usuario', link: '/cadastro_usuario', description: 'Ir para cadastro do usuario', icon: 'fas fa-database' }
]

export default {
  beforeRouteUpdate (to, from, next) {
    Loading.show({
      message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>',
      spinner: QSpinnerGears
    })
    Validar.token(this.usuarioLocal.id_usuario, this.usuarioLocal.token)
      .then((token) => {
        if (token.data === false) {
          this.$q.notify({
            color: 'negative',
            message: 'Seu acesso ao sistema expirou, é necessário fazer o login novamente',
            position: 'top-right',
            icon: 'warning',
            timeout: 5000,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
          next('/login/tcc')
        } else {
          Usuario.buscarUmUsuario(this.usuarioLocal.id_usuario)
            .then((usuario) => {
              this.USUARIO(usuario.data.response[0])
            })
          localStorage.setItem('token', token.data)
          next()
        }
      })
      .finally(() => {
        Loading.hide()
      })
  },
  mounted () {
    this.usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
    this.getNotificacoes()
  },
  watch: {

  },
  name: 'MyLayout',
  data () {
    return {
      notificacoes: [],
      usuarioLocal: null,
      optSearch: [],
      userLocal: {
        id_usuario: '',
        nome: '',
        email: '',
        login: ''
      },
      token: '',
      urlImg: '../assets/logo_tcc.png',
      dia_atual: '',
      searchText: '',
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
            { label: 'Consultar Movimentações', link: '/consultar_tipo_documento' }
          ]
        },
        relatorio: {
          id: 2,
          label: 'Relatório',
          icon: 'img:statics/file-chart.png',
          submenu: [
            { label: 'Emitir Relatório', link: 'consultar_relatorio' }
          ]
        },
        configuracoes: {
          id: 3,
          label: 'Configurações',
          icon: 'img:statics/settings.png',
          submenu: [
            { label: 'Admnistrador ' }
          ]
        }
      },
      empresa: 'TCC',
      link: '',
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('usuarios', ['usuario'])
  },
  methods: {
    ...mapMutations('usuarios', ['USUARIO']),
    sair () {
      localStorage.removeItem('usuario')
    },
    getNotificacoes () {
      Notificacao.buscarByUser(this.usuarioLocal.id_usuario, this.usuarioLocal.hierarquia.id_hierarquia)
        .then((notificacao) => {
          if (notificacao.data.errors) {
            for (let i = 0; i < notificacao.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: notificacao.data.errors[i].message,
                position: 'top-right',
                icon: 'warning',
                timeout: 1500,
                actions: [{
                  color: 'white',
                  icon: 'close'
                }]
              })
            }
          }
          if (notificacao.data.status === 200) {
            this.notificacoes = notificacao.data.response.map((u) => {
              return {
                id: u.id_notificacao,
                descricao: u.descricao,
                ativo: u.ativo
              }
            })
          }
        })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.optSearch = stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.optSearch = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style>
.bg-fundo-menu {
  background: #222d32;
}
</style>
