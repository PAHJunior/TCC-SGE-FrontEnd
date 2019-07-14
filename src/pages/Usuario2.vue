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
                <q-breadcrumbs-el icon="fas fa-user" to="/usuario"  label="Usuário" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <q-card class="col-12 ">
              <q-card-section class="row q-col-gutter-sm text-center items-end">

                <q-stepper
                  class="col-12 no-shadow no-scroll"
                  v-model="step"
                  header-nav
                  ref="stepper"
                  color="primary"
                  animated
                >

                  <!-- Formulario cadastrais -->
                  <q-step
                    :name="1"
                    title="Dados cadastrais"
                    icon="fas fa-user"
                    :done="done1"
                  >

                    <div class="row q-col-gutter-sm">

                      <div class="col-12">

                        <q-form
                          @submit="onSubmit"
                          @reset="onReset"
                        >
                          <div class="row">
                            <div class="col">
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
                            </div>
                          </div>
                        </q-form>
                      </div>

                      <q-stepper-navigation class="row col-12">
                        <q-btn
                          @click="() => { done1 = true; step = 2 }"
                          color="primary"
                          label="Continue"
                          class="col-12"
                        />
                      </q-stepper-navigation>

                    </div>

                  </q-step>

                  <q-step
                    :name="2"
                    title="Dados para contatos"
                    icon="phone"
                    :done="done2"
                  >

                    <!-- Dados para contato -->
                    <div class="row q-col-gutter-sm">

                      <div class="col-12">
                        <q-form
                          @submit="onSubmit"
                          @reset="onReset"
                        >

                          <div class="row">
                            <div class="col">
                              <div class="q-col-gutter-sm row">

                                <q-input
                                  class="col-md-12"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="E-mail"
                                />

                                <!-- Campo do CPF -->
                                <q-input
                                  class="col-md-6"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Telefone"
                                />

                                <!-- Campo do RG -->
                                <q-input
                                  class="col-md-6"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Celular"
                                />

                              </div>
                            </div>
                          </div>

                        </q-form>
                      </div>

                      <q-stepper-navigation class="row col-12">
                        <q-btn
                          @click="() => { done2 = true; step = 3 }"
                          color="primary"
                          label="Continue"
                          class="col-12"
                        />
                      </q-stepper-navigation>

                    </div>

                  </q-step>

                  <!-- Formulario de endereço -->
                  <q-step
                    :name="3"
                    title="Endereço"
                    icon="location_on"
                    :done="done3"
                  >
                    <div class="row q-col-gutter-sm">

                      <div class="col-12">

                        <q-form
                          @submit="onSubmit"
                          @reset="onReset"
                        >
                          <div class="row">
                            <div class="col">

                              <div class="q-col-gutter-sm row">

                                <q-input
                                  class="col-md-2"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="CEP"
                                />

                                <q-input
                                  class="col-md-8"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Logradouro"
                                />

                                <q-input
                                  class="col-md-2"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Numero"
                                />

                                <q-input
                                  class="col-md-5"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Bairro"
                                />

                                <q-input
                                  class="col-md-5"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Cidade"
                                />

                                <q-input
                                  class="col-md-2"
                                  dense
                                  outlined
                                  v-model="name"
                                  label="UF"
                                />

                              </div>

                            </div>
                          </div>
                        </q-form>
                      </div>

                      <q-stepper-navigation class="row col-12">
                        <q-btn
                          @click="done3 = true"
                          color="primary"
                          label="Cadastrar"
                          class="col-12"
                        />
                      </q-stepper-navigation>

                    </div>
                  </q-step>

                </q-stepper>

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
      date: ''
    }
  },
  computed: {

  }
}
</script>

<style>
fieldset {
  border:1px groove;
}

legend {
  padding: 0.2em 0.5em;
  font-size:90%;
  color: grey;
  text-align:left;
}
</style>
