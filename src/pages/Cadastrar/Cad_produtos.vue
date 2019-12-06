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
                <q-breadcrumbs-el icon="fas fa-box" to="/cadastro_produtos"  label="Cadastro de produtos" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">

                <q-form>
                  <div class="row">
                    <div class="col">
                      <div class="q-gutter-y-md row justify-center col-12">

                        <fieldset class="col-12 no-border">

                          <legend>Dados do produto</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do ID -->
                            <div :class="this.v_.id ? 'validar-error row col-md-1 col-sm-2 col-xs-12' : 'row col-md-1 col-sm-2 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                disable
                                outlined
                                v-model="produto.id"
                                label="ID"
                              />
                            </div>

                            <!-- Campo do código do produto -->
                            <div :class="this.v_.codigo_produto ? 'validar-error row col-md-2 col-sm-10 col-xs-12' : 'row col-md-2 col-sm-10 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="produto.codigo_produto"
                                label="Código do produto"
                              />
                            </div>

                            <!-- Campo do Nome -->
                            <div :class="this.v_.nome_produto ? 'validar-error row col-md-6 col-sm-9 col-xs-12' : 'row col-md-6 col-sm-9 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="produto.nome_produto"
                                label="Nome do produto"
                              />
                            </div>

                            <div class="col-md-3 col-sm-3 col-xs-12">
                              <q-checkbox class="float-right" left-label v-model="produto.ativo" label="Status do produto" />
                            </div>

                            <!-- Campo Estoque mínimo -->
                            <div :class="this.v_.quantidade_min ? 'validar-error row col-md-3 col-sm-6 col-xs-12' : 'row col-md-3 col-sm-6 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="produto.quantidade_min"
                                label="Estoque mínimo"
                                maxlength="10"
                              />
                            </div>

                            <!-- Campo Estoque maximo -->
                            <div :class="this.v_.quantidade_max ? 'validar-error row col-md-3 col-sm-6 col-xs-12' : 'row col-md-3 col-sm-6 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                maxlength="10"
                                v-model="produto.quantidade_max"
                                label="Estoque máximo"
                              />
                            </div>

                            <!-- Campo Estoque -->
                            <div :class="this.v_.fk_produto_estoque ? 'validar-error row col-md-3 col-sm-4 col-xs-12' : 'row col-md-3 col-sm-4 col-xs-12' ">
                              <q-select
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
                              >
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      Nenhum estoque
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>

                            <div class="col-md-3 col-sm-8 col-xs-12">
                              <q-checkbox class="float-right" left-label v-model="produto.controlaLote" label="Controla lote?" />
                            </div>

                            <!-- Campo Unidade de medida -->
                            <div :class="this.v_.fk_produto_unid_medida ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-select
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
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      Nenhuma unidade de medida
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
                                      <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>

                            <!-- Campo Categoria do produto -->
                            <div :class="this.v_.fk_produto_categoria ? 'validar-error row col-md-4 col-sm-6 col-xs-12' : 'row col-md-4 col-sm-6 col-xs-12' ">
                              <q-select
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
                              >
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      Nenhuma categoria
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>

                            <!-- Campo grupo do produto -->
                            <div :class="this.v_.fk_produto_grupo ? 'validar-error row col-md-4 col-sm-6 col-xs-12' : 'row col-md-4 col-sm-6 col-xs-12' ">
                              <q-select
                                class="col-12"
                                label="Grupo do produto"
                                outlined
                                v-model="produto.fk_produto_grupo"
                                dense
                                options-dense
                                :options="grupoOpt"
                                map-options
                                emit-value
                                option-label="desc"
                                option-value="id"
                              >
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      Nenhum grupo
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>

                            <!-- Campo Fornecedor -->
                            <div :class="this.v_.fk_produto_fornecedor ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-select
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
                              >
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      Nenhum fornecedor
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>

                            <!-- Campo preço unitario -->
                            <div :class="this.v_.preco_unitario ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                label="Valor unitário do produto"
                                reverse-fill-mask
                                input-class="text-right"
                                fill-mask="0"
                                maxlength="17"
                                mask="#.##"
                                v-model="produto.preco_unitario"
                              />
                            </div>

                            <!-- Campo Preço -->
                            <div :class="this.v_.saldo ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12' ">
                              <q-input
                                disable
                                class="col-12"
                                dense
                                outlined
                                label="Saldo"
                                v-model="produto.saldo"
                              />
                            </div>

                          </div>

                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" @click="salvar" type="submit" color="primary" class="col-12"/>
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
import UndMedida from '../../service/unidade_medida/unidade_medida.js'
import Estoque from '../../service/estoque/estoque.js'
import Fornecedor from '../../service/fornecedor/fornecedor.js'
import Produto from '../../service/produto/produto.js'

