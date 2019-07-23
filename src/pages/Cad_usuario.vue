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
                <q-breadcrumbs-el icon="fas fa-user" to="/cadastro_usuario"  label="Cadastro de usuário" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class="row q-col-gutter-sm text-center items-end">

                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                >
                  <div class="row">
                    <div class="col">
                      <div class="q-gutter-y-md row justify-center">

                        <fieldset class="col-12 no-border">

                          <legend>Dados cadastrais</legend>

                          <div class="q-col-gutter-sm row">

                            <q-input
                              class="col-md-12"
                              dense
                              outlined
                              v-model="name"
                              label="Nome completo"
                            />

                            <!-- Campo do CPF -->
                            <q-input
                              class="col-md-4"
                              dense
                              outlined
                              v-model="name"
                              label="CPF"
                            />

                            <!-- Campo do RG -->
                            <q-input
                              class="col-md-4"
                              dense
                              outlined
                              v-model="name"
                              label="RG"
                            />

                            <!-- Campo data de nascimento -->
                            <q-input
                              class="col-md-4"
                              dense
                              outlined
                              v-model="date"
                              label="Data de nascimento"
                            >
                              <template v-slot:prepend>
                                <!-- <q-icon name="event" /> -->
                                <q-btn round flat dense icon="event">
                                  <q-menu fit anchor="bottom left" self="top left">

                                    <q-date
                                      v-model="date"
                                      minimal
                                    />

                                  </q-menu>

                                </q-btn>
                              </template>
                            </q-input>

                          </div>
                        </fieldset>

                        <!-- Dados para contato -->
                        <fieldset class="col-12 no-border">
                          <legend>Dados para contato</legend>

                          <div class="q-col-gutter-sm row">

                            <q-input
                              class="col-md-12"
                              dense
                              outlined
                              v-model="name"
                              label="E-mail"
                            />

                            <!-- Campo do Telefone -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="name"
                              label="Telefone"
                            />

                            <!-- Campo do Celular -->
                            <q-input
                              class="col-md-6"
                              dense
                              outlined
                              v-model="name"
                              label="Celular"
                            />

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Endereço</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo CEP -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="name"
                              label="CEP"
                            />

                            <!-- Campo Logradouro -->
                            <q-input
                              class="col-md-8"
                              dense
                              outlined
                              v-model="name"
                              label="Logradouro"
                            />

                            <!-- Campo Numero -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="name"
                              label="Numero"
                            />

                            <!-- Campo Bairro -->
                            <q-input
                              class="col-md-5"
                              dense
                              outlined
                              v-model="name"
                              label="Bairro"
                            />

                            <!-- Campo Cidade -->
                            <q-input
                              class="col-md-5"
                              dense
                              outlined
                              v-model="name"
                              label="Cidade"
                            />

                            <!-- Campo UF -->
                            <q-input
                              class="col-md-2"
                              dense
                              outlined
                              v-model="name"
                              label="UF"
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
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      name: '',
      date: '2019/07/25'
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
