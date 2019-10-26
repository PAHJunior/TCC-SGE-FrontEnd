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
                <q-breadcrumbs-el icon="fas fa-boxes" to="/cadastro_estoque"  label="Cadastro de estoque" />

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

                          <legend>Dados do estoque</legend>

                          <div class="q-col-gutter-sm row items-start">

                            <div class="row col-1">
                              <q-input
                                class="col-md-12 col-xs-12 "
                                dense
                                outlined
                                v-model="estoque.id"
                                label="ID"
                                disable
                              />
                            </div>

                            <div :class="this.v_.nome_estoque ? 'validar-error row col-9' : 'row col-9'">
                              <q-input
                                class="col-md-12 col-xs-12 "
                                dense
                                outlined
                                v-model="estoque.nome_estoque"
                                label="Nome do estoque"
                                counter
                                maxlength="20"
                              />
                            </div>

                            <div class="col-md-2">
                              <q-checkbox class="float-right" left-label v-model="estoque.ativo" label="Status do estoque" />
                            </div>

                            <!-- Campo do quantidade_total -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="estoque.valor_estoque"
                              label="Quantidade Total"
                              disable
                            />

                            <!-- Campo data de nascimento -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="estoque.quantidade_total"
                              label="Valor Estoque"
                              disable
                            />

                          </div>
                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" @click="cadastrarEstoque" type="submit" color="primary" class="col-12"/>
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

import Estoque from '../../service/estoque/estoque.js'

export default {
  data () {
    return {
      errors: [],
      v_: {
        nome_estoque: false,
        valor_estoque: false,
        quantidade_total: false,
        ativo: false
      },
      estoque: {
        id: '',
        nome_estoque: '',
        valor_estoque: '0',
        quantidade_total: '0',
        fk_estoque_empresa: 1,
        ativo: true
      }
    }
  },
  computed: {

  },
  methods: {
    limparCampos () {
      this.estoque.nome_estoque = ''
      this.estoque.valor_estoque = 0
      this.estoque.quantidade_total = 0
      this.estoque.ativo = true
    },
    cadastrarEstoque () {
      if (this.validarCampos()) {
        Estoque.cadEstoque(this.estoque)
          .then((estoque) => {
            if (estoque.data.errors) {
              for (let i = 0; i < estoque.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: estoque.data.errors[i].message,
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
            if (estoque.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: estoque.data.response,
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
    },
    validarCampos () {
      this.errors = []
      // Verificando o nome_estoque
      if (this.estoque.nome_estoque.length === 0) {
        this.errors.push({ msg: 'O campo nome do estoque é obrigátorio', campo: 'nome_estoque', erro: true })
        this.v_.nome_estoque = true
      } else {
        this.v_.nome_estoque = false
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
