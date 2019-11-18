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
                <q-breadcrumbs-el to="/cadastro_unid_medida"  label="Cadastrar unidade de medida" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_unid_medida"  label="Consultar unidade de medida" />

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
                    <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                    <q-td key="descricao" :props="props">{{ props.row.descricao }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo }}</q-td>
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

                    <legend>Dados para categoria</legend>

                    <div class="q-col-gutter-sm row items-start">

                      <!-- Campo do código do produto -->
                      <div class="row col-md-1 col-xs-2 col-sm-1">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          disable
                          v-model="unidMedida.id"
                          label="ID"
                        />
                      </div>

                      <!-- Campo do código do produto -->
                      <div :class="this.v_.nome ? 'validar-error row col-md-9 col-xs-10 col-sm-8' : 'row col-md-9 col-xs-10 col-sm-8'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="unidMedida.nome"
                          label="Nome unidade de medida"
                        />
                      </div>

                      <div class="col-md-2 col-xs-12 col-sm-3">
                        <q-checkbox
                          class="float-right"
                          left-label
                          v-model="unidMedida.ativo"
                          label="Status"/>
                      </div>

                      <!-- Campo do Descrição -->
                      <div :class="this.v_.descricao ? 'validar-error row col-12' : 'row col-12'">
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

                    </div>

                  </fieldset>

                  <div class="row col-md-6 col-sm-6 col-xs-6">
                    <q-btn label="Alterar" @click="alterar" type="submit" color="primary" class="col-12"/>
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
import UndMedida from '../../service/unidade_medida/unidade_medida.js'

export default {
  data () {
    return {
      v_: {
        nome: false,
        descricao: false
      },
      unidMedida: {
        id: '',
        nome: '',
        descricao: '',
        ativo: true
      },
      modalEdit: false,
      dados: false,
      loading: true,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'nome', 'descricao', 'ativo'],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.buscarTodos()
  },
  methods: {
    validarCampos () {
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
    openModalEdit (props) {
      this.modalEdit = !this.modalEdit
      this.buscarUm(props.row.id)
    },
    buscarTodos () {
      this.loading = true
      UndMedida.buscar()
        .then((undMedida) => {
          if (undMedida.data.errors) {
            for (let i = 0; i < undMedida.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: undMedida.data.errors[i].message,
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
          if (undMedida.data.status === 200) {
            this.dados = true
            this.data = undMedida.data.response.map((u) => {
              return {
                id: u.id_unid_medida,
                nome: u.nome,
                descricao: u.descricao,
                ativo: u.ativo ? 'Ativo' : 'Inativo'
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
      this.loading = true
      UndMedida.buscarUm(id)
        .then((und) => {
          this.unidMedida = und.data.response[0]
          this.unidMedida.id = und.data.response[0].id_unid_medida
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
    alterar () {
      if (this.validarCampos()) {
        UndMedida.modificar(this.unidMedida.id, this.unidMedida)
          .then((und) => {
            if (und.data.errors) {
              for (let i = 0; i < und.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: und.data.errors[i].message,
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
            if (und.data.status === 200) {
              this.$q.notify({
                color: 'positive',
                message: und.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.modalEdit = false
              this.buscarTodos()
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
