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
                <q-breadcrumbs-el icon="fas fa-box" to="/cadastro_movimentação"  label="Cadastro de movimentações" />

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

                          <legend>Dados da movimentação</legend>

                          <div class="q-col-gutter-sm row">
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
      unidMeidaOpt: [
        { label: 'Metro', value: 'm', description: 'metro - m' },
        { label: 'Litro', value: 'l', description: 'Litro - l' },
        { label: 'Quilograma', value: 'kg', description: 'Quilograma - kg' },
        { label: 'Metro quadrado', value: 'm2', description: 'Metro quadrado - m²' },
        { label: 'Metro cúbico', value: 'm3', description: 'Metro cúbico - m³' }
      ],
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
        estoqueMax: 1,
        status: true
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
