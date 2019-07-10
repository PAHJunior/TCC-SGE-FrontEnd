<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="fixed-center">
       <q-card>
          <q-card-section class="q-gutter-y-md row">
          <div class="circle img absolute-center">
          </div>
          <div class="col-md-12">
          <br/>
          <br/>
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
           <div class="col-md-12">
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
        </q-card-section>
        <div class="row">
          <q-btn label="Entrar" type="submit" color="primary" class="col-12"/>
        </div>
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
.circle {
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 100px;
  border: 2px solid #1f6289;
  margin-top: -24%;
}
.img {
  background-image: url("https://cdn.quasar.dev/img/avatar.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
