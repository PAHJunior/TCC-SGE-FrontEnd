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
                <q-breadcrumbs-el to="/cadastrar_tipo_documento"  label="Cadastrar tipo de documento" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_tipo_documento"  label="Consultar tipo do documento" />

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
                    <q-td key="tipo_documento" :props="props">{{ props.row.tipo_documento }}</q-td>
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

                    <legend>Tipo de documento</legend>

                    <div class="q-col-gutter-sm row items-start">

                      <!-- Campo do código do produto -->
                      <div class="row col-md-2 col-xs-12 col-sm-3">
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
                      <div :class="this.v_.tipo_documento ? 'validar-error row col-md-8 col-xs-12 col-sm-9' : 'row col-md-8 col-xs-12 col-sm-9'">
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
      },
      modalEdit: false,
      dados: false,
      loading: true,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'tipo_documento', 'ativo'],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'tipo_documento', label: 'Tipo documento', field: 'tipo_documento', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.buscar()
  },
  methods: {
    validarCampos () {
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
    buscar () {
      this.loading = true
      TipoDoc.Buscar()
        .then((tipoDoc) => {
          if (tipoDoc.data.errors) {
            for (let i = 0; i < tipoDoc.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: tipoDoc.data.errors[i].message,
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
          if (tipoDoc.data.status === 200) {
            this.dados = true
            this.data = tipoDoc.data.response.map((u) => {
              return {
                id: u.id_tipo_documento,
                tipo_documento: u.tipo_documento,
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
    openModalEdit (props) {
      this.falseValidade()
      this.modalEdit = !this.modalEdit
      this.buscarUm(props.row.id)
    },
    buscarUm (id) {
      TipoDoc.buscarUm(id)
        .then((tipoDoc) => {
          this.tipoDoc = tipoDoc.data.response[0]
          this.tipoDoc.id = tipoDoc.data.response[0].id_tipo_documento
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
    alterar () {
      if (this.validarCampos()) {
        TipoDoc.modificar(this.tipoDoc.id_tipo_documento, this.tipoDoc)
          .then((tipoDoc) => {
            if (tipoDoc.data.errors) {
              for (let i = 0; i < tipoDoc.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: tipoDoc.data.errors[i].message,
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
            if (tipoDoc.data.status === 200) {
              this.$q.notify({
                color: 'positive',
                message: tipoDoc.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.modalEdit = false
              this.buscar()
            }
            if (tipoDoc.data.status === 204) {
              this.$q.notify({
                color: 'warning',
                message: tipoDoc.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.modalEdit = false
              this.buscar()
            }
          })
          .catch((e) => {
            console.error(e)
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
    falseValidade () {
      this.v_.tipo_documento = false
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
