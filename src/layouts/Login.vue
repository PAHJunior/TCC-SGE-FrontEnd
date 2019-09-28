<template>
  <q-layout view="lHh Lpr lFf" class=" row">
    <q-page-container class="absolute-center col-md-3 col-sm-5 col-xs-6">
      <q-card style="height: 300px;">
        <q-card-section class="fit row justify-center items-center content-center  q-gutter-y-xl">
          <div class="brand_logo_container absolute-center">
            <img src="../assets/logo_tcc.png" class="brand_logo" alt="Logo">
          </div>
          <div class="col-md-12 q-gutter-y-md">
            <div>
              <q-input filled v-model="form.login" label="Login" dense>
                <template v-slot:append>
                  <q-icon
                    name="fas fa-user"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div>
              <q-input filled v-model="form.senha" label="Senha" dense :type="isPwd ? 'password' : 'text'">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row col-12">
            <q-btn label="Entrar" type="submit" color="primary" class="col-12"/>
          </div>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      isPwd: true,
      form: {
        login: '',
        senha: '',
        empresa: this.$route.params.empresa
      }
    }
  },
  methods: {
    openURL
  },
  beforeRouteUpdate (to, from, next) {
    if ((to.params.empresa === 'raotes') || (to.params.empresa === 'tcc')) {
      next()
    } else {
      next({ path: '/' })
    }
  }
}
</script>

<style >
.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  /* background: #eaeff5; */
  /* border: 2px solid white; */
}
.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -60px;
  border-radius: 50%;
  background: #eaeff5;
  padding: 10px;
  text-align: center;
}
</style>
