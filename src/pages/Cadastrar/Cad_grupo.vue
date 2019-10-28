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
                <q-breadcrumbs-el to="/cadastro_grupo_produto"  label="Cadastro de grupos" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center">

                <q-form>
                  <div class="row">
                    <div class="col">
                      <div class="q-gutter-y-md row justify-center col-12">

                        <fieldset class="col-12 no-border">

                          <legend>Dados do grupo de produtos</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do código do produto -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-9' : 'row col-md-9'">
                              <q-input
                                class="col-md-12"
                                dense
                                outlined
                                v-model="grupo.nome"
                                label="Nome do grupo"
                              />
                            </div>

                            <div class="col-md-3">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="grupo.ativo"
                                label="Status do grupo"/>
                            </div>

                            <!-- Campo do Descrição -->
                            <div :class="this.v_.descricao ? 'validar-error row col-md-6' : 'row col-md-6'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                maxlength="150"
                                v-model="grupo.descricao"
                                label="Descrição do grupo"
                              />
                            </div>

                            <div :class="this.v_.fk_categoria_produto ? 'validar-error row col-md-6' : 'row col-md-6'">
                              <q-select
                                class="col-12"
                                label="Categoria do produto"
                                outlined
                                v-model="grupo.fk_categoria_produto"
                                dense
                                options-dense
                                :options="opt_categoria"
                                map-options
                                emit-value
                                option-value="id"
                                option-label="desc"
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
import Grupo from '../../service/grupo_produtos/grupo_produtos.js'

export default {
  mounted () {
    Categoria.buscar()
      .then((categoria) => {
        this.opt_categoria = categoria.data.response.map((h) => {
          return {
            id: h.id_categoria_produto,
            desc: h.nome
          }
        })
      })
  },
  data () {
    return {
      opt_categoria: [],
      errors: [],
      v_: {
        nome: false,
        descricao: false,
        fk_categoria_produto: false
      },
      grupo: {
        nome: '',
        descricao: '',
        ativo: true,
        fk_categoria_produto: ''
      }
    }
  },
  computed: {

  },
  methods: {
    limparCampos () {
      this.grupo.nome = ''
      this.grupo.descricao = ''
      this.grupo.status = true
    },
    cadastrar () {
      if (this.validarCampos()) {
        Grupo.cadastrar(this.grupo)
          .then((grupo) => {
            if (grupo.data.errors) {
              for (let i = 0; i < grupo.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: grupo.data.errors[i].message,
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
            if (grupo.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: grupo.data.response,
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
      if (this.grupo.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome do categoria é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
      }

      // Verificando a descricao
      if (this.grupo.descricao.length === 0) {
        this.errors.push({ msg: 'O campo descricao é obrigátorio', campo: 'descricao', erro: true })
        this.v_.descricao = true
      } else {
        this.v_.descricao = false
      }

      // Verificando a descricao
      if (this.grupo.fk_categoria_produto.length === 0) {
        this.errors.push({ msg: 'Selecione uma categoria', campo: 'categoria', erro: true })
        this.v_.fk_categoria_produto = true
      } else {
        this.v_.fk_categoria_produto = false
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
