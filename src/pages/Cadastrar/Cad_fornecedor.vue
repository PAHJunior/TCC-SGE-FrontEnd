<template>
  <q-page class="q-pa-lg  shadow-4 ">
    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-lg">

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

                <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/dashboard" />
                <q-breadcrumbs-el icon="fas fa-truck" to="/cadastro_fornecedor"  label="Cadastro do fornecedor" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">

                <q-form>
                  <div class="row">

                    <div class="col">
                      <div class="q-gutter-y-md row justify-center col-12">

                        <fieldset class="col-12 no-border">

                          <legend>Dados do fornecedor</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do cnome do fornecedor -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-9 col-xs-12 col-sm-12' : 'row col-md-9 col-xs-12 col-sm-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.nome"
                                label="Nome do fornecedor"
                              />
                            </div>

                            <div class="col-md-3 col-xs-12 col-sm-12">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="fornecedor.ativo"
                                label="Status de categoria"/>
                            </div>

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Endereço</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo CEP -->
                            <div :class="this.v_.endereco.cep ? 'validar-error row col-md-2 col-xs-12 col-sm-3' : 'row col-md-2 col-xs-12 col-sm-3'">
                              <q-input
                                class="col-12"
                                dense
                                mask="#####-###"
                                outlined
                                v-model="fornecedor.endereco.cep"
                                label="CEP"
                              />
                            </div>

                            <!-- Campo Logradouro -->
                            <div :class="this.v_.endereco.logradouro ? 'validar-error row col-md-8 col-xs-12 col-sm-9' : 'row col-md-8 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.logradouro"
                                label="Logradouro"
                              />
                            </div>

                            <!-- Campo Numero -->
                            <div :class="this.v_.endereco.numero ? 'validar-error row col-md-2 col-xs-12 col-sm-3' : 'row col-md-2 col-xs-12 col-sm-3'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.numero"
                                label="Numero"
                              />
                            </div>

                            <!-- Campo Bairro -->
                            <div :class="this.v_.endereco.bairro ? 'validar-error row col-md-5 col-xs-12 col-sm-9' : 'row col-md-5 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.bairro"
                                label="Bairro"
                              />
                            </div>

                            <!-- Campo Cidade -->
                            <div :class="this.v_.endereco.cidade ? 'validar-error row col-md-5 col-xs-12 col-sm-9' : 'row col-md-5 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.cidade"
                                label="Cidade"
                              />
                            </div>

                            <!-- Campo UF -->
                            <div :class="this.v_.endereco.uf ? 'validar-error row col-md-2 col-xs-12 col-sm-3' : 'row col-md-2 col-xs-12 col-sm-3'">
                              <q-select
                                class="col-12"
                                dense
                                mask="AA"
                                outlined
                                v-model="fornecedor.endereco.uf"
                                label="UF"
                                :options="estados"
                                emit-value
                                map-options
                              />
                            </div>

                            <!-- Campo UF -->
                            <div :class="this.v_.endereco.complemento ? 'validar-error row col-md-12 col-xs-12 col-sm-12' : 'row col-md-12 col-xs-12 col-sm-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.complemento"
                                label="Complemento"
                              />
                            </div>

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Representante (opcional)</legend>

                          <div class="q-col-gutter-sm row">

                            <q-input
                              class="col-md-4 col-xs-12 col-sm-4"
                              dense
                              outlined
                              v-model="fornecedor.representante.nome"
                              label="Nome do contato"
                            />

                            <q-input
                              class="col-md-8 col-xs-12 col-sm-8"
                              dense
                              outlined
                              v-model="fornecedor.representante.email"
                              label="E-mail"
                            />

                            <!-- Campo do Telefone -->
                            <q-input
                              class="col-md-6 col-xs-12 col-sm-6"
                              dense
                              mask="(##) ####-####"
                              outlined
                              v-model="fornecedor.representante.telefone"
                              label="Telefone"
                            />

                            <!-- Campo do Celular -->
                            <q-input
                              class="col-md-6 col-xs-12 col-sm-6"
                              dense
                              mask="(##) #####-####"
                              outlined
                              v-model="fornecedor.representante.celular"
                              label="Celular"
                            />

                          </div>

                        </fieldset>

                        <div class="row col-md-6 col-xs-6 col-sm-6 ">
                          <q-btn label="Cadastrar" @click="cadastrar" type="submit" color="primary" class="col-12"/>
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
import Fornecedor from '../../service/fornecedor/fornecedor.js'
import Cep from '../../service/cep/cep.js'