export default {
  mounted () {
    this.usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
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
    Estoque.buscarEstoqueAtivo()
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
      usuarioLocal: null,
      errors: [],
      categoriaOpt: [],
      grupoOpt: [],
      unidMeidaOpt: [],
      estoqueOpt: [],
      fornecedorOpt: [],
      produto: {
        id: '',
        codigo_produto: '',
        nome_produto: '',
        preco_unitario: 0.00,
        saldo: 0,
        quantidade_min: 1,
        quantidade_max: 100,
        ativo: true,
        controlaLote: false,
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
        saldo: false,
        quantidade_min: false,
        quantidade_max: false,
        ativo: false,
        fk_produto_unid_medida: false,
        fk_produto_categoria: false,
        fk_produto_grupo: false,
        fk_produto_fornecedor: false,
        fk_produto_estoque: false
      }
    }
  },
  watch: {
    'produto.fk_produto_categoria': function (val) {
      this.produto.fk_produto_grupo = ''
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
            this.grupoOpt = grupo.data.response.map((grupo) => {
              return {
                id: grupo.id_grupo_produto,
                desc: grupo.nome
              }
            })
          }
        })
    }
  },
  methods: {
    salvar () {
      if (this.validarCampos()) {
        this.produto['loglogin'] = this.usuarioLocal.login
        Produto.Cadastrar(this.produto)
          .then((produto) => {
            if (produto.data.errors) {
              for (let i = 0; i < produto.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: produto.data.errors[i].message,
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
            if (produto.data.status === 201) {
              this.$q.notify({
                color: 'positive',
                message: produto.data.response,
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
    limparCampos () {
      this.produto.id = ''
      this.produto.codigo_produto = ''
      this.produto.nome_produto = ''
      this.produto.preco_unitario = 0.00
      this.produto.fabricacao = ''
      this.produto.validade = ''
      this.produto.saldo = 0
      this.produto.quantidade_min = 1
      this.produto.quantidade_max = 100
      this.produto.ativo = true
      this.produto.fabricacao = ''
      this.produto.validade = ''
      this.produto.controlaLote = false
      this.produto.fk_produto_unid_medida = ''
      this.produto.fk_produto_categoria = ''
      this.produto.fk_produto_grupo = ''
      this.produto.fk_produto_fornecedor = ''
      this.produto.fk_produto_estoque = ''
    },
    validarCampos () {
      this.errors = []

      // Campo do saldo
      if (parseFloat(this.produto.preco_unitario) <= parseFloat('0.00')) {
        this.errors.push({ msg: 'O valor unitario deve ser maior que 0', campo: 'preco_unitario', erro: true })
        this.v_.preco_unitario = true
      } else {
        this.v_.preco_unitario = false
      }

      // Campo do nome
      if (this.produto.nome_produto.length === 0) {
        this.errors.push({ msg: 'O campo nome é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome_produto = true
      } else {
        this.v_.nome_produto = false
      }

      // Campo do quantidade_min
      if (this.produto.quantidade_min < 1) {
        this.errors.push({ msg: 'O quantidade miníma é obrigátorio', campo: 'quantidade_min', erro: true })
        this.v_.quantidade_min = true
      } else {
        this.v_.quantidade_min = false
      }

      // Campo do quantidade_max
      if (this.produto.quantidade_max <= 10) {
        this.errors.push({ msg: 'A quantidade maxíma deve ser maior que 10', campo: 'quantidade_max', erro: true })
        this.v_.quantidade_max = true
      } else {
        this.v_.quantidade_max = false
      }

      // Campo do fk_produto_unid_medida
      if (this.produto.fk_produto_unid_medida.length === 0) {
        this.errors.push({ msg: 'Selecione uma unidade de medida', campo: 'quantidade_max', erro: true })
        this.v_.fk_produto_unid_medida = true
      } else {
        this.v_.fk_produto_unid_medida = false
      }

      // Campo do fk_produto_estoque
      if (this.produto.fk_produto_estoque.length === 0) {
        this.errors.push({ msg: 'Selecione um estoque', campo: 'fk_produto_estoque', erro: true })
        this.v_.fk_produto_estoque = true
      } else {
        this.v_.fk_produto_estoque = false
      }

      // Campo do fk_produto_grupo
      if (this.produto.fk_produto_grupo.length === 0) {
        this.errors.push({ msg: 'Selecione um grupo', campo: 'fk_produto_grupo', erro: true })
        this.v_.fk_produto_grupo = true
      } else {
        this.v_.fk_produto_grupo = false
      }

      // Campo do fk_produto_categoria
      if (this.produto.fk_produto_categoria.length === 0) {
        this.errors.push({ msg: 'Selecione uma categoria', campo: 'fk_produto_categoria', erro: true })
        this.v_.fk_produto_categoria = true
      } else {
        this.v_.fk_produto_categoria = false
      }

      // Campo do fk_produto_categoria
      if (this.produto.fk_produto_fornecedor.length === 0) {
        this.errors.push({ msg: 'Selecione um fornecedor', campo: 'fk_produto_fornecedor', erro: true })
        this.v_.fk_produto_fornecedor = true
      } else {
        this.v_.fk_produto_fornecedor = false
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

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
