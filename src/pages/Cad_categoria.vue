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
                <q-breadcrumbs-el to="/cadastro_categoria"  label="Cadastro de categorias" />

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

                          <legend>Dados para categoria</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do código do produto -->
                            <q-input
                              class="col-md-9"
                              dense
                              outlined
                              v-model="categoria.nomeCategoria"
                              label="Nome da categoria"
                            />

                            <div class="col-md-3">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="categoria.status"
                                label="Status de categoria"/>
                            </div>

                            <!-- Campo do Descrição -->
                            <q-input
                              class="col-12"
                              dense
                              outlined
                              autogrow
                              counter
                              maxlength="150"
                              v-model="categoria.descricao"
                              label="Descrição da categoria"
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
      categoria: {
        nomeCategoria: '',
        descricao: '',
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
