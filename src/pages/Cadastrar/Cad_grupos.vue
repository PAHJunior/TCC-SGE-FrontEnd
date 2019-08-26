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
                <q-breadcrumbs-el icon="fas fa-user" to="/cadastro_grupo"  label="Cadastro de grupos" />

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
                      <div class="q-gutter-y-md row justify-center">

                        <fieldset class="col-12 no-border">

                          <legend>Dados cadastrais</legend>

                          <div class="q-col-gutter-sm row">

                            <q-input
                              class="col-md-1"
                              dense
                              outlined
                              v-model="usuario.id"
                              label="ID"
                              disable
                            />

                            <!-- nom completo -->
                            <q-input
                              class="col-md-11"
                              dense
                              outlined
                              v-model="usuario.nome"
                              label="Nome completo"
                            />

                            <!-- Campo do CPF -->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              mask="###.###.###-##"
                              v-model="usuario.cpf"
                              label="CPF"
                            />

                            <!-- Campo do RG -->
                            <q-input
                              class="col-md-3"
                              mask="##.###.###-#"
                              dense
                              outlined
                              v-model="usuario.rg"
                              label="RG"
                            />

                            <!-- Campo data de nascimento -->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="usuario.dtnascimento"
                              label="Data de nascimento"
                            >
                              <template v-slot:prepend>
                                <!-- <q-icon name="event" /> -->
                                <q-btn round flat dense icon="event">
                                  <q-menu fit anchor="bottom left" self="top left">

                                    <q-date
                                      v-model="usuario.dtnascimento"
                                      minimal
                                    />

                                  </q-menu>

                                </q-btn>
                              </template>
                            </q-input>

                            <!-- Campo GRupo -->
                            <q-input
                              class="col-md-3"
                              dense
                              outlined
                              v-model="usuario.grupo"
                              label="Grupo"
                            />

                          </div>
                        </fieldset>

                        <div class="row col-md-6 ">
                          <q-btn label="Cadastrar" @click="buscarCEP" type="submit" color="primary" class="col-12"/>
                          {{ cep }}
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
import Cep from '../../service/cep/cep.js'

export default {
  data () {
    return {
      usuario: {
        id: '',
        nome: '',
        hierarquia: '',
        rg: '',
        cpf: '',
        dtnascimento: '',
        login: '',
        senha: '',
        email: '',
        telefone: '',
        celular: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: ''
      }
    }
  },
  // methods: {}
  computed: {

  },
  methods: {
    buscarCEP () {
      Cep.cep(this.usuario.cep)
        .then(resposta => {
          console.log(resposta.data)
          const cep = resposta.data
          this.usuario.logradouro = cep.logradouro
          this.usuario.bairro = cep.bairro
          this.usuario.cidade = cep.cidade
          this.usuario.uf = cep.estado
        })
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
</style>
