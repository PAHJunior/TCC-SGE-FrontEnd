<template>
  <q-layout view="lHh Lpr lFf" class=" row">
    <q-page-container class="absolute-center col-md-3 col-sm-5 col-xs-6">
      <q-card style="height: 300px;">
        <q-card-section class="fit row justify-center items-center content-center  q-gutter-y-xl">
          <div class="brand_logo_container absolute-center">
            <img src="../assets/logo_tcc.png" class="brand_logo" alt="Logo">
          </div>
          <div class="col-md-12 q-gutter-y-md row" >
            <div class="row col-12">
              <q-input class="col-12" filled v-model="usuario.login" label="Login" dense>
                <template v-slot:append>
                  <q-icon
                    name="fas fa-user"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row col-12">
              <q-input class="col-12" filled v-model="usuario.senha" label="Senha" dense :type="isPwd ? 'password' : 'text'">
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
            <q-btn label="Entrar"  type="submit" color="primary" @click.native='login' class="col-12"/>
          </div>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import Usuario from '../service/usuario/usuario.js'
import { mapMutations } from 'vuex'
import { Loading, QSpinnerGears } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      isPwd: true,
      usuario: {
        login: '',
        senha: '',
        empresa: this.$route.params.empresa
      },
      error: false,
      msg_error: ''
    }
  },
  methods: {
    ...mapMutations('usuarios', ['USUARIO']),
    login () {
      Loading.show({
        QSpinnerGears,
        spinnerColor: 'primary',
        message: 'Carregando...',
        messageColor: 'white'
      })
      Usuario.login(this.usuario)
        .then((usuarios) => {
          console.log(usuarios.data)
          if (usuarios.data.errors) {
            for (let i = 0; i < usuarios.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: usuarios.data.errors[i].message,
                position: 'top-right',
                icon: 'warning',
                timeout: 2000,
                actions: [{
                  color: 'white',
                  icon: 'close'
                }]
              })
            }
          }
          if (usuarios.data.status === 200) {
            if (usuarios.data.response.isLogado) {
              this.USUARIO(usuarios.data.response)
              localStorage.setItem('token', usuarios.data.response.token)
              localStorage.setItem('isLogado', usuarios.data.response.isLogado)
              localStorage.setItem('id_usuario', usuarios.data.response.id_usuario)
              localStorage.setItem('nome', usuarios.data.response.nome)
              localStorage.setItem('email', usuarios.data.response.email)
              localStorage.setItem('login', usuarios.data.response.login)
              localStorage.setItem('id_empresa', usuarios.data.response.empresa.id_empresa)
              localStorage.setItem('nome_fantasia', usuarios.data.response.empresa.nome_fantasia)
              localStorage.setItem('razao_social', usuarios.data.response.empresa.razao_social)
              localStorage.setItem('cnpj', usuarios.data.response.empresa.cnpj)
              this.$router.push('/dashboard')
            }
          }
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            message: 'Não foi possivel realizar a conexão',
            position: 'top-right',
            icon: 'warning',
            timeout: 2000,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
          this.error = true
          console.log(error)
        })
        .finally(() => {
          Loading.hide()
        })
    }
  },
  beforeRouteEnter (to, from, next) {
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
    if ((to.params.empresa === 'raotes') || (to.params.empresa === 'tcc')) {
      next()
    } else {
      next({ path: '/login/tcc' })
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
