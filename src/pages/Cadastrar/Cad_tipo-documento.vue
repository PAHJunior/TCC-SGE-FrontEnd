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
                <q-breadcrumbs-el to="/cadastro_unidade-medida"  label="Cadastro de unidade de medida" />

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

                          <legend>Tipo de documento</legend>

                          <div class="q-col-gutter-sm row items-start">

                            <!-- Campo do código do produto -->
                            <div class="row col-md-1 col-xs-12 col-sm-3">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                disable
                                v-model="tipoDoc.id"
                                label="ID"
                              />
                            </div>

                            <!-- Campo do código do produto -->
                            <div :class="this.v_.tipo_documento ? 'validar-error row col-md-9 col-xs-12 col-sm-9' : 'row col-md-9 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="tipoDoc.tipo_documento"
                                label="nome do tipo de documento"
                              />
                            </div>

                            <div class="col-md-2 col-xs-12 col-sm-12">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="tipoDoc.ativo"
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
import TipoDoc from '../../service/tipo_documento/tipo_documento.js'

export default {
  data () {
    return {
      errors: [],
      v_: {
        tipo_documento: false
      },
      tipoDoc: {
        id: '',
        tipo_documento: '',
        ativo: true
      }
    }
  },
  methods: {
    validar () {
      this.errors = []
      if (this.tipoDoc.tipo_documento.length === 0) {
        this.errors.push({ msg: 'O campo tipo do documento é obrigátorio', campo: 'nome', erro: true })
        this.v_.tipo_documento = true
      } else {
        this.v_.tipo_documento = false
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
      this.tipoDoc.tipo_documento = ''
      this.tipoDoc.ativo = true
    },
    Cadastrar () {
      if (this.validar()) {
        TipoDoc.Cadastrar(this.tipoDoc)
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
