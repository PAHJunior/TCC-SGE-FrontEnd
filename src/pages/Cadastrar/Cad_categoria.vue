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
                <q-breadcrumbs-el to="/cadastro_categoria"  label="Cadastro de categorias" />

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

                          <legend>Dados para categoria</legend>

                          <div class="q-col-gutter-sm row">

                            <div class="row col-md-1 col-sm-1 col-xs-1">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                disable
                                v-model="categoria.id"
                                label="ID"
                              />
                            </div>

                            <!-- Campo do código do produto -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-8 col-sm-8 col-xs-12' : 'row col-md-8 col-sm-8 col-xs-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="categoria.nome"
                                label="Nome da categoria"
                              />
                            </div>

                            <div class="col-md-3 col-sm-3 col-xs-12">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="categoria.ativo"
                                label="Status de categoria"/>
                            </div>

                            <!-- Campo do Descrição -->
                            <div :class="this.v_.descricao ? 'validar-error row col-12' : 'row col-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                autogrow
                                counter
                                maxlength="150"
                                v-model="categoria.descricao"
                                label="Descrição da categoria"
                              />
                            </div>

                          </div>

                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" type="submit" @click="cadastrar" color="primary" class="col-12"/>
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

import Categoria from '../../service/categoria_produtos/categoria_produtos.js'

export default {
  data () {
    return {
      errors: [],
      v_: {
        nome: false,
        descricao: false
      },
      categoria: {
        nome: '',
        descricao: '',
        ativo: true
      }
    }
  },
  computed: {

  },
  methods: {
    limparCampos () {
      this.categoria.nome = ''
      this.categoria.descricao = ''
      this.categoria.status = true
    },
    cadastrar () {
      if (this.validarCampos()) {
        this.categoria['loglogin'] = this.usuarioLocal.login
        Categoria.cadastrar(this.categoria)
          .then((categoria) => {
            if (categoria.data.errors) {
              for (let i = 0; i < categoria.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: categoria.data.errors[i].message,
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
            if (categoria.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: categoria.data.response,
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
      // Verificando o nome
      if (this.categoria.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome do categoria é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
      }

      // Verificando a descricao
      if (this.categoria.descricao.length === 0) {
        this.errors.push({ msg: 'O campo descricao é obrigátorio', campo: 'descricao', erro: true })
        this.v_.descricao = true
      } else {
        this.v_.descricao = false
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
  },
  mounted () {
    this.usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
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
