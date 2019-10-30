<template>
  <q-page class="q-pa-lg shadow-4">
    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-lg">
          <div class="col-12">
            <q-card class="transparent no-shadow">
              <q-breadcrumbs>
                <template v-slot:separator>
                  <q-icon size="1.2em" name="arrow_forward" color="primary" />
                </template>

                <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/dashboard" />
                <q-breadcrumbs-el
                  icon="fas fa-box"
                  to="/cadastro_movimentacao"
                  label="Cadastro de movimentações"
                />
              </q-breadcrumbs>
            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">
            <q-card class="col-12">
              <q-card-section class="q-col-gutter-sm text-center items-end">
                <q-form>
                  <div class="row">
                    <div class="col">
                      <div class="q-gutter-y-md row justify-center col-12">
                        <fieldset class="col-12 no-border">
                          <legend>Dados da movimentação</legend>

                          <div class="q-col-gutter-sm row">
                            <!-- Campo do código do produto -->
                            <q-input
                              disable
                              class="col-md-1"
                              dense
                              outlined
                              v-model="produto.codProduto"
                              label="ID"
                            />

                            <!-- Campo produto -->
                            <q-select
                              class="col-md-6"
                              outlined
                              dense
                              v-model="nome_produto"
                              use-input
                              input-debounce="0"
                              label="Produto"
                              :options="optProdutos"
                              @filter="filterFn"
                            >
                              <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    Nenhum resultado
                                  </q-item-section>
                                </q-item>
                              </template>
                              <template v-slot:option="scope">
                                <q-item
                                  v-bind="scope.itemProps"
                                  v-on="scope.itemEvents"
                                >
                                  <q-item-section>
                                    <q-item-label v-html="scope.opt.label" />
                                    <q-item-label caption>Código do produto: {{ scope.opt.description ? scope.opt.description : '0' }}</q-item-label>
                                  </q-item-section>
                                </q-item>
                              </template>
                            </q-select>

                            <!-- Campo do tipo de operação-->
                            <q-select
                              outlined
                              v-model="produto.fornecedor"
                              dense
                              :options="tipoOperacaoOpt"
                              map-options
                              emit-value
                              option-value="value"
                              option-label="label"
                              class="col-md-5"
                              label="Tipo de operação"
                            >
                              <template v-slot:option="scope">
                                <q-item
                                  v-bind="scope.itemProps"
                                  v-on="scope.itemEvents"
                                >
                                  <q-item-section>
                                    <q-item-label v-html="scope.opt.label" />
                                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                  </q-item-section>
                                </q-item>
                              </template>
                            </q-select>

                            <!-- Campo do quantidade-->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="produto.operacao"
                              label="Quantidade"
                            />

                            <!-- Campo do valor-->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="produto.preco_unitario"
                              label="Valor unitario"
                            />

                            <div :class="this.v_.validade ? 'validar-error row col-md-3 col-sm-6 col-xs-12' : 'row col-md-3 col-sm-6 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                mask="##-##-####"
                                v-model="produto.validade"
                                label="Data de validade"
                              >
                                <template v-slot:prepend>
                                <!-- <q-icon name="event" /> -->
                                  <q-btn round flat dense icon="event">
                                    <q-menu fit anchor="bottom left" self="top left">

                                      <q-date
                                        v-model="produto.validade"
                                        minimal
                                        mask="DD-MM-YYYY"
                                      />

                                    </q-menu>

                                  </q-btn>
                                </template>
                              </q-input>
                            </div>

                            <div :class="this.v_.data_fabricacao ? 'validar-error row col-md-3 col-sm-6 col-xs-12' : 'row col-md-3 col-sm-6 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                mask="##-##-####"
                                v-model="produto.data_fabricacao"
                                label="Data de fabricação"
                              >
                                <template v-slot:prepend>
                                <!-- <q-icon name="event" /> -->
                                  <q-btn round flat dense icon="event">
                                    <q-menu fit anchor="bottom left" self="top left">

                                      <q-date
                                        v-model="produto.data_fabricacao"
                                        minimal
                                        mask="DD-MM-YYYY"
                                      />

                                    </q-menu>

                                  </q-btn>
                                </template>
                              </q-input>
                            </div>

                            <!-- Campo do tipo de documento-->
                            <q-input
                              class="col-md-4"
                              dense
                              outlined
                              v-model="produto.documento"
                              label="Tipo de Documento"
                            />

                            <!-- Campo do tipo de documento-->
                            <q-input
                              class="col-md-8"
                              dense
                              outlined
                              v-model="produto.documento"
                              label="Documento"
                            />

                            <!-- Campo do Descrição -->
                            <q-input
                              class="col-md-12"
                              dense
                              outlined
                              v-model="produto.descricao"
                              label="Descrição"
                            />
                          </div>
                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Dados do produto</legend>
                          <div class="q-col-gutter-sm row">
                            <!-- Campo Preço -->
                            <div :class="this.v_.saldo ? 'validar-error row col-md-6 col-sm-4 col-xs-12' : 'row col-md-6 col-sm-4 col-xs-12' ">
                              <q-input
                                disable
                                class="col-12"
                                dense
                                outlined
                                label="Valor"
                                v-model="produto.preco_unitario"
                              />
                            </div>

                            <!-- Campo Preço -->
                            <div :class="this.v_.saldo ? 'validar-error row col-md-6 col-sm-4 col-xs-12' : 'row col-md-6 col-sm-4 col-xs-12' ">
                              <q-input
                                disable
                                class="col-12"
                                dense
                                outlined
                                label="Saldo"
                                v-model="produto.saldo"
                              />
                            </div>

                            <!-- Campo Unidade de medida -->
                            <div :class="this.v_.fk_produto_unid_medida ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-select
                                disable
                                outlined
                                v-model="produto.fk_produto_unid_medida"
                                dense
                                :options="unidMeidaOpt"
                                map-options
                                emit-value
                                option-value="value"
                                option-label="label"
                                class="col-12"
                                label="Unidade de medida"
                              >
                                <template v-slot:option="scope">
                                  <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                  >
                                    <q-item-section>
                                      <q-item-label v-html="scope.opt.label" />
                                      <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>

                            <!-- Campo Categoria do produto -->
                            <div :class="this.v_.fk_produto_categoria ? 'validar-error row col-md-4 col-sm-6 col-xs-12' : 'row col-md-4 col-sm-6 col-xs-12' ">
                              <q-select
                                disable
                                class="col-12"
                                label="Categoria do produto"
                                outlined
                                v-model="produto.fk_produto_categoria"
                                dense
                                options-dense
                                :options="categoriaOpt"
                                map-options
                                emit-value
                                option-value="id"
                                option-label="desc"
                              />
                            </div>

                            <!-- Campo grupo do produto -->
                            <div :class="this.v_.fk_produto_grupo ? 'validar-error row col-md-4 col-sm-6 col-xs-12' : 'row col-md-4 col-sm-6 col-xs-12' ">
                              <q-select
                                disable
                                class="col-12"
                                label="Grupo do produto"
                                outlined
                                v-model="produto.fk_produto_grupo"
                                dense
                                options-dense
                                :options="grupoOpt"
                                map-options
                                emit-value
                                option-value="id"
                                option-label="desc"
                              />
                            </div>

                            <!-- Campo Estoque -->
                            <div :class="this.v_.fk_produto_estoque ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-select
                                disable
                                class="col-12"
                                label="Estoque"
                                outlined
                                v-model="produto.fk_produto_estoque"
                                dense
                                options-dense
                                :options="estoqueOpt"
                                option-value="id"
                                option-label="desc"
                                map-options
                                emit-value
                              />
                            </div>

                            <!-- Campo Fornecedor -->
                            <div :class="this.v_.fk_produto_fornecedor ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-select
                                disable
                                class="col-12"
                                label="Fornecedor"
                                outlined
                                v-model="produto.fk_produto_fornecedor"
                                dense
                                options-dense
                                :options="fornecedorOpt"
                                option-value="id"
                                option-label="desc"
                                map-options
                                emit-value
                              />
                            </div>

                          </div>
                        </fieldset>
                        <div class="row col-md-6">
                          {{ movimentacao.dt_movimentacao }}
                          <q-btn
                            label="Salvar"
                            @click="salvar"
                            type="submit"
                            color="primary"
                            class="col-12"
                          />
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
import Produto from '../../service/produto/produto.js'
import Categoria from '../../service/categoria_produtos/categoria_produtos.js'
import Grupo from '../../service/grupo_produtos/grupo_produtos.js'
import UndMedida from '../../service/unidade_medida/unidade_medida.js'
import Estoque from '../../service/estoque/estoque.js'
import Fornecedor from '../../service/fornecedor/fornecedor.js'
import { date } from 'quasar'

