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
                <q-breadcrumbs-el icon="fas fa-box" to="/cadastro_produtos"  label="Cadastro de produto" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_produtos"  label="Consultar produto" />

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
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="buscarProdutos" flat dense round/>
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
                    <q-td key="codigo_produto" :props="props">{{ props.row.codigo_produto }}</q-td>
                    <q-td key="nome_produto" :props="props">{{ props.row.nome_produto }}</q-td>
                    <q-td key="preco_unitario" :props="props">{{ props.row.preco_unitario }}</q-td>
                    <q-td key="data_fabricacao" :props="props">{{ props.row.data_fabricacao }}</q-td>
                    <q-td key="validacao" :props="props">{{ props.row.validacao }}</q-td>
                    <q-td key="saldo" :props="props">{{ props.row.saldo }}</q-td>
                    <q-td key="quantidade_min" :props="props">{{ props.row.quantidade_min }}</q-td>
                    <q-td key="quantidade_max" :props="props">{{ props.row.quantidade_max }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo ? 'Ativo' : 'Inativo' }}</q-td>
                    <q-td key="unidade_medida" :props="props">{{ props.row.unidade_medida }}</q-td>
                    <q-td key="categoria" :props="props">{{ props.row.categoria }}</q-td>
                    <q-td key="grupo" :props="props">{{ props.row.grupo }}</q-td>
                    <q-td key="fornecedor" :props="props">{{ props.row.fornecedor }}</q-td>
                    <q-td key="estoque" :props="props">{{ props.row.estoque }}</q-td>
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
import Produto from '../../service/produto/produto.js'

export default {
  data () {
    return {
      loading: false,
      dados: false,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'codigo_produto', 'nome_produto', 'preco_unitario', 'saldo', 'quantidade_min', 'quantidade_max', 'ativo'],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'codigo_produto', label: 'Cod. Produto', field: 'codigo_produto', align: 'left', sortable: true },
        { name: 'nome_produto', label: 'Produto', field: 'nome_produto', align: 'left', sortable: true },
        { name: 'preco_unitario', label: 'Preço unit.', field: 'preco_unitario', align: 'left', sortable: true },
        { name: 'data_fabricacao', label: 'Fabricação', field: 'data_fabricacao', align: 'left', sortable: true },
        { name: 'validade', label: 'Validade', field: 'validade', align: 'left', sortable: true },
        { name: 'saldo', label: 'Saldo', field: 'saldo', align: 'left', sortable: true },
        { name: 'quantidade_min', label: 'Quantidade min.', field: 'quantidade_min', align: 'left', sortable: true },
        { name: 'quantidade_max', label: 'Quantidade max.', field: 'quantidade_max', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true },
        { name: 'unidade_medida', label: 'Unidade medida', field: 'unidade_medida', align: 'left', sortable: true },
        { name: 'categoria', label: 'Categoria', field: 'categoria', align: 'left', sortable: true },
        { name: 'grupo', label: 'Grupo', field: 'grupo', align: 'left', sortable: true },
        { name: 'fornecedor', label: 'Fornecedor', field: 'fornecedor', align: 'left', sortable: true },
        { name: 'estoque', label: 'Estoque', field: 'estoque', align: 'left', sortable: true }
      ]
    }
  },
  computed: {

  },
  mounted () {
    this.buscarProdutos()
  },
  methods: {
    buscarProdutos () {
      this.loading = true
      Produto.buscarProduto()
        .then((produto) => {
          if (produto.data.errors) {
            for (let i = 0; i < produto.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: produto.data.errors[i].message,
                position: 'top-right',
                icon: 'warning',
                timeout: 1500,
                actions: [{
                  color: 'white',
                  icon: 'close'
                }]
              })
            }
          }
          if (produto.data.status === 200) {
            this.dados = true
            this.data = produto.data.response.map((p) => {
              return {
                id: p.id_usuario,
                codigo_produto: p.codigo_produto,
                nome_produto: p.nome_produto,
                preco_unitario: p.preco_unitario,
                data_fabricacao: p.data_fabricacao,
                validade: p.validade,
                saldo: p.saldo,
                quantidade_min: p.quantidade_min,
                quantidade_max: p.quantidade_max,
                ativo: p.ativo,
                unidade_medida: p.unidade_medida.nome,
                categoria: p.categoria.nome,
                grupo: p.grupo.nome,
                fornecedor: p.fornecedor.nome,
                estoque: p.estoque.nome_estoque
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
            timeout: 1500,
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
            timeout: 1500,
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
