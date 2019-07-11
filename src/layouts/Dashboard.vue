<template>
  <q-layout view="lHh lpR lfr">
    <q-header elevated >
      <q-toolbar class="col-md-10 text-white bg-secondary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Sistema de gerenciamento de estoque
        </q-toolbar-title>

        <q-space />

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
      content-class="bg-fundo-menu"
      :breakpoint="400"
    >
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
      <q-list>
        <q-item
          :active="link === 'dashboard'"
          @click="link = 'dashboard'"
          class="text-grey-1"
          clickable
          tag="a"
          target="_blank"
          :href="link == 'dashboard'? false : '/dashboard'">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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