export default {
  data () {
    return {
      errors: [],
      v_: {
        nome: false,
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
      fornecedor: {
        nome: '',
        ativo: true,
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
          complemento: ''
        },
        representante: {
          nome: '',
          email: '',
          telefone: '',
          celular: ''
        }
      },
      estados: [
        {
          value: 'AC',
          label: 'Acre'
        },
        {
          value: 'AL',
          label: 'Alagoas'
        },
        {
          value: 'AM',
          label: 'Amazonas'
        },
        {
          value: 'AP',
          label: 'Amapá'
        },
        {
          value: 'BA',
          label: 'Bahia'
        },
        {
          value: 'CE',
          label: 'Ceará'
        },
        {
          value: 'DF',
          label: 'Distrito Federal'
        },
        {
          value: 'ES',
          label: 'Espírito Santo'
        },
        {
          value: 'GO',
          label: 'Goiás'
        },
        {
          value: 'MA',
          label: 'Maranhão'
        },
        {
          value: 'MG',
          label: 'Minas Gerais'
        },
        {
          value: 'MS',
          label: 'Mato Grosso do Sul'
        },
        {
          value: 'MT',
          label: 'Mato Grosso'
        },
        {
          value: 'PA',
          label: 'Pará'
        },
        {
          value: 'PB',
          label: 'Paraíba'
        },
        {
          value: 'PE',
          label: 'Pernambuco'
        },
        {
          value: 'PI',
          label: 'Piauí'
        },
        {
          value: 'PR',
          label: 'Paraná'
        },
        {
          value: 'RJ',
          label: 'Rio de Janeiro'
        },
        {
          value: 'RN',
          label: 'Rio Grande do Norte'
        },
        {
          value: 'RO',
          label: 'Rondônia'
        },
        {
          value: 'RR',
          label: 'Roraima'
        },
        {
          value: 'RS',
          label: 'Rio Grande do Sul'
        },
        {
          value: 'SC',
          label: 'Santa Catarina'
        },
        {
          value: 'SE',
          label: 'Sergipe'
        },
        {
          value: 'SP',
          label: 'São Paulo'
        },
        {
          value: 'TO',
          label: 'Tocantins'
        }
      ]
    }
  },
  watch: {
    'fornecedor.endereco.cep': function (val) {
      if (val.length > 8) {
        this.buscarCEP(val)
      } else {
        this.fornecedor.endereco.logradouro = ''
        this.fornecedor.endereco.numero = ''
        this.fornecedor.endereco.bairro = ''
        this.fornecedor.endereco.cidade = ''
        this.fornecedor.endereco.uf = ''
        this.fornecedor.endereco.complemento = ''
      }
    }
  },
  methods: {
    limparCampos () {
      this.fornecedor.nome = ''
      this.fornecedor.ativo = true
      this.fornecedor.endereco.cep = ''
      this.fornecedor.endereco.logradouro = ''
      this.fornecedor.endereco.numero = ''
      this.fornecedor.endereco.bairro = ''
      this.fornecedor.endereco.cidade = ''
      this.fornecedor.endereco.uf = ''
      this.fornecedor.endereco.complemento = ''
      this.fornecedor.representante.nome = ''
      this.fornecedor.representante.email = ''
      this.fornecedor.representante.telefone = ''
      this.fornecedor.representante.celular = ''
    },
    buscarCEP (value) {
      Cep.cep(value)
        .then(resposta => {
          const cep = resposta.data
          this.fornecedor.endereco.logradouro = cep.logradouro
          this.fornecedor.endereco.bairro = cep.bairro
          this.fornecedor.endereco.cidade = cep.cidade
          this.fornecedor.endereco.uf = cep.estado
        })
    },
    isEmail (email) {
      let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
      return emailPattern.test(email)
    },
    validarCampos () {
      this.errors = []
      // Verificando o Nome
      if (this.fornecedor.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome do fornecedor é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
      }

      if (this.fornecedor.endereco.cep.length !== 9) {
        this.errors.push({ msg: 'O cep informado está inválido', campo: 'cep', erro: true })
        this.v_.endereco.cep = true
      } else {
        this.v_.endereco.cep = false
      }

      if (this.fornecedor.endereco.logradouro.length === 0) {
        this.errors.push({ msg: 'O campo logradouro é obrigátorio', campo: 'logradouro', erro: true })
        this.v_.endereco.logradouro = true
      } else {
        this.v_.endereco.logradouro = false
      }

      if (this.fornecedor.endereco.numero.length === 0) {
        this.errors.push({ msg: 'O campo numero é obrigátorio', campo: 'numero', erro: true })
        this.v_.endereco.numero = true
      } else {
        this.v_.endereco.numero = false
      }

      if (this.fornecedor.endereco.bairro.length === 0) {
        this.errors.push({ msg: 'O campo bairro é obrigátorio', campo: 'bairro', erro: true })
        this.v_.endereco.bairro = true
      } else {
        this.v_.endereco.bairro = false
      }

      if (this.fornecedor.endereco.cidade.length === 0) {
        this.errors.push({ msg: 'O campo cidade é obrigátorio', campo: 'cidade', erro: true })
        this.v_.endereco.cidade = true
      } else {
        this.v_.endereco.cidade = false
      }

      if (this.fornecedor.endereco.uf.length === 0) {
        this.errors.push({ msg: 'O campo UF é obrigátorio', campo: 'uf', erro: true })
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
    cadastrar () {
      if (this.validarCampos()) {
        Fornecedor.cadastrar(this.fornecedor)
          .then((fornecedor) => {
            if (fornecedor.data.errors) {
              for (let i = 0; i < fornecedor.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: fornecedor.data.errors[i].message,
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
            if (fornecedor.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: fornecedor.data.response,
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
  computed: {

  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}

legend {
  padding: 0.2em 0.5em;
  font-size:90%;
  color: grey;
  text-align:left;
}
</style>
