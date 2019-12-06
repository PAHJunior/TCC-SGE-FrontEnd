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
                  icon="fas fa-dolly"
                  to="/cadastro_movimentacao"
                  label="Cadastrar movimentação"
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
                            <div :class="this.v_.nome_produto ? 'validar-error row col-md-8 col-sm-3 col-xs-12' : 'row col-md-8 col-sm-3 col-xs-12' ">
                              <q-select
                                hide-dropdown-icon
                                class="col-12"
                                outlined
                                dense
                                v-model="nome_produto"
                                use-input
                                input-debounce="0"
                                label="Produto"
                                :options="optProdutos"
                                @filter="filterFn"
                              >
                                <template v-slot:append>
                                  <q-icon v-if="nome_produto.length == 0" name="search" />
                                  <q-icon v-else name="clear" class="cursor-pointer" @click="nome_produto = ''" />
                                </template>
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
                            </div>

                            <!-- Campo do tipo de operação-->
                            <div :class="this.v_.tipo_operacao ? 'validar-error row col-md-3 col-sm-3 col-xs-12' : 'row col-md-3 col-sm-3 col-xs-12' ">
                              <q-select
                                outlined
                                v-model="movimentacao.tipo_operacao"
                                dense
                                :options="tipoOperacaoOpt"
                                map-options
                                emit-value
                                option-value="value"
                                option-label="label"
                                class="col-12"
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
                            </div>

                            <!-- Campo do quantidade-->
                            <div :class="this.v_.quantidade ? 'validar-error row col-md-3 col-sm-3 col-xs-12' : 'row col-md-3 col-sm-3 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                reverse-fill-mask
                                fill-mask="0"
                                maxlength="10"
                                mask="#"
                                v-model="movimentacao.quantidade"
                                label="Quantidade"
                              />
                            </div>

                            <!-- Campo do valor-->
                            <div :class="this.v_.preco_unitario ? 'validar-error row col-md-3 col-sm-3 col-xs-12' : 'row col-md-3 col-sm-3 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                reverse-fill-mask
                                input-class="text-right"
                                fill-mask="0"
                                maxlength="17"
                                mask="#.##"
                                v-model="movimentacao.preco_unitario"
                                label="Valor"
                              />
                            </div>

                            <div class="row col-6">
                              <div class="col">
                                <div class="row col-12 q-col-gutter-sm">
                                    <!-- Data de valdiade  -->
                                  <div v-if="produto.controlaLote" :class="this.v_.validade ? 'validar-error row col-md-6 col-sm-6 col-xs-12' : 'row col-md-6 col-sm-6 col-xs-12' ">
                                    <q-input
                                      class="col-12"
                                      dense
                                      outlined
                                      mask="##-##-####"
                                      v-model="movimentacao.dt_validade"
                                      label="Data de validade"
                                    >
                                      <template v-slot:prepend>
                                      <!-- <q-icon name="event" /> -->
                                        <q-btn round flat dense icon="event">
                                          <q-menu fit anchor="bottom left" self="top left">

                                            <q-date
                                              v-model="movimentacao.dt_validade"
                                              minimal
                                              mask="DD-MM-YYYY"
                                            />

                                          </q-menu>

                                        </q-btn>
                                      </template>
                                    </q-input>
                                  </div>

                                  <!-- Data de fabricação -->
                                  <div v-if="produto.controlaLote" :class="this.v_.data_fabricacao ? 'validar-error row col-md-6 col-sm-6 col-xs-12' : 'row col-md-6 col-sm-6 col-xs-12' ">
                                    <q-input
                                      class="col-12"
                                      dense
                                      outlined
                                      mask="##-##-####"
                                      v-model="movimentacao.dt_fabricacao"
                                      label="Data de fabricação"
                                    >
                                      <template v-slot:prepend>
                                      <!-- <q-icon name="event" /> -->
                                        <q-btn round flat dense icon="event">
                                          <q-menu fit anchor="bottom left" self="top left">

                                            <q-date
                                              v-model="movimentacao.dt_fabricacao"
                                              minimal
                                              mask="DD-MM-YYYY"
                                            />

                                          </q-menu>
                                        </q-btn>
                                      </template>
                                    </q-input>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Campo do tipo de documento-->
                            <div :class="this.v_.fk_tipo_documento ? 'validar-error row col-md-4 col-sm-6 col-xs-12' : 'row col-md-4 col-sm-6 col-xs-12' ">
                              <q-select
                                class="col-12"
                                dense
                                options-dense
                                :options="optTipoDocumento"
                                option-value="id"
                                option-label="desc"
                                map-options
                                emit-value
                                outlined
                                v-model="movimentacao.fk_tipo_documento"
                                label="Tipo de Documento"
                              />
                            </div>

                            <!-- Campo do documento-->
                            <div :class="this.v_.documento ? 'validar-error row col-md-8 col-sm-3 col-xs-12' : 'row col-md-8 col-sm-3 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="movimentacao.documento"
                                label="Documento"
                              />
                            </div>

                            <!-- Campo do Descrição -->
                            <q-input
                              class="col-md-9"
                              dense
                              outlined
                              v-model="movimentacao.descricao"
                              label="Descrição"
                            />

                            <div class="col-md-3 col-sm-8 col-xs-12">
                              <q-checkbox class="float-right" left-label v-model="movimentacao.ajuste" label="Ajustar estoque" />
                            </div>
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
import TipoDoc from '../../service/tipo_documento/tipo_documento.js'
import Mov from '../../service/movimentacao/movimentacao.js'
// import Mov from '../../service/movimentacao/movimentacao.js'
import { date } from 'quasar'