export default {
  mounted () {
    Categoria.buscar()
      .then((und) => {
        this.categoriaOpt = und.data.response.map((cat) => {
          return {
            id: cat.id_categoria_produto,
            desc: cat.nome
          }
        })
      })
    UndMedida.buscar()
      .then((und) => {
        this.unidMeidaOpt = und.data.response.map((und) => {
          return {
            value: und.id_unid_medida,
            label: und.nome,
            description: und.descricao
          }
        })
      })
    Estoque.buscarEstoque()
      .then((estoque) => {
        this.estoqueOpt = estoque.data.response.map((e) => {
          return {
            id: e.id_estoque,
            desc: e.nome_estoque
          }
        })
      })
    Fornecedor.buscar()
      .then((fornecedor) => {
        this.fornecedorOpt = fornecedor.data.response.map((f) => {
          return {
            id: f.id_fornecedor,
            desc: f.nome
          }
        })
      })
  },
  data () {
    return {
      fornecedorOpt: [],
      estoqueOpt: [],
      grupoOpt: [],
      categoriaOpt: [],
      nome_produto: null,
      optProdutos: [],
      produto: {
        id_produto: '',
        codigo_produto: '',
        nome_produto: '',
        preco_unitario: 0.00,
        data_fabricacao: '',
        validade: '',
        saldo: 0,
        quantidade_min: 1,
        quantidade_max: 100,
        ativo: true,
        fk_produto_unid_medida: '',
        fk_produto_categoria: '',
        fk_produto_grupo: '',
        fk_produto_fornecedor: '',
        fk_produto_estoque: ''
      },
      v_: {
        id: false,
        codigo_produto: false,
        nome_produto: false,
        preco_unitario: false,
        data_fabricacao: false,
        validade: false,
        saldo: false,
        quantidade_min: false,
        quantidade_max: false,
        ativo: false,
        fk_produto_unid_medida: false,
        fk_produto_categoria: false,
        fk_produto_grupo: false,
        fk_produto_fornecedor: false,
        fk_produto_estoque: false
      },
      tipoOperacaoOpt: [
        { label: 'Entrada', value: 1, description: 'Adicionar produtos ao estoque' },
        { label: 'Saída', value: 2, description: 'Saída de produtos do estoque' },
        { label: 'Ajuste', value: 3, description: 'Ajustar o valor do estoque estoque' }
      ],
      unidMeidaOpt: [
        { label: 'Metro', value: 'm', description: 'metro - m' },
        { label: 'Litro', value: 'l', description: 'Litro - l' },
        { label: 'Quilograma', value: 'kg', description: 'Quilograma - kg' },
        {
          label: 'Metro quadrado',
          value: 'm2',
          description: 'Metro quadrado - m²'
        },
        { label: 'Metro cúbico', value: 'm3', description: 'Metro cúbico - m³' }
      ],
      movimentacao: {
        tipo_operacao: '',
        dt_movimentacao: '',
        quantidade: 0,
        fk_movimentacao_produto: ''
      }
    }
  },
  watch: {
    'produto.id_produto': function (val) {
      let timeStamp = Date.now()
      this.movimentacao.dt_movimentacao = date.formatDate(timeStamp, 'YYYY-MM-DDHH:mm:ss')
      console.log(this.movimentacao.dt_movimentacao)
      this.movimentacao.fk_movimentacao_produto = val
    },
    'produto.fk_produto_categoria': function (val) {
      Grupo.buscarByCategoria(val)
        .then((grupo) => {
          if (grupo.data.status === 404) {
            this.produto.fk_produto_grupo = ''
            this.grupoOpt = []
            this.$q.notify({
              color: 'negative',
              message: grupo.data.response,
              position: 'top-right',
              icon: 'warning',
              timeout: 2000,
              actions: [{
                color: 'white',
                icon: 'close'
              }]
            })
          } else {
            this.grupoOpt = grupo.data.response.map((cat) => {
              return {
                id: cat.id_grupo_produto,
                desc: cat.nome
              }
            })
          }
        })
    },
    'nome_produto': function (val) {
      Produto.buscarUmProduto(val.value)
        .then((produtos) => {
          this.produto = produtos.data.response[0]
        })
    }
  },
  methods: {
    salvar () {
      Produto.salvar(this.produto).then(resposta => {
        alert('Dados salvos com sucesso!')
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          Produto.buscarProduto()
            .then((produtos) => {
              this.optProdutos = produtos.data.response.map((produto) => {
                return {
                  value: produto.id_produto,
                  description: produto.codigo_produto,
                  label: produto.nome_produto
                }
              })
            })
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        Produto.buscarProduto()
          .then((produtos) => {
            let filter = produtos.data.response.filter((v) => v.nome_produto.toLowerCase().indexOf(needle) > -1)
            this.optProdutos = filter.map((produto) => {
              return {
                value: produto.id_produto,
                description: produto.codigo_produto,
                label: produto.nome_produto
              }
            })
          })
      })
    }
  }
}
</script>

<style>
legend {
  padding: 0.2em 0.5em;
  font-size: 90%;
  color: grey;
  text-align: left;
}
</style>
