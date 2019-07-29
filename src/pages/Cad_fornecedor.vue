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
                <q-breadcrumbs-el icon="fas fa-box" to="/cadastro_fornecedor"  label="Cadastro do fornecedor" />

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

                          <legend>Dados do fornecedor</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do código do produto -->
                            <q-input
                              class="col-md-12"
                              dense
                              outlined
                              v-model="produto.codProduto"
                              label="Nome *"
                            />

                            <div class="col-12 text-left">
                              <q-btn
                                :icon="maisCampos ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                                label="Mais campos (Opcional)"
                                size="sm"
                                flat
                                @click="maisCampos = !maisCampos"
                              />

                            </div>

                            <transition name="fade">

                              <div class="col-12 row " v-if="maisCampos">

                                <div class="col">

                                  <div class="q-col-gutter-sm row col-12 ">

                                    <!-- Campo Tipo pessoa, fisica ou juridica -->
                                    <q-select
                                      outlined
                                      label="Tipo pessoa *"
                                      class="col-md-3"
                                      v-model="tipoPessoa"
                                      dense
                                      options-dense
                                      :options="tipoPessoaOpt"
                                      emit-value
                                      map-options
                                    />

                                    <!-- Campo CNPJ / CPF-->
                                    <q-input
                                      class="col-md-4"
                                      dense
                                      outlined
                                      v-model="produto.codProduto"
                                      :mask="tipoPessoa == 'fisica' ? '###.###.###-##' : '##.###.###/####-##'"
                                      :label="tipoPessoa == 'fisica' ? 'CPF' : 'CNPJ'"
                                    />

                                    <div class="col-md-5 row">

                                      <q-select
                                        outlined
                                        label="Indicador de inscrição estadual"
                                        class="col-md-8"
                                        v-model="tipoIE"
                                        dense
                                        options-dense
                                        :options="tipoIEOpt"
                                        emit-value
                                        map-options
                                      />

                                    </div>

                                    <!-- Campo Razão social -->
                                    <q-input
                                      class="col-md-3"
                                      dense
                                      outlined
                                      v-model="produto.codProduto"
                                      label="Razão social"
                                    />

                                    <!-- Campo Inscrição estadual IE -->
                                    <q-input
                                      class="col-md-3"
                                      dense
                                      outlined
                                      v-model="produto.codProduto"
                                      label="Inscrição estadual"
                                    />

                                    <!-- Campo Inscrição estadual IE -->
                                    <q-input
                                      class="col-md-3"
                                      dense
                                      outlined
                                      v-model="produto.codProduto"
                                      label="Inscrição municipal"
                                    />

                                    <div class="row col-md-12">
                                      <!-- Campo Identificador estrangeiro estadual IE -->
                                      <q-input
                                        class="col-md-3"
                                        dense
                                        outlined
                                        v-model="produto.codProduto"
                                        label="Identificador estrangeiro"
                                      />

                                    </div>

                                  </div>
                                </div>
                              </div>

                            </transition>

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Endereço (opcional)</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo CEP -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="fornecedor.cep"
                              label="CEP"
                            />

                            <!-- Campo Logradouro -->
                            <q-input
                              class="col-md-8"
                              dense
                              outlined
                              v-model="fornecedor.logradouro"
                              label="Logradouro"
                            />

                            <!-- Campo Numero -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="fornecedor.numero"
                              label="Numero"
                            />

                            <!-- Campo Bairro -->
                            <q-input
                              class="col-md-5"
                              dense
                              outlined
                              v-model="fornecedor.bairro"
                              label="Bairro"
                            />

                            <!-- Campo Cidade -->
                            <q-input
                              class="col-md-5"
                              dense
                              outlined
                              v-model="fornecedor.cidade"
                              label="Cidade"
                            />

                            <!-- Campo UF -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="fornecedor.uf"
                              label="UF"
                            />

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Contato (opcional)</legend>

                          <div class="q-col-gutter-sm row">

                            <q-input
                              class="col-md-12"
                              dense
                              outlined
                              v-model="fornecedor.email"
                              label="E-mail"
                            />

                            <!-- Campo do Telefone -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="fornecedor.telefone"
                              label="Telefone"
                            />

                            <!-- Campo do Celular -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="fornecedor.celular"
                              label="Celular"
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
      maisCampos: false,
      tipoPessoa: 'juridica',
      tipoIE: 'nContribuinte',
      tipoIEOpt: [
        {
          label: 'Não contribuinte',
          value: 'nContribuinte'
        },
        {
          label: 'Contribuinte',
          value: 'contribuinte'
        },
        {
          label: 'Contribuinte isento',
          value: 'contribuinteIsento'
        }
      ],
      tipoPessoaOpt: [
        {
          label: 'Física',
          value: 'fisica'
        },
        {
          label: 'Jurídica',
          value: 'juridica'
        }
      ],
      fornecedor: {
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        email: '',
        telefone: '',
        celular: ''
      },
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}

legend {
  padding: 0.2em 0.5em;
  font-size:90%;
  color: grey;
  text-align:left;
}
</style>
