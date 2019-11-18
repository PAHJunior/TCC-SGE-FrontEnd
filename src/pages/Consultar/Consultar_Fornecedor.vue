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
                <q-breadcrumbs-el icon="fas fa-truck" to="/cadastro_fornecedor"  label="Cadastro do fornecedor" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_fornecedor"  label="Consultar fornecedor" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 q-gutter-y-md row">

            <!-- Cabeçalho -->
            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">
                <div class="row col-12 justify-center q-gutter-x-xs">

                  <div class="col-md-3 col-sm-4 col-xs-12">

                    <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                      <template v-slot:prepend>
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="dados = !dados" flat dense round/>
                      </template>
                    </q-input>

                  </div>

                  <q-space />

                  <div class="col-md-3 col-sm-4 col-xs-12">

                    <q-select
                      v-model="visibleColumns"
                      multiple
                      outlined
                      dense
                      options-dense
                      display-value="Colunas"
                      emit-value
                      map-options
                      :options="columns"
                      option-value="name"
                      style="min-width: 200px; "
                    >
                      <template v-slot:option="scope">
                        <q-item
                          v-show="!scope.opt.required"
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                        >
                          <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                          </q-item-section>

                          <q-item-section avatar>
                            <q-toggle
                              disable
                              v-model="scope.itemProps.active"
                              color="primary"
                            />
                          </q-item-section>
                        </q-item>

                      </template>

                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <div class="col-12">

              <q-table
                :loading="loading"
                :filter="filter"
                :data="data"
                :columns="columns"
                :visible-columns="visibleColumns"
                :separator="separator"
                selection="single"
                :selected.sync="selected"
                row-key="id">

                <!-- Corpo da tabela -->
                <template v-slot:body="props">
                  <q-tr :props="props" >
                    <q-td auto-width>
                      <q-btn dense icon="edit" flat round @click="openModalEdit(props)"/>
                    </q-td>
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                    <q-td key="representante" :props="props">{{ props.row.representante }}</q-td>
                    <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                    <q-td key="telefone" :props="props">{{ props.row.telefone }}</q-td>
                    <q-td key="celular" :props="props">{{ props.row.celular }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo }}</q-td>
                    <q-td key="cep" :props="props">{{ props.row.cep }}</q-td>
                    <q-td key="logradouro" :props="props">{{ props.row.logradouro }}</q-td>
                    <q-td key="numero" :props="props">{{ props.row.numero }}</q-td>
                    <q-td key="bairro" :props="props">{{ props.row.bairro }}</q-td>
                    <q-td key="cidade" :props="props">{{ props.row.cidade }}</q-td>
                    <q-td key="uf" :props="props">{{ props.row.uf }}</q-td>
                    <q-td key="complemento" :props="props">{{ props.row.complemento }}</q-td>
                  </q-tr>
                </template>

              </q-table>

            </div>

          </div>

        </div>
      </div>
    </div>
    <q-dialog v-model="modalEdit">
      <q-card class="col-12 ">
        <q-card-section class=" q-col-gutter-sm text-center items-end">
          <q-form>
            <div class="row">
              <div class="col">
                <div class="q-gutter-y-md row justify-center col-12">
                  <fieldset class="col-12 no-border">
                    <div class="q-col-gutter-sm row items-start">
                      <fieldset class="col-12 no-border">

                          <legend>Dados do fornecedor</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo do cnome do fornecedor -->
                            <div :class="this.v_.nome ? 'validar-error row col-md-9 col-xs-12 col-sm-12' : 'row col-md-9 col-xs-12 col-sm-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.nome"
                                label="Nome do fornecedor"
                              />
                            </div>

                            <div class="col-md-3 col-xs-12 col-sm-12">
                              <q-checkbox
                                class="float-right"
                                left-label
                                v-model="fornecedor.ativo"
                                label="Status de categoria"/>
                            </div>

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Endereço</legend>

                          <div class="q-col-gutter-sm row">

                            <!-- Campo CEP -->
                            <div :class="this.v_.endereco.cep ? 'validar-error row col-md-2 col-xs-12 col-sm-3' : 'row col-md-2 col-xs-12 col-sm-3'">
                              <q-input
                                class="col-12"
                                dense
                                mask="#####-###"
                                outlined
                                v-model="fornecedor.endereco.cep"
                                label="CEP"
                              />
                            </div>

                            <!-- Campo Logradouro -->
                            <div :class="this.v_.endereco.logradouro ? 'validar-error row col-md-8 col-xs-12 col-sm-9' : 'row col-md-8 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.logradouro"
                                label="Logradouro"
                              />
                            </div>

                            <!-- Campo Numero -->
                            <div :class="this.v_.endereco.numero ? 'validar-error row col-md-2 col-xs-12 col-sm-3' : 'row col-md-2 col-xs-12 col-sm-3'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.numero"
                                label="Numero"
                              />
                            </div>

                            <!-- Campo Bairro -->
                            <div :class="this.v_.endereco.bairro ? 'validar-error row col-md-5 col-xs-12 col-sm-9' : 'row col-md-5 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.bairro"
                                label="Bairro"
                              />
                            </div>

                            <!-- Campo Cidade -->
                            <div :class="this.v_.endereco.cidade ? 'validar-error row col-md-5 col-xs-12 col-sm-9' : 'row col-md-5 col-xs-12 col-sm-9'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.cidade"
                                label="Cidade"
                              />
                            </div>

                            <!-- Campo UF -->
                            <div :class="this.v_.endereco.uf ? 'validar-error row col-md-2 col-xs-12 col-sm-3' : 'row col-md-2 col-xs-12 col-sm-3'">
                              <q-select
                                class="col-12"
                                dense
                                mask="AA"
                                outlined
                                v-model="fornecedor.endereco.uf"
                                label="UF"
                                :options="estados"
                                emit-value
                                map-options
                              />
                            </div>

                            <!-- Campo UF -->
                            <div :class="this.v_.endereco.complemento ? 'validar-error row col-md-12 col-xs-12 col-sm-12' : 'row col-md-12 col-xs-12 col-sm-12'">
                              <q-input
                                class="col-12"
                                dense
                                outlined
                                v-model="fornecedor.endereco.complemento"
                                label="Complemento"
                              />
                            </div>

                          </div>

                        </fieldset>

                        <fieldset class="col-12 no-border">
                          <legend>Representante (opcional)</legend>

                          <div class="q-col-gutter-sm row">

                            <q-input
                              class="col-md-4 col-xs-12 col-sm-4"
                              dense
                              outlined
                              v-model="fornecedor.representante.nome"
                              label="Nome do contato"
                            />

                            <q-input
                              class="col-md-8 col-xs-12 col-sm-8"
                              dense
                              outlined
                              v-model="fornecedor.representante.email"
                              label="E-mail"
                            />

                            <!-- Campo do Telefone -->
                            <q-input
                              class="col-md-6 col-xs-12 col-sm-6"
                              dense
                              mask="(##) ####-####"
                              outlined
                              v-model="fornecedor.representante.telefone"
                              label="Telefone"
                            />

                            <!-- Campo do Celular -->
                            <q-input
                              class="col-md-6 col-xs-12 col-sm-6"
                              dense
                              mask="(##) #####-####"
                              outlined
                              v-model="fornecedor.representante.celular"
                              label="Celular"
                            />

                          </div>

                        </fieldset>
                    </div>
                  </fieldset>

                  <div class="row col-md-6 ">
                    <q-btn label="Cadastrar" @click="alterar" type="submit" color="primary" class="col-12"/>
                  </div>

                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Fornecedor from '../../service/fornecedor/fornecedor.js'
