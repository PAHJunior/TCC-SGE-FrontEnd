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
                <q-breadcrumbs-el to="/cadastro_unidade-medida"  label="Cadastro de unidade de medida" />

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
                      <div class="q-gutter-y-md row justify-center col-12">

                        <fieldset class="col-12 no-border">

                          <legend>Dados para categoria</legend>

                          <div class="q-col-gutter-sm row items-start">

                            <!-- Campo do código do produto -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-5' : 'row col-md-5'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="unidMedida.nome"
                                label="Nome unidade de medida"
                              />
                            </div>

                            <!-- Campo do Descrição -->
                            <div :class="this.v_.descricao ? 'validar-error row col-md-5' : 'row col-md-5'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                autogrow
                                counter
                                maxlength="20"
                                v-model="unidMedida.descricao"
                                label="Descrição da unidade de medida"
                              />
                            </div>

                            <div class="col-md-2">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="unidMedida.ativo"
                                label="Status"/>
                            </div>

                          </div>

                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" type="submit" @click="Cadastrar" color="primary" class="col-12"/>
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
import UndMedida from '../../service/unidade_medida/unidade_medida.js'

export default {
  data () {
    return {
      errors: [],
      v_: {
        nome: false,
        descricao: false
      },
      unidMedida: {
        nome: '',
        descricao: '',
        ativo: true
      }
    }
  },
  methods: {
    validar () {
      this.errors = []
      if (this.unidMedida.nome.length === 0) {
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
    limparCampos () {
      this.unidMedida.nome = ''
      this.unidMedida.descricao = ''
      this.unidMedida.ativo = true
    },
    Cadastrar () {
      if (this.validar()) {
        UndMedida.cadastrar(this.unidMedida)
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
