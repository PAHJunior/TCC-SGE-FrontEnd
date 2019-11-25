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
              Olá, {{ this.usuarioLocal.login }}
            </div>
          </div>
          <q-menu  anchor="bottom middle" self="top middle">
            <div class="row no-wrap q-pa-md">

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ this.usuarioLocal.login }}</div>

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
      <menu-adm v-if="this.usuarioLocal.hierarquia.id_hierarquia == 1"></menu-adm>
      <menu-gerente v-if="this.usuarioLocal.hierarquia.id_hierarquia == 2"></menu-gerente>
      <menu-func v-if="this.usuarioLocal.hierarquia.id_hierarquia == 3"></menu-func>
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
import MenuAdm from '../components/menu/menu-adm.vue'
import MenuGerente from '../components/menu/menu-gerente.vue'
import MenuFunc from '../components/menu/menu-funcionario.vue'

const stringOptions = [
  { label: 'Dashboard', link: '/dashboard', description: 'Ir para dashboard', icon: 'dashboard' },
  { label: 'Cadastrar usuario', link: '/cadastro_usuario', description: 'Ir para cadastro do usuario', icon: 'fas fa-database' }
]

export default {
  components: {
    'menu-adm': MenuAdm,
    'menu-gerente': MenuGerente,
    'menu-func': MenuFunc
  },
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
              localStorage.setItem('usuario', JSON.stringify(usuario.data.response[0]))
            })
          next()
        }
      })
      .finally(() => {
        Loading.hide()
      })
  },
  mounted () {
    // Erro de rendereização aqui..
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
      token: '',
      urlImg: '../assets/logo_tcc.png',
      dia_atual: '',
      searchText: '',
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
