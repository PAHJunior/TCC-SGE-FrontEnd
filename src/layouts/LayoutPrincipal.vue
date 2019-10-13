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

        <q-input dark dense standout v-model="searchText" input-class="text-right" class="absolute-center col-md-10 col-xs-12 col-sm-12" >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
          </template>
        </q-input>

      </q-toolbar>

      <!-- ToolBar para os botões de ação com o usuario -->
      <q-toolbar class="col-md-3 col-xs-5 col-sm-3 text-white bg-secondary">

        <q-space />

        <q-btn  flat round dense icon="notifications">
          <q-menu fit anchor="bottom right" self="top right">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Having fun</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Mind blown</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn  flat round dense icon="img:statics/calendar.png">
          <q-menu  anchor="bottom middle" self="top middle">
            <q-date
              class="text-black"
              v-model="date"
              minimal
            />
          </q-menu>
        </q-btn>

        <q-btn flat dense>
          <div class="row items-center no-wrap">
            <q-icon left name="img:statics/user.png" />
            <div class="text-center" v-if="!$q.screen.lt.md">
              Olá, {{ usuario.login }}
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

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ usuario.login }}</div>

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
            to="/dashboard"
          >

            <q-item-section avatar>

              <q-icon name="fas fa-dolly" />

            </q-item-section>

            <q-item-section>
              <q-item-label>Movimentação</q-item-label>
            </q-item-section>

          </q-item>

          <q-expansion-item
            v-for="menus in menu"
            :key="menus.id"
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
                v-for="submenus in menus.submenu"
                :key="submenus"
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
import { mapState } from 'vuex'
import { openURL, Loading, QSpinnerGears } from 'quasar'

export default {
  beforeRouteUpdate (to, from, next) {
    Loading.show({
      message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>',
      spinner: QSpinnerGears
    })
    Validar.token(localStorage.getItem('token'))
      .then((isValid) => {
        if (!isValid.data) {
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
          next()
        }
      })
      .finally(() => {
        Loading.hide()
      })
  },
  mounted () {
    this.token = localStorage.getItem('token')
  },
  name: 'MyLayout',
  data () {
    return {
      token: '',
      urlImg: '../assets/logo_tcc.png',
      calendario: false,
      date: '',
      searchText: '',
      menu: {
        cadastros: {
          id: '0',
          label: 'Cadastros Gerais',
          icon: 'img:statics/database.png',
          submenu: [
            { label: 'Cadastrar Usuário', link: '/cadastro_usuario' },
            { label: 'Cadastrar Estoque', link: '/cadastro_estoque' },
            { label: 'Cadastro de Produto', link: 'cadastro_produtos' },
            { label: 'Cadastro do Fornecedor', link: '/cadastro_fornecedor' },
            { label: 'Cadastro de Categorias', link: '/cadastro_categoria' },
            { label: 'Cadastro de Unid. de Medidas', link: '/cadastro_unid_medida' },
            { label: 'Cadastro de Grupos', link: '/cadastro_grupo' },
            { label: 'Cadastro de Movimentação', link: '/cadastro_movimentacao' }
          ]
        },
        consulta: {
          id: '1',
          label: 'Consultar',
          icon: 'img:statics/feature-search-white.png',
          submenu: [
            { label: 'Consultar Usúario', link: '/consultar_usuario' },
            { label: 'Consultar Estoque', link: '/consultar_estoque' },
            { label: 'Consultar Produto', link: '/consultar_produtos' },
            { label: 'Consultar Fornecedor', link: '/consultar_fornecedor' },
            { label: 'Consultar Categorias', link: '/consultar_categoria' },
            { label: 'Consultar Unid. de Medida', link: '/consultar_unid_medida' },
            { label: 'Consultar Grupos', link: 'consultar_grupo' },
            { label: 'Consultar Movimentações', link: 'consultar_movimentacao' },
            { label: 'Consultar Relatorio', link: 'consultar_relatorio' }
          ]
        },
        relatorio: {
          id: '2',
          label: 'Relatório',
          icon: 'img:statics/file-chart.png',
          submenu: [
            { label: 'Emitir Relatório', link: 'consultar_relatorio' }
          ]
        },
        configuracoes: {
          id: '3',
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
    openURL,
    sair () {
      localStorage.removeItem('token')
      localStorage.removeItem('token')
      localStorage.removeItem('isLogado')
      localStorage.removeItem('id_usuario')
      localStorage.removeItem('nome')
      localStorage.removeItem('email')
      localStorage.removeItem('login')
      localStorage.removeItem('id_empresa')
      localStorage.removeItem('nome_fantasia')
      localStorage.removeItem('razao_social')
      localStorage.removeItem('cnpj')
    }
  }
}
</script>

<style>
.bg-fundo-menu {
  background: #222d32;
}
</style>
