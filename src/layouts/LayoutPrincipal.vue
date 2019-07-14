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

        <q-btn  flat round dense icon="img:statics/calendar.png">
          <q-menu  anchor="bottom middle" self="top middle">
            <q-date
              class="text-black"
              v-model="date"
              minimal
            />
          </q-menu>
        </q-btn>

        <q-btn flat round dense icon="img:statics/star.png" />

        <q-btn flat dense>

          <div class="row items-center no-wrap">
            <q-icon left name="img:statics/user.png" />
            <div class="text-center" v-if="!$q.screen.lt.md">
              Olá, {{ usuario }}
            </div>
          </div>

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

      <q-toolbar class="bg-primary text-white shadow-2 ">
        <q-toolbar-title></q-toolbar-title>
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
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      calendario: false,
      date: '',
      searchText: '',
      usuario: 'Paulo',
      menu: {
        cadastros: {
          id: '0',
          label: 'Cadastros Gerais',
          icon: 'img:statics/database.png',
          submenu: [
            { label: 'Cadastrar Usuário', link: '/usuario' },
            { label: 'Cadastrar Estoque' },
            { label: 'Cadastro de Grupos' },
            { label: 'Cadastro de Produto' }
          ]
        },
        consulta: {
          id: '1',
          label: 'Consultar',
          icon: 'img:statics/feature-search-white.png',
          submenu: [
            { label: 'Consultar Estoque' },
            { label: 'Consultar Produto' }
          ]
        },
        relatorio: {
          id: '2',
          label: 'Relatórios',
          icon: 'img:statics/file-chart.png',
          submenu: [
            { label: 'Relatório mensal' }
          ]
        },
        configuracoes: {
          id: '3',
          label: 'Configurações',
          icon: 'img:statics/settings.png',
          submenu: [
            { label: 'Admnistrador' }
          ]
        }
      },
      empresa: 'TCC',
      link: '',
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.bg-fundo-menu {
  background: #222d32;
}
</style>
