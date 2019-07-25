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

                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="estoque.nome_estoque"
                              label="código do produto"
                            />

                            <!-- Campo do quantidade_total -->
                            <q-input
                              class="col-md-10"
                              dense
                              outlined
                              v-model="estoque.valor_estoque"
                              label="Descrição"
                            />

                            <!-- Campo data de nascimento -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="estoque.quantidade_total"
                              label="Valor Estoque"
                              disable
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
      estoque: {
        nome_estoque: '',
        valor_estoque: '0',
        quantidade_total: '0'
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
