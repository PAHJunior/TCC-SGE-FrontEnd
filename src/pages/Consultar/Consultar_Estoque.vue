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
                <q-breadcrumbs-el icon="fas fa-boxes" to="/cadastro_estoque"  label="Cadastro de estoque" />
                <q-breadcrumbs-el icon="fas fa-search" to="/cadastro_estoque"  label="Consultar estoque" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 q-gutter-y-md row">

            <!-- Cabeçalho -->
            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">
                <div class="row col-12 justify-center q-gutter-x-xs">

                  <div class="col-md-3">

                    <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                      <template v-slot:prepend>
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="buscar" flat dense round/>
                      </template>
                    </q-input>

                  </div>

                  <q-space />

                  <div class="col-md-3">

                    <q-select
                      v-model="visibleColumns"
                      multiple
                      outlined
                      dense
                      options-dense
                      display-value="Colunas"
                      emit-value
                      map-options
                      :options="columns"
                      option-value="name"
                      style="min-width: 200px; "
                    >
                      <template v-slot:option="scope">
                        <q-item
                          v-show="!scope.opt.required"
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                        >
                          <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                          </q-item-section>

                          <q-item-section avatar>
                            <q-toggle
                              disable
                              v-model="scope.itemProps.active"
                              color="primary"
                            />
                          </q-item-section>
                        </q-item>

                      </template>

                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <div class="col-12">

              <q-table
                :loading="loading"
                :filter="filter"
                :data="dados ? data : na"
                :columns="columns"
                :visible-columns="visibleColumns"
                :separator="separator"
                selection="single"
                :selected.sync="selected"
                row-key="id">

                <!-- Corpo da tabela -->
                <template v-slot:body="props">
                  <q-tr :props="props" >
                    <q-td auto-width>
                      <q-btn dense icon="edit" flat round @click="openModalEdit(props)"/>
                    </q-td>
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="nome_estoque" :props="props">{{ props.row.nome_estoque }}</q-td>
                    <q-td key="quantidade_total" :props="props">{{ props.row.quantidade_total }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo ? 'Sim' : 'Não' }}</q-td>
                  </q-tr>
                </template>

              </q-table>
            </div>

          </div>

        </div>
      </div>
    </div>
    <q-dialog v-model="modalEdit">
      <q-card class="col-12 ">
        <q-card-section class=" q-col-gutter-sm text-center items-end">
          <q-form>
            <div class="row">
              <div class="col">
                <div class="q-gutter-y-md row justify-center col-12">
                  <fieldset class="col-12 no-border">
                    <legend>Dados do estoque</legend>

                    <div class="q-col-gutter-sm row items-start">

                      <div class="row col-md-1 col-sm-1 col-xs-1">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          disable
                          v-model="estoque.id"
                          label="ID"
                        />
                      </div>

                      <div :class="this.v_.nome_estoque ? 'validar-error row col-md-11 col-sm-11 col-xs-11' : 'row col-md-11 col-sm-11 col-xs-11'">
                        <q-input
                          class="col-12 "
                          dense
                          outlined
                          v-model="estoque.nome_estoque"
                          label="Nome do estoque"
                          counter
                          maxlength="20"
                        />
                      </div>

                      <div class="col-md-12">
                        <q-checkbox class="float-right" left-label v-model="estoque.ativo" label="Status do estoque" />
                      </div>

                    </div>
                  </fieldset>

                  <div class="row col-md-6 col-sm-6 col-xs-6">
                    <q-btn label="Cadastrar" @click="alterarEstoque" type="submit" color="primary" class="col-12"/>
                  </div>

                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Estoque from '../../service/estoque/estoque.js'

export default {
  data () {
    return {
      filtro: {
        ativo: false
      },
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
      },
      modalEdit: false,
      loading: false,
      dados: false,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'nome_estoque', 'quantidade_total', 'ativo'],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'nome_estoque', label: 'Nome estoque', field: 'nome_estoque', align: 'left', sortable: true },
        { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.buscar()
  },
  methods: {
    buscar () {
      this.loading = true
      Estoque.buscarEstoque()
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
          if (estoque.data.status === 200) {
            this.dados = true
            this.data = estoque.data.response.map((e) => {
              return {
                id: e.id_estoque,
                nome_estoque: e.nome_estoque,
                quantidade_total: e.quantidade_total,
                ativo: e.ativo
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
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
          this.$q.notify({
            color: 'negative',
            message: `${error}`,
            position: 'top-right',
            icon: 'warning',
            timeout: 2000,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    buscarUm (id) {
      Estoque.buscarUmEstoque(id)
        .then((estoque) => {
          this.estoque = estoque.data.response[0]
          this.estoque.id = estoque.data.response[0].id_estoque
        })
        .catch((e) => {
          this.$q.notify({
            color: 'negative',
            message: 'Erro buscar o usuario, porfavor tente novamente.',
            position: 'top-right',
            icon: 'warning',
            timeout: 1500,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
        })
    },
    openModalEdit (props) {
      this.modalEdit = !this.modalEdit
      this.buscarUm(props.row.id)
    },
    alterarEstoque () {
      if (this.validarCampos()) {
        Estoque.modificar(this.estoque.id, this.estoque)
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
            if (estoque.data.status === 200) {
              this.$q.notify({
                color: 'positive',
                message: estoque.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.modalEdit = false
              this.buscar()
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
  },
  computed: {

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
