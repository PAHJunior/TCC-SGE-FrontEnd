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
                <q-breadcrumbs-el to="/logs" label="Log do Sistema" />

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
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="buscarTodos" flat dense round/>
                      </template>
                    </q-input>

                  </div>

                  <q-space />

                  <div class="col-2">
                    <q-select
                      outlined
                      dense
                      options-dense
                      label="Limite de linhas"
                      v-model="limite"
                      :options="limiteOpt"
                    />
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
                row-key="id">

                <!-- Corpo da tabela -->
                <template v-slot:body="props">
                  <q-tr :props="props" >
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="usuario" :props="props">{{ props.row.usuario }}</q-td>
                    <q-td key="acao" :props="props">{{ props.row.acao }}</q-td>
                    <q-td key="tabela" :props="props">{{ props.row.tabela }}</q-td>
                    <q-td key="descricao" :props="props">{{ props.row.descricao }}</q-td>
                    <q-td key="dtcriacao" :props="props">{{ props.row.dtcriacao }}</q-td>
                  </q-tr>
                </template>

              </q-table>
            </div>

          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Log from '../service/log/log.js'

export default {
  data () {
    const options = []
    for (let i = 1; i <= 100; i++) {
      options.push(i * 4)
    }
    return {
      limite: 10,
      limiteOpt: Object.freeze(options),
      loading: false,
      dados: false,
      filter: '',
      visibleColumns: ['usuario', 'acao', 'tabela', 'descricao', 'dtcriacao'],
      separator: 'horizontal',
      data: [],
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'usuario', label: 'Usuario', field: 'usuario', align: 'left', sortable: true },
        { name: 'acao', label: 'Ação', field: 'acao', align: 'left', sortable: true },
        { name: 'tabela', label: 'Tabela', field: 'tabela', align: 'left', sortable: true },
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left', sortable: true },
        { name: 'dtcriacao', label: 'Data', field: 'dtcriacao', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.buscarTodos()
  },
  watch: {
    limite: function () {
      this.buscarTodos()
    }
  },
  methods: {
    buscarTodos () {
      this.loading = true
      Log.buscar(this.limite)
        .then((log) => {
          if (log.data.errors) {
            for (let i = 0; i < log.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: log.data.errors[i].message,
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
          if (log.data.status === 200) {
            this.dados = true
            this.data = log.data.response.map((log) => {
              return {
                id: log._id,
                usuario: log.usuario,
                acao: log.acao,
                tabela: log.tabela,
                descricao: log.descricao,
                dtcriacao: log.dtcriacao
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