export default {
  mounted () {
    TipoDoc.Buscar()
      .then((tipoDoc) => {
        this.optTipoDocumento = tipoDoc.data.response.map((tipo) => {
          return {
            id: tipo.id_tipo_documento,
            desc: tipo.tipo_documento
          }
        })
      })
    Categoria.buscar()
      .then((categoria) => {
        this.categoriaOpt = categoria.data.response.map((cat) => {
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
    this.usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
  },
  data () {
    return {
      errors: [],
      optTipoDocumento: [],
      fornecedorOpt: [],
      estoqueOpt: [],
      grupoOpt: [],
      categoriaOpt: [],
      nome_produto: '',
      optProdutos: [],
      produto: {
        id: '',
        codigo_produto: '',
        nome_produto: '',
        preco_unitario: 0.00,
        fabricacao: '',
        validade: '',
        saldo: 0,
        quantidade_min: 1,
        quantidade_max: 100,
        fk_produto_unid_medida: '',
        fk_produto_categoria: '',
        fk_produto_grupo: '',
        fk_produto_fornecedor: '',
        fk_produto_estoque: ''
      },
      v_: {
        nome_produto: false,
        preco_unitario: false,
        tipo_operacao: false,
        dt_movimentacao: false,
        dt_fabricacao: false,
        dt_validade: false,
        quantidade: false,
        ajuste: false,
        saldo_produto: false,
        documento: false,
        descricao: false,
        fk_movimentacao_produto: false,
        fk_tipo_documento: false
      },
      documentooOpt: [],
      tipoOperacaoOpt: [
        { label: 'Entrada', value: 1, description: 'Adicionar produtos ao estoque' },
        { label: 'Saída', value: 2, description: 'Saída de produtos do estoque' }
      ],
      unidMeidaOpt: [],
      movimentacao: {
        preco_unitario: 0,
        tipo_operacao: '',
        dt_movimentacao: '',
        dt_fabricacao: '',
        dt_validade: '',
        quantidade: 0,
        ajuste: false,
        saldo_produto: 0,
        documento: '',
        descricao: '',
        fk_movimentacao_produto: '',
        fk_tipo_documento: ''
      }
    }
  },
  watch: {
    'produto.id_produto': function (val) {
      let timeStamp = Date.now()
      this.movimentacao.dt_movimentacao = date.formatDate(timeStamp, 'YYYY-MM-DDHH:mm:ss')
      this.movimentacao.fk_movimentacao_produto = val
    },
    'produto.fk_produto_categoria': function (val) {
      Grupo.buscarByCategoria(val)
        .then((grupo) => {
          if (grupo.data.status === 404) {
            this.grupoOpt = []
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
    },
    'produto.preco_unitario': function (val) {
      this.movimentacao.preco_unitario = val
    }
  },
  methods: {
    salvar () {
      if (this.validarCampos()) {
        this.movimentacao['loglogin'] = this.usuarioLocal.login
        Mov.Cadastrar(this.movimentacao)
          .then((movimentacao) => {
            if (movimentacao.data.errors) {
              for (let i = 0; i < movimentacao.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: movimentacao.data.errors[i].message,
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
            if (movimentacao.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: movimentacao.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              // this.limparCampos()
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
    },
    validarCampos () {
      this.errors = []

      // Campo do saldo
      if (parseFloat(this.movimentacao.preco_unitario) <= parseFloat('0.00')) {
        this.errors.push({ msg: 'O valor unitario deve ser maior que 0', campo: 'preco_unitario', erro: true })
        this.v_.preco_unitario = true
      } else {
        this.v_.preco_unitario = false
      }

      // Campo do quantidade
      if (this.movimentacao.quantidade <= 0) {
        this.errors.push({ msg: 'A quantidade deve ser maior que 0', campo: 'quantidade', erro: true })
        this.v_.quantidade = true
      } else {
        this.v_.quantidade = false
      }

      // Campo do tipo de operacao
      if (this.movimentacao.tipo_operacao.length <= 0) {
        this.errors.push({ msg: 'Selecione um tipo de operação', campo: 'tipo_operacao', erro: true })
        this.v_.tipo_operacao = true
      } else {
        this.v_.tipo_operacao = false
      }

      // Campo do tipo do documento
      if (this.movimentacao.fk_tipo_documento <= 0) {
        this.errors.push({ msg: 'Selecione um tipo de operação', campo: 'tipo_operacao', erro: true })
        this.v_.fk_tipo_documento = true
      } else {
        this.v_.fk_tipo_documento = false
      }

      // Campo do tipo do documento
      if (this.nome_produto <= 0) {
        this.errors.push({ msg: 'Selecione um produto', campo: 'nome_produto', erro: true })
        this.v_.nome_produto = true
      } else {
        this.v_.nome_produto = false
      }

      // Campo do documento
      if (this.movimentacao.documento.length <= 0) {
        this.errors.push({ msg: 'Campo documento é obrigatório', campo: 'documento', erro: true })
        this.v_.documento = true
      } else {
        this.v_.documento = false
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
  font-size: 90%;
  color: grey;
  text-align: left;
}
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
