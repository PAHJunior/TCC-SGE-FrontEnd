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

                <q-breadcrumbs-el icon="home" label="Home" to="/" />
                <q-breadcrumbs-el icon="fas fa-user" to="/cadastro_grupo"  label="Cadastro de grupos" />

              </q-breadcrumbs>

            </q-card>
          </div>

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

                          <div class="q-col-gutter-sm row">

                            <!-- nom completo -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-10' : 'row col-md-10'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="hierarquia.nome"
                                label="Nome da hierarquia"
                              />
                            </div>

                            <div class="col-md-2">
                              <q-checkbox class="float-right" left-label v-model="hierarquia.ativo" label="Status da hierarquia" />
                            </div>

                          </div>
                        </fieldset>

                        <div class="row col-md-6 ">
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

import Hierarquia from '../../service/hierarquia/hierarquia.js'

export default {
  data () {
    return {
      errors: [],
      v_: {
        nome: false
      },
      hierarquia: {
        nome: '',
        ativo: true
      }
    }
  },
  // methods: {}
  computed: {

  },
  methods: {
    limparCampos () {
      this.hierarquia.nome = ''
      this.hierarquia.ativo = true
    },
    validar () {
      this.errors = []
      if (this.hierarquia.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
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
      if (this.validar()) {
        Hierarquia.cadastrar(this.hierarquia)
          .then((hierarquia) => {
            if (hierarquia.data.errors) {
              for (let i = 0; i < hierarquia.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: hierarquia.data.errors[i].message,
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
            if (hierarquia.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: hierarquia.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.limparCampos()
            }
          })
          .catch((e) => {
            this.$q.notify({
              color: 'negative',
              message: e,
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
  }
}
</script>

<style>

legend {
  padding: 0.2em 0.5em;
  font-size:90%;
  color: grey;
  text-align:left;
}
</style>
