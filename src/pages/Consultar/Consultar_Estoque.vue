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
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="dados = !dados" flat dense round/>
                      </template>
                    </q-input>

                  </div>

                  <div class="row justify-between col-md-5 ">

                  </div>

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
                      <q-btn dense icon="edit" flat round @click="props.selected = !props.selected"/>
                      <q-btn dense icon="delete" color="red-8" flat round />
                    </q-td>
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="nome_estoque" :props="props">{{ props.row.nome_estoque }}</q-td>
                    <q-td key="quantidade_total" :props="props">{{ props.row.quantidade_total }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo }}</q-td>
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
import Estoque from '../../service/estoque/estoque.js'

export default {
  data () {
    return {
      dados: false,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'nome_estoque', 'quantidade_total', 'ativo'],
      separator: 'horizontal',
      data: [
        { id: '1', nome_estoque: 'Paulo Arhur', quantidade_total: '460.224.398-33', ativo: true },
        { id: '2', nome_estoque: 'Polyana Feitosa', quantidade_total: '779.636.080-09', ativo: true },
        { id: '3', nome_estoque: 'Natalia Pires', quantidade_total: '919.310.680-70', ativo: true }
      ],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'nome_estoque', label: 'Nome estoque', field: 'nome_estoque', align: 'left', sortable: true },
        { name: 'quantidade_total', label: 'Quantidade', field: 'quantidade', align: 'left', sortable: true },
        { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.loadingUser = true
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
              ativo: e.ativo ? 'Sim' : 'Não'
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
        this.loadingUser = false
      })
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
