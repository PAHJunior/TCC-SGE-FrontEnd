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
                <q-breadcrumbs-el icon="fas fa-truck" to="/cadastro_fornecedor"  label="Cadastro do fornecedor" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_fornecedor"  label="Consultar fornecedor" />

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
                      <q-btn dense icon="edit" flat round @click="props.selected = !props.selected"/>
                    </q-td>
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                    <q-td key="representante" :props="props">{{ props.row.representante }}</q-td>
                    <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                    <q-td key="telefone" :props="props">{{ props.row.telefone }}</q-td>
                    <q-td key="celular" :props="props">{{ props.row.celular }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo }}</q-td>
                    <q-td key="cep" :props="props">{{ props.row.cep }}</q-td>
                    <q-td key="logradouro" :props="props">{{ props.row.logradouro }}</q-td>
                    <q-td key="numero" :props="props">{{ props.row.numero }}</q-td>
                    <q-td key="bairro" :props="props">{{ props.row.bairro }}</q-td>
                    <q-td key="cidade" :props="props">{{ props.row.cidade }}</q-td>
                    <q-td key="uf" :props="props">{{ props.row.uf }}</q-td>
                    <q-td key="complemento" :props="props">{{ props.row.complemento }}</q-td>
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
import Fornecedor from '../../service/fornecedor/fornecedor.js'
export default {
  data () {
    return {
      loading: false,
      dados: false,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'nome', 'representante', 'email', 'telefone', 'celular', 'ativo'],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'nome', label: 'Nome Fornecedor', field: 'nome', align: 'left', sortable: true },
        { name: 'representante', label: 'Nome Representante', field: 'representante', align: 'left', sortable: true },
        { name: 'email', label: 'E-mail', field: 'email', align: 'left', sortable: true },
        { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left', sortable: true },
        { name: 'celular', label: 'Celular', field: 'celular', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true },
        { name: 'cep', label: 'CEP', field: 'cep', align: 'left', sortable: true },
        { name: 'logradouro', label: 'Logradouro', field: 'logradouro', align: 'left', sortable: true },
        { name: 'numero', label: 'Numero', field: 'numero', align: 'left', sortable: true },
        { name: 'bairro', label: 'Bairro', field: 'bairro', align: 'left', sortable: true },
        { name: 'cidade', label: 'Cidade', field: 'cidade', align: 'left', sortable: true },
        { name: 'uf', label: 'UF', field: 'uf', align: 'left', sortable: true },
        { name: 'complemento', label: 'Complemento', field: 'complemento', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.buscarFornecedor()
  },
  methods: {
    buscarFornecedor () {
      this.loading = true
      Fornecedor.buscar()
        .then((fornecedor) => {
          if (fornecedor.data.errors) {
            for (let i = 0; i < fornecedor.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: fornecedor.data.errors[i].message,
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
          if (fornecedor.data.status === 200) {
            this.dados = true
            this.data = fornecedor.data.response.map((f) => {
              return {
                id: f.id_fornecedor,
                nome: f.nome,
                representante: f.representante.nome,
                email: f.representante.email,
                telefone: f.representante.telefone,
                celular: f.representante.celular,
                ativo: f.ativo ? 'Ativo' : 'Inativo',
                cep: f.endereco.cep,
                logradouro: f.endereco.logradouro,
                numero: f.endereco.numero,
                bairro: f.endereco.bairro,
                cidade: f.endereco.cidade,
                uf: f.endereco.uf,
                complemento: f.endereco.complemento
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