export default {
  data () {
    return {
      estados: [
        {
          value: 'AC',
          label: 'Acre'
        },
        {
          value: 'AL',
          label: 'Alagoas'
        },
        {
          value: 'AM',
          label: 'Amazonas'
        },
        {
          value: 'AP',
          label: 'Amapá'
        },
        {
          value: 'BA',
          label: 'Bahia'
        },
        {
          value: 'CE',
          label: 'Ceará'
        },
        {
          value: 'DF',
          label: 'Distrito Federal'
        },
        {
          value: 'ES',
          label: 'Espírito Santo'
        },
        {
          value: 'GO',
          label: 'Goiás'
        },
        {
          value: 'MA',
          label: 'Maranhão'
        },
        {
          value: 'MG',
          label: 'Minas Gerais'
        },
        {
          value: 'MS',
          label: 'Mato Grosso do Sul'
        },
        {
          value: 'MT',
          label: 'Mato Grosso'
        },
        {
          value: 'PA',
          label: 'Pará'
        },
        {
          value: 'PB',
          label: 'Paraíba'
        },
        {
          value: 'PE',
          label: 'Pernambuco'
        },
        {
          value: 'PI',
          label: 'Piauí'
        },
        {
          value: 'PR',
          label: 'Paraná'
        },
        {
          value: 'RJ',
          label: 'Rio de Janeiro'
        },
        {
          value: 'RN',
          label: 'Rio Grande do Norte'
        },
        {
          value: 'RO',
          label: 'Rondônia'
        },
        {
          value: 'RR',
          label: 'Roraima'
        },
        {
          value: 'RS',
          label: 'Rio Grande do Sul'
        },
        {
          value: 'SC',
          label: 'Santa Catarina'
        },
        {
          value: 'SE',
          label: 'Sergipe'
        },
        {
          value: 'SP',
          label: 'São Paulo'
        },
        {
          value: 'TO',
          label: 'Tocantins'
        }
      ],
      v_: {
        nome: false,
        endereco: {
          cep: false,
          logradouro: false,
          numero: false,
          bairro: false,
          cidade: false,
          uf: false,
          complemento: false
        }
      },
      fornecedor: {
        nome: '',
        ativo: true,
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
          complemento: ''
        },
        representante: {
          nome: '',
          email: '',
          telefone: '',
          celular: ''
        }
      },
      modalEdit: false,
      loading: false,
      dados: false,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'nome', 'representante', 'email', 'telefone', 'celular', 'ativo'],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'nome', label: 'Nome Fornecedor', field: 'nome', align: 'left', sortable: true },
        { name: 'representante', label: 'Nome Representante', field: 'representante', align: 'left', sortable: true },
        { name: 'email', label: 'E-mail', field: 'email', align: 'left', sortable: true },
        { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left', sortable: true },
        { name: 'celular', label: 'Celular', field: 'celular', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true },
        { name: 'cep', label: 'CEP', field: 'cep', align: 'left', sortable: true },
        { name: 'logradouro', label: 'Logradouro', field: 'logradouro', align: 'left', sortable: true },
        { name: 'numero', label: 'Numero', field: 'numero', align: 'left', sortable: true },
        { name: 'bairro', label: 'Bairro', field: 'bairro', align: 'left', sortable: true },
        { name: 'cidade', label: 'Cidade', field: 'cidade', align: 'left', sortable: true },
        { name: 'uf', label: 'UF', field: 'uf', align: 'left', sortable: true },
        { name: 'complemento', label: 'Complemento', field: 'complemento', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    this.buscarFornecedor()
  },
  methods: {
    buscarFornecedor () {
      this.loading = true
      Fornecedor.buscar()
        .then((fornecedor) => {
          if (fornecedor.data.errors) {
            for (let i = 0; i < fornecedor.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: fornecedor.data.errors[i].message,
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
          if (fornecedor.data.status === 200) {
            this.dados = true
            this.data = fornecedor.data.response.map((f) => {
              return {
                id: f.id_fornecedor,
                nome: f.nome,
                representante: f.representante.nome,
                email: f.representante.email,
                telefone: f.representante.telefone,
                celular: f.representante.celular,
                ativo: f.ativo ? 'Ativo' : 'Inativo',
                cep: f.endereco.cep,
                logradouro: f.endereco.logradouro,
                numero: f.endereco.numero,
                bairro: f.endereco.bairro,
                cidade: f.endereco.cidade,
                uf: f.endereco.uf,
                complemento: f.endereco.complemento
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
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
          this.$q.notify({
            color: 'negative',
            message: `${error}`,
            position: 'top-right',
            icon: 'warning',
            timeout: 2000,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    buscarUm (id) {
      Fornecedor.buscarUm(id)
        .then((fornec) => {
          this.fornecedor = fornec.data.response[0]
          this.fornecedor.id = fornec.data.response[0].id_fornecedor
        })
        .catch((e) => {
          this.$q.notify({
            color: 'negative',
            message: 'Erro buscar o usuario, porfavor tente novamente.',
            position: 'top-right',
            icon: 'warning',
            timeout: 1500,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
        })
    },
    openModalEdit (props) {
      this.modalEdit = !this.modalEdit
      this.buscarUm(props.row.id)
    },
    validarCampos () {
      this.errors = []
      // Verificando o Nome
      if (this.fornecedor.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome do fornecedor é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
      }

      if (this.fornecedor.endereco.cep.length !== 9) {
        this.errors.push({ msg: 'O cep informado está inválido', campo: 'cep', erro: true })
        this.v_.endereco.cep = true
      } else {
        this.v_.endereco.cep = false
      }

      if (this.fornecedor.endereco.logradouro.length === 0) {
        this.errors.push({ msg: 'O campo logradouro é obrigátorio', campo: 'logradouro', erro: true })
        this.v_.endereco.logradouro = true
      } else {
        this.v_.endereco.logradouro = false
      }

      if (this.fornecedor.endereco.numero.length === 0) {
        this.errors.push({ msg: 'O campo numero é obrigátorio', campo: 'numero', erro: true })
        this.v_.endereco.numero = true
      } else {
        this.v_.endereco.numero = false
      }

      if (this.fornecedor.endereco.bairro.length === 0) {
        this.errors.push({ msg: 'O campo bairro é obrigátorio', campo: 'bairro', erro: true })
        this.v_.endereco.bairro = true
      } else {
        this.v_.endereco.bairro = false
      }

      if (this.fornecedor.endereco.cidade.length === 0) {
        this.errors.push({ msg: 'O campo cidade é obrigátorio', campo: 'cidade', erro: true })
        this.v_.endereco.cidade = true
      } else {
        this.v_.endereco.cidade = false
      }

      if (this.fornecedor.endereco.uf.length === 0) {
        this.errors.push({ msg: 'O campo UF é obrigátorio', campo: 'uf', erro: true })
        this.v_.endereco.uf = true
      } else {
        this.v_.endereco.uf = false
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
    },
    alterar () {
      if (this.validarCampos()) {
        Fornecedor.modificar(this.fornecedor.id_fornecedor, this.fornecedor)
          .then((fornecedor) => {
            if (fornecedor.data.errors) {
              for (let i = 0; i < fornecedor.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: fornecedor.data.errors[i].message,
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
            if (fornecedor.data.status === 200) {
              this.$q.notify({
                color: 'positive',
                message: fornecedor.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.modalEdit = false
              this.buscarFornecedor()
            }
            if (fornecedor.data.status === 204) {
              this.$q.notify({
                color: 'warning',
                message: fornecedor.data.response,
                position: 'top-right',
                icon: 'thumb_up'
              })
              this.modalEdit = false
              this.buscarFornecedor()
            }
          })
          .catch((e) => {
            console.error(e)
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
