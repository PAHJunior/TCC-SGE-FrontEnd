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
                <q-breadcrumbs-el icon="fas fa-box" to="/cadastro_produtos"  label="Cadastro de produtos" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">

                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                >
                  <div class="row">
                    <div class="col">
                      <div class="q-gutter-y-md row justify-center col-12">

                        <fieldset class="col-12 no-border">

                          <legend>Dados do produto</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do código do produto -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="produto.codProduto"
                              label="código do produto"
                            />

                            <!-- Campo do Descrição -->
                            <q-input
                              class="col-md-10"
                              dense
                              outlined
                              v-model="produto.descricao"
                              label="Descrição"
                            />

                            <!-- Campo Categoria do produto -->
                            <q-select
                              class="col-md-3"
                              label="Categoria do produto"
                              outlined
                              v-model="produto.categoriaProduto"
                              dense
                              options-dense
                              :options="options"
                            />

                            <!-- Campo Unidade de medida -->
                            <q-select
                              class="col-md-3"
                              label="Unidade de medida"
                              outlined
                              v-model="produto.unidMedida"
                              dense
                              options-dense
                              :options="options"
                            />

                            <!-- Campo Fornecedor -->
                            <q-select
                              class="col-md-6"
                              label="Fornecedor"
                              outlined
                              v-model="produto.fornecedor"
                              dense
                              options-dense
                              :options="options"
                            />

                            <!-- Campo Valor de venda -->
                            <q-input
                              class="col-md-3"
                              dense
                              prefix="R$"
                              outlined
                              label="Valor de venda"
                              v-model="produto.valorVenda"
                            />

                            <!-- Campo Valor de custo -->
                            <q-input
                              class="col-md-3"
                              dense
                              prefix="R$"
                              outlined
                              label="Valor de custo"
                              v-model="produto.valorCusto"
                            />

                            <div class="col-md-6" />

                            <!-- Campo Disponível em estoque -->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="produto.disponivel"
                              label="Disponível em estoque"
                            />

                            <!-- Campo Estoque mínimo -->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="produto.estoqueMin"
                              label="Estoque mínimo"
                            />

                            <!-- Campo Estoque mínimo -->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="produto.estoqueMax"
                              label="Estoque máximo"
                            />

                          </div>

                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" type="submit" color="primary" class="col-12"/>
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

export default {
  data () {
    return {
      produto: {
        codProduto: '',
        descricao: '',
        categoriaProduto: '',
        unidMedida: '',
        fornecedor: '',
        valorVenda: 0,
        valorCusto: 1,
        disponivel: 0,
        estoqueMin: 1,
        estoqueMax: 1
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
