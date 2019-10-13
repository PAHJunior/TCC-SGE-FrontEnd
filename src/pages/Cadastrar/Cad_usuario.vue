<template>
  <q-page class="q-pa-lg  shadow-4 ">
    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-md">

          <div class="col-12 ">
            <q-card class="transparent no-shadow">
              <q-breadcrumbs>
                <template v-slot:separator>
                  <q-icon
                    size="1.2em"
                    name="arrow_forward"
                    color="primary"
                  />
                </template>

                <q-breadcrumbs-el icon="home" label="Home" to="/" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_usuario"  label="Consultar usuários" />
                <q-breadcrumbs-el icon="fas fa-user" to="/cadastro_usuario"  label="Cadastro de usuário" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- <div transition="expand" class="col-12 row q-gutter-y-xs" v-if="this.errors.length > 0">
            <q-card v-for="error in this.errors" :key="error" class="col-12 transparent no-shadow">
              <q-banner dense inline-actions class="text-white bg-negative">
                {{ error.msg }}
              </q-banner>
            </q-card>
          </div> -->

          <!-- <div transition="expand" class="col-12 row q-gutter-y-xs" v-if="this.errors.length > 0">
            <q-card class="col-12 transparent no-shadow">
              <q-banner dense inline-actions class="text-white bg-negative">
                <span class="text-h5"> Encontramos
                  <span class="text-weight-bold"> {{ this.errors.length }} erros</span>
                </span>
                <ul v-for="error in this.errors" :key="error">
                  <li>{{ error.msg }}</li>
                </ul>
              </q-banner>
            </q-card>
          </div> -->

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">

                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                >
                  <div class="row">
                    <div class="col">
                      <div class="q-gutter-y-md row justify-center">

                        <fieldset class="col-12 no-border">

                          <legend>Dados cadastrais</legend>

                          <div class="q-col-gutter-sm row items-start">

                            <div :class="this.v_.id ? 'validar-error row col-md-1' : 'row col-md-1' ">
                              <q-input
                                class=" col-md-12"
                                dense
                                outlined
                                v-model="usuario.id"
                                label="ID"
                                disable
                              />
                            </div>

                            <!-- nom completo -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-11' : 'row col-md-11' ">
                              <q-input
                                ref="nome"
                                maxlength="100"
                                class="text-red col-12"
                                dense
                                outlined
                                v-model="usuario.nome"
                                label="Nome completo"
                              />
                            </div>

                            <!-- Campo do CPF -->
                            <div :class="this.v_.cpf ? 'validar-error row col-md-3' : 'row col-md-3'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                mask="###.###.###-##"
                                v-model="usuario.cpf"
                                label="CPF"
                              />
                            </div>

                            <!-- Campo do RG -->
                            <div :class="this.v_.rg ? 'validar-error row col-md-3': 'row col-md-3'">
                              <q-input
                                ref="rg"
                                class="col-12"
                                mask="##.###.###-#"
                                dense
                                outlined
                                v-model="usuario.rg"
                                label="RG"
                              />
                            </div>

                            <!-- Campo data de nascimento -->
                            <div :class="this.v_.dt_nascimento ? 'validar-error row col-md-3' : 'row col-md-3'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                mask="##-##-####"
                                v-model="usuario.dt_nascimento"
                                label="Data de nascimento"
                              >
                                <template v-slot:prepend>
                                  <!-- <q-icon name="event" /> -->
                                  <q-btn round flat dense icon="event">
                                    <q-menu fit anchor="bottom left" self="top left">

                                      <q-date
                                        v-model="usuario.dt_nascimento"
                                        minimal
                                        mask="DD-MM-YYYY"
                                      />

                                    </q-menu>

                                  </q-btn>
                                </template>
                              </q-input>
                            </div>

                            <!-- Campo fk_usuario_hierarquia -->
                            <div :class="this.v_.fk_usuario_hierarquia ? 'validar-error row col-md-3': 'row col-md-3'">
                              <q-select
                                :options="opt_hierarquia"
                                class="col-12"
                                option-value="id"
                                option-label="desc"
                                dense
                                outlined
                                map-options
                                emit-value
                                v-model="usuario.fk_usuario_hierarquia"
                                label="Hierarquia"
                              />
                            </div>

                            <!-- Campo Login -->
                            <div :class="this.v_.login ? 'validar-error row col-md-4' : 'row col-md-4'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.login"
                                label="Login"
                              />
                            </div>

                            <!-- Campo Senha -->
                            <div :class="this.v_.senha ? 'validar-error row col-md-4' : 'row col-md-4'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                :type="isPwd ? 'password' : 'text'"
                                v-model="usuario.senha"
                                label="Senha"
                              >
                                <template v-slot:append>
                                  <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                  />
                                </template>
                              </q-input>
                            </div>

                            <!-- Campo Confirmar Senha -->
                            <div :class="this.v_.confirmarSenha ? 'validar-error row col-md-4' : 'row col-md-4'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                :type="isConfirmPwd ? 'password' : 'text'"
                                v-model="usuario.confirmarSenha"
                                label="Confirmar senha"
                              >
                                <template v-slot:append>
                                  <q-icon
                                    :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isConfirmPwd = !isConfirmPwd"
                                  />
                                </template>
                              </q-input>
                            </div>

                          </div>
                        </fieldset>

                        <!-- Dados para contato -->
                        <fieldset class="col-12 no-border">
                          <legend>Dados para contato</legend>
                          <div class="q-col-gutter-sm row">

                            <!-- Campo do Telefone -->
                            <div :class="this.v_.email ? 'validar-error row col-12' : 'row col-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.email"
                                label="E-mail"
                              />
                            </div>

                            <!-- Campo do Telefone -->
                            <div :class="this.v_.telefone ? 'validar-error row col-md-6' : 'row col-md-6'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                mask="(##) ####-####"
                                v-model="usuario.telefone"
                                label="Telefone"
                              />
                            </div>

                            <!-- Campo do Celular -->
                            <div :class="this.v_.celular ? 'validar-error row col-md-6' : 'row col-md-6'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                mask="(##) #####-####"
                                v-model="usuario.celular"
                                label="Celular"
                              />
                            </div>

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Endereço</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo CEP -->
                            <div :class="this.v_.endereco.cep ? 'validar-error row col-md-2' : 'row col-md-2'">
                              <q-input
                                class="col-12"
                                dense
                                v-on:keyup.enter="buscarCEP"
                                outlined
                                mask="#####-###"
                                v-model="usuario.endereco.cep"
                                label="CEP"
                              />
                            </div>

                            <!-- Campo Logradouro -->
                            <div :class="this.v_.endereco.logradouro ? 'validar-error row col-md-8' : 'row col-md-8'">
                              <q-input
                                v-on:keyup.tab="buscarCEP"
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.endereco.logradouro"
                                label="Logradouro"
                              />
                            </div>

                            <!-- Campo Numero -->
                            <div :class="this.v_.endereco.numero ? 'validar-error row col-md-2' : 'row col-md-2'">
                              <q-input
                                class="col-md-12"
                                dense
                                outlined
                                v-model="usuario.endereco.numero"
                                label="Numero"
                              />
                            </div>

                            <!-- Campo Bairro -->
                            <div :class="this.v_.endereco.bairro ? 'validar-error row col-md-5' : 'row col-md-5'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.endereco.bairro"
                                label="Bairro"
                              />
                            </div>

                            <!-- Campo Cidade -->
                            <div :class="this.v_.endereco.cidade ? 'validar-error row col-md-5' : 'row col-md-5'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.endereco.cidade"
                                label="Cidade"
                              />
                            </div>

                            <!-- Campo UF -->
                            <div :class="this.v_.endereco.uf ? 'validar-error row col-md-2' : 'row col-md-2'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.endereco.uf"
                                label="UF"
                              />
                            </div>

                            <!-- Campo complemento -->
                            <div :class="this.v_.endereco.complemento ? 'validar-error row col-12' : 'row col-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="usuario.endereco.complemento"
                                label="Complemento"
                              />
                            </div>

                          </div>

                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" @click="cadastrarUsuario"  type="submit" color="primary" class="col-12"/>
                        </div>
                      </div>
                    </div>
                  </div>

                </q-form>

              </q-card-section>
            </q-card>

          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Cep from '../../service/cep/cep.js'
import Usuario from '../../service/usuario/usuario.js'
import Hierarquia from '../../service/hierarquia/hierarquia.js'
import Validar from '../../service/validarToken/validar'
import { Loading, QSpinnerGears } from 'quasar'

export default {
  mounted () {
    Hierarquia.buscar()
      .then((hierarquias) => {
        this.opt_hierarquia = hierarquias.data.response.map((h) => {
          return {
            id: h.id_hierarquia,
            desc: h.nome
          }
        })
      })
  },
  data () {
    return {
      isPwd: true,
      isConfirmPwd: true,
      errors: [],
      opt_hierarquia: [],
      v_: {
        id: false,
        nome: false,
        fk_usuario_hierarquia: false,
        rg: false,
        cpf: false,
        dt_nascimento: false,
        login: false,
        senha: false,
        confirmarSenha: false,
        email: false,
        telefone: false,
        celular: false,
        endereco: {
          cep: false,
          logradouro: false,
          numero: false,
          bairro: false,
          cidade: false,
          uf: false,
          complemento: false
        }
      },
      usuario: {
        id: '',
        nome: '',
        rg: '',
        cpf: '',
        dt_nascimento: '',
        login: '',
        senha: '',
        confirmarSenha: '',
        email: '',
        telefone: '',
        celular: '',
        fk_usuario_hierarquia: '',
        fk_usuario_empresa: 1,
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
          complemento: ''
        }
      }
    }
  },
  computed: {

  },
  methods: {
    isEmail (email) {
      let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
      return emailPattern.test(email)
    },
    limparCampos () {
      this.usuario.id = ''
      this.usuario.nome = ''
      this.usuario.rg = ''
      this.usuario.cpf = ''
      this.usuario.dt_nascimento = ''
      this.usuario.login = ''
      this.usuario.senha = ''
      this.usuario.confirmarSenha = ''
      this.usuario.email = ''
      this.usuario.telefone = ''
      this.usuario.celular = ''
      this.usuario.endereco.cep = ''
      this.usuario.endereco.logradouro = ''
      this.usuario.endereco.numero = ''
      this.usuario.endereco.bairro = ''
      this.usuario.endereco.uf = ''
      this.usuario.endereco.complemento = ''
    },
    validarCampos () {
      this.errors = []
      // Verificando o Nome
      if (this.usuario.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
      }

      // Verificando o CPF
      if (this.usuario.cpf.length !== 14) {
        this.errors.push({ msg: 'O campo cpf é obrigátorio', campo: 'cpf', erro: true })
        this.v_.cpf = true
      } else {
        this.v_.cpf = false
      }

      // Verificando o RG
      if (this.usuario.rg.length !== 12) {
        this.errors.push({ msg: 'O campo rg é obrigátorio', campo: 'rg', erro: true })
        this.v_.rg = true
      } else {
        this.v_.rg = false
      }

      // Verificando a data de nascimento
      if (this.usuario.dt_nascimento.length !== 10) {
        this.errors.push({ msg: 'O campo data de nascimento é obrigátorio', campo: 'dt_nascimento', erro: true })
        this.v_.dt_nascimento = true
      } else {
        this.v_.dt_nascimento = false
      }

      // Verificando o fk_usuario_hierarquia
      if (this.usuario.fk_usuario_hierarquia === 0) {
        this.errors.push({ msg: 'O campo hierarquia é obrigátorio', campo: 'hierarquia', erro: true })
        this.v_.fk_usuario_hierarquia = true
      } else {
        this.v_.fk_usuario_hierarquia = false
      }

      // Verificando o login
      if (this.usuario.login.length === 0) {
        this.errors.push({ msg: 'O campo login é obrigátorio', campo: 'login', erro: true })
        this.v_.login = true
      } else {
        this.v_.login = false
      }

      // Verificando a senha
      if (this.usuario.senha.length === 0) {
        this.errors.push({ msg: 'O campo senha é obrigátorio', campo: 'senha', erro: true })
        this.v_.senha = true
      }
      if (this.usuario.senha.length < 5) {
        this.errors.push({ msg: 'A senha deverá conter mais de 5 caracteres', campo: 'senha', erro: true })
        this.v_.senha = true
      } else {
        this.v_.senha = false
      }

      // Verificando a senha
      if (this.usuario.confirmarSenha !== this.usuario.senha) {
        this.errors.push({ msg: 'Confirme novamente sua senha', campo: 'confirmarSenha', erro: true })
        this.v_.confirmarSenha = true
      } else {
        this.v_.confirmarSenha = false
      }

      // Verificando o email
      if (this.usuario.email.length === 0) {
        this.errors.push({ msg: 'O campo email é obrigátorio', campo: 'email', erro: true })
        this.v_.email = true
      } else if (!this.isEmail(this.usuario.email)) {
        this.errors.push({ msg: 'O email informado está inválido', campo: 'email', erro: true })
        this.v_.email = true
      } else {
        this.v_.email = false
      }

      // Verificando o email
      if (this.usuario.celular.length === 0) {
        this.errors.push({ msg: 'O campo celular é obrigátorio', campo: 'celular', erro: true })
        this.v_.celular = true
      } else {
        this.v_.celular = false
      }

      // Verificando CEP
      if (this.usuario.endereco.cep.length !== 9) {
        this.errors.push({ msg: 'O cep informado é inválido', campo: 'cep', erro: true })
        this.v_.endereco.cep = true
      } else {
        this.v_.endereco.cep = false
      }

      // Verificando logradouro
      if (this.usuario.endereco.logradouro.length === 0) {
        this.errors.push({ msg: 'O campo logradouro é obrigátorio', campo: 'logradouro', erro: true })
        this.v_.endereco.logradouro = true
      } else {
        this.v_.endereco.logradouro = false
      }

      // Verificando CEP
      if (this.usuario.endereco.numero.length === 0) {
        this.errors.push({ msg: 'O campo numero é obrigátorio', campo: 'numero', erro: true })
        this.v_.endereco.numero = true
      } else {
        this.v_.endereco.numero = false
      }

      // Verificando bairro
      if (this.usuario.endereco.bairro.length === 0) {
        this.errors.push({ msg: 'O campo bairro é obrigátorio', campo: 'bairro', erro: true })
        this.v_.endereco.bairro = true
      } else {
        this.v_.endereco.bairro = false
      }

      // Verificando cidade
      if (this.usuario.endereco.cidade.length === 0) {
        this.errors.push({ msg: 'O campo cidade é obrigátorio', campo: 'cidade', erro: true })
        this.v_.endereco.cidade = true
      } else {
        this.v_.endereco.cidade = false
      }

      // Verificando uf
      if (this.usuario.endereco.uf.length === 0) {
        this.errors.push({ msg: 'O campo uf é obrigátorio', campo: 'uf', erro: true })
        this.v_.endereco.uf = true
      } else {
        this.v_.endereco.uf = false
      }

      // Exibindo os erros
      if (this.errors.length > 0) {
        for (let i = 0; i < this.errors.length; i++) {
          this.$q.notify({
            color: 'negative',
            message: this.errors[i].msg,
            position: 'top-right',
            icon: 'warning',
            timeout: 2000,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
        }
        return false
      } else {
        return true
      }
    },
    buscarCEP () {
      Cep.cep(this.usuario.endereco.cep)
        .then(resposta => {
          console.log(resposta.data)
          const cep = resposta.data
          this.usuario.endereco.logradouro = cep.logradouro
          this.usuario.endereco.bairro = cep.bairro
          this.usuario.endereco.cidade = cep.cidade
          this.usuario.endereco.uf = cep.estado
        })
    },
    cadastrarUsuario () {
      if (this.validarCampos()) {
        Usuario.cadastrar(this.usuario)
          .then((usuario) => {
            if (usuario.data.errors) {
              for (let i = 0; i < usuario.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: usuario.data.errors[i].message,
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
            if (usuario.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: usuario.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.limparCampos()
            }
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu um erro inesperado, entre em contato com o suporte`,
              position: 'top-right',
              icon: 'warning',
              timeout: 2000,
              actions: [{
                color: 'white',
                icon: 'close'
              }]
            })
          })
      }
    }
  },
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
  }
}

</script>

<style>
/* always present */
.expand-transition {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

legend {
  padding: 0.2em 0.5em;
  font-size:90%;
  color: grey;
  text-align:left;
}
</style>
