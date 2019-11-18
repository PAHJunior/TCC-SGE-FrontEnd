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
                <q-breadcrumbs-el icon="fas fa-user" to="/cadastro_usuario"  label="Cadastro de usúario" />
                <q-breadcrumbs-el icon="fas fa-search" to="/cadastro_estoque"  label="Consultar usúario" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 q-gutter-y-md row">

            <!-- Cabeçalho -->
            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">
                <div class="row col-12 justify-center q-gutter-x-xs">

                  <div class="col-md-3">

                    <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                      <template v-slot:prepend>
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="buscarUsuarios" flat dense round/>
                      </template>
                    </q-input>

                  </div>

                  <q-space />

                  <div class="col-md-3">

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
                :loading="loadingUser"
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
                      <!-- <q-btn dense icon="edit" flat round @click="props.selected = !props.selected"/> -->
                      <q-btn dense icon="edit" flat round @click="openModalEdit(props)"/>
                      <!-- <q-btn dense :icon="props.row.ativo === 'Ativo' ? 'toggle_off': 'toggle_on'" :color="props.row.ativo === 'Ativo'? 'green': 'red-8'" flat round @click="deletar(props)" /> -->
                    </q-td>
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                    <q-td key="cpf" :props="props">{{ props.row.cpf }}</q-td>
                    <q-td key="rg" :props="props">{{ props.row.rg }}</q-td>
                    <q-td key="aniversario" :props="props">{{ props.row.aniversario }}</q-td>
                    <q-td key="grupo" :props="props">{{ props.row.grupo }}</q-td>
                    <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                    <q-td key="telefone" :props="props">{{ props.row.telefone }}</q-td>
                    <q-td key="celular" :props="props">{{ props.row.celular }}</q-td>
                    <q-td key="cep" :props="props">{{ props.row.cep }}</q-td>
                    <q-td key="logradouro" :props="props">{{ props.row.logradouro }}</q-td>
                    <q-td key="numero" :props="props">{{ props.row.numero }}</q-td>
                    <q-td key="bairro" :props="props">{{ props.row.bairro }}</q-td>
                    <q-td key="cidade" :props="props">{{ props.row.cidade }}</q-td>
                    <q-td key="uf" :props="props">{{ props.row.uf }}</q-td>
                    <q-td key="complemento" :props="props">{{ props.row.complemento }}</q-td>
                    <q-td key="login" :props="props">{{ props.row.login }}</q-td>
                    <q-td key="ativo" :props="props">{{ props.row.ativo ? 'Ativo' : 'Inativo' }}</q-td>
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
                <div class="q-gutter-y-md row justify-center">

                  <fieldset class="col-12 no-border">

                  <legend>Dados cadastrais</legend>

                  <div class="q-col-gutter-sm row items-start">

                    <div :class="this.v_.id ? 'validar-error row col-md-1 col-sm-2 col-xs-12' : 'row col-md-1 col-sm-2 col-xs-12' ">
                      <q-input
                        class=" col-12"
                        dense
                        outlined
                        v-model="usuario.id"
                        label="ID"
                        disable
                      />
                    </div>

                    <!-- nom completo -->
                    <div :class="this.v_.nome ? 'validar-error row col-md-9 col-sm-6 col-xs-12' : 'row col-md-9 col-sm-6 col-xs-12' ">
                      <q-input
                        ref="nome"
                        maxlength="100"
                        class="text-red col-12"
                        dense
                        outlined
                        v-model="usuario.nome"
                        label="Nome completo"
                      />
                    </div>

                          <!-- Campo de ativo -->
                    <div class="col-md-2 col-sm-4 col-xs-12">
                      <q-checkbox
                        class="float-right"
                        left-label
                        v-model="usuario.ativo"
                        label="Status do usúario"/>
                    </div>

                    <!-- Campo do CPF -->
                    <div :class="this.v_.cpf ? 'validar-error row col-md-3 col-sm-3 col-xs-12' : 'row col-md-3 col-sm-3 col-xs-12'">
                      <q-input
                        class="col-12"
                        dense
                        outlined
                        mask="###.###.###-##"
                        v-model="usuario.cpf"
                        label="CPF"
                      />
                    </div>

                          <!-- Campo do RG -->
                    <div :class="this.v_.rg ? 'validar-error row col-md-3 col-sm-3 col-xs-12': 'row col-md-3 col-sm-3 col-xs-12'">
                      <q-input
                        ref="rg"
                        class="col-12"
                        mask="##.###.###-#"
                        dense
                        outlined
                        v-model="usuario.rg"
                        label="RG"
                      />
                    </div>

                    <!-- Campo data de nascimento -->
                    <div :class="this.v_.dt_nascimento ? 'validar-error row col-md-3 col-sm-3 col-xs-12' : 'row col-md-3 col-sm-3 col-xs-12'">
                      <q-input
                        class="col-12"
                        dense
                        outlined
                        mask="##-##-####"
                        v-model="usuario.dt_nascimento"
                        label="Data de nascimento"
                      >
                        <template v-slot:prepend>
                          <!-- <q-icon name="event" /> -->
                          <q-btn round flat dense icon="event">
                            <q-menu fit anchor="bottom left" self="top left">

                              <q-date
                                v-model="usuario.dt_nascimento"
                                minimal
                                mask="DD-MM-YYYY"
                              />

                            </q-menu>

                          </q-btn>
                        </template>
                      </q-input>
                    </div>

                          <!-- Campo fk_usuario_hierarquia -->
                    <div :class="this.v_.fk_usuario_hierarquia ? 'validar-error row col-md-3 col-sm-3 col-xs-12': 'row col-md-3 col-sm-3 col-xs-12'">
                      <q-select
                        :options="opt_hierarquia"
                        class="col-12"
                        option-value="id"
                        option-label="desc"
                        dense
                        outlined
                        map-options
                        emit-value
                        v-model="usuario.fk_usuario_hierarquia"
                        label="Hierarquia"
                      />
                    </div>

                          <!-- Campo Login -->
                    <div :class="this.v_.login ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12'">
                      <q-input
                        class="col-12"
                        dense
                        outlined
                        v-model="usuario.login"
                        label="Login"
                      />
                    </div>

                  </div>
                </fieldset>

                    <!-- Dados para contato -->
                <fieldset class="col-12 no-border">
                  <legend>Dados para contato</legend>
                    <div class="q-col-gutter-sm row">

                        <!-- Campo do Email -->
                      <div :class="this.v_.email ? 'validar-error row col-12' : 'row col-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.email"
                          label="E-mail"
                        />
                      </div>

                        <!-- Campo do Telefone -->
                      <div :class="this.v_.telefone ? 'validar-error row col-md-6 col-sm-6 col-xs-12' : 'row col-md-6 col-sm-6 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          mask="(##) ####-####"
                          v-model="usuario.telefone"
                          label="Telefone"
                        />
                      </div>

                        <!-- Campo do Celular -->
                      <div :class="this.v_.celular ? 'validar-error row col-md-6 col-sm-6 col-xs-12' : 'row col-md-6 col-sm-6 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          mask="(##) #####-####"
                          v-model="usuario.celular"
                          label="Celular"
                        />
                      </div>

                    </div>

                  </fieldset>

                  <fieldset class="col-12 no-border">
                    <legend>Endereço</legend>

                    <div class="q-col-gutter-sm row">

                    <!-- Campo CEP -->
                      <div :class="this.v_.endereco.cep ? 'validar-error row col-md-2 col-sm-2 col-xs-12' : 'row col-md-2 col-sm-2 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          v-on:keyup.enter="buscarCEP"
                          outlined
                          mask="#####-###"
                          v-model="usuario.endereco.cep"
                          label="CEP"
                        />
                      </div>

                      <!-- Campo Logradouro -->
                      <div :class="this.v_.endereco.logradouro ? 'validar-error row col-md-8 col-sm-8 col-xs-12' : 'row col-md-8 col-sm-8 col-xs-12'">
                        <q-input
                          v-on:keyup.tab="buscarCEP"
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.logradouro"
                          label="Logradouro"
                        />
                      </div>

                      <!-- Campo Numero -->
                      <div :class="this.v_.endereco.numero ? 'validar-error row col-md-2 col-sm-2 col-xs-12' : 'row col-md-2 col-sm-2 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.numero"
                          label="Numero"
                        />
                      </div>

                      <!-- Campo Bairro -->
                      <div :class="this.v_.endereco.bairro ? 'validar-error row col-md-5 col-sm-5 col-xs-12' : 'row col-md-5 col-sm-5 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.bairro"
                          label="Bairro"
                        />
                      </div>

                      <!-- Campo Cidade -->
                      <div :class="this.v_.endereco.cidade ? 'validar-error row col-md-5 col-sm-5 col-xs-12' : 'row col-md-5 col-sm-5 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.cidade"
                          label="Cidade"
                        />
                      </div>

                      <!-- Campo UF -->
                      <div :class="this.v_.endereco.uf ? 'validar-error row col-md-2 col-sm-2 col-xs-12' : 'row col-md-2 col-sm-2 col-xs-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.uf"
                          label="UF"
                        />
                      </div>

                      <!-- Campo complemento -->
                      <div :class="this.v_.endereco.complemento ? 'validar-error row col-12' : 'row col-12'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.complemento"
                          label="Complemento"
                        />
                      </div>

                    </div>

                  </fieldset>

                  <div class="row col-md-6 col-sm-6 col-xs-12 ">
                    <q-btn label="Alterar" @click="alterarUsuario"  type="submit" color="primary" class="col-12"/>
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
import Usuario from '../../service/usuario/usuario.js'
import Hierarquia from '../../service/hierarquia/hierarquia.js'

export default {
  prop: {
    props: {}
  },
  data () {
    return {
      id: 0,
      opt_hierarquia: [],
      errors: [],
      v_: {
        id: false,
        nome: false,
        fk_usuario_hierarquia: false,
        rg: false,
        cpf: false,
        dt_nascimento: false,
        login: false,
        email: false,
        telefone: false,
        celular: false,
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
      usuario: {
        id: '',
        nome: '',
        ativo: true,
        rg: '',
        cpf: '',
        dt_nascimento: '',
        login: '',
        email: '',
        telefone: '',
        celular: '',
        fk_usuario_hierarquia: '',
        fk_usuario_empresa: 1,
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
          complemento: ''
        }
      },
      modalEdit: false,
      loadingUser: false,
      dados: false,
      filtroPesquisa: [],
      visibleColumns: ['id', 'nome', 'cpf', 'rg', 'aniversario', 'grupo', 'login', 'ativo'],
      filter: '',
      selected: [],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { required: true, name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
        { name: 'cpf', label: 'CPF', field: 'cpf', align: 'left', sortable: true },
        { name: 'rg', label: 'RG', field: 'rg', align: 'left', sortable: true },
        { name: 'aniversario', label: 'Aniversario', field: 'aniversario', align: 'left', sortable: true },
        { name: 'grupo', label: 'Grupo', field: 'grupo', align: 'left', sortable: true },
        { name: 'login', label: 'Login', field: 'login', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true },
        { name: 'email', label: 'E-mail', field: 'email', align: 'left', sortable: true },
        { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left', sortable: true },
        { name: 'celular', label: 'Celular', field: 'celular', align: 'left', sortable: true },
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
    this.buscarUsuarios()
    Hierarquia.buscar()
      .then((hierarquias) => {
        this.opt_hierarquia = hierarquias.data.response.map((h) => {
          return {
            id: h.id_hierarquia,
            desc: h.nome
          }
        })
      })
  },
  methods: {
    formartDate (date) {
      let dt = date.split('-')
      return `${dt[2]}-${dt[1]}-${dt[0]}`
    },
    isEmail (email) {
      let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
      return emailPattern.test(email)
    },
    deletar (user) {
      this.usuario.ativo = true
      this.usuario = user.row
      if (user.row.ativo === 'Ativo') {
        this.$q.dialog({
          title: 'Inativar',
          message: `Você deseja mesmo inativar o usúario ${user.row.login}?`,
          cancel: true,
          persistent: false
        }).onOk(() => {
          this.usuario.ativo = false
          this.usuario = user.row
        }).onCancel(() => {
        // console.log('>>>> Cancel')
        }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
        })
      } else {
        this.$q.dialog({
          title: 'Ativar',
          message: `Você deseja mesmo ativar o usúario ${user.row.login}?`,
          cancel: true,
          persistent: false
        }).onOk(() => {
          this.usuario.ativo = true
          this.usuario = user.row
        }).onCancel(() => {
        // console.log('>>>> Cancel')
        }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
        })
      }
    },
    alterarUsuario () {
      if (this.validarCampos()) {
        Usuario.modificar(this.usuario.id, this.usuario)
          .then((usuario) => {
            if (usuario.data.errors) {
              for (let i = 0; i < usuario.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: usuario.data.errors[i].message,
                  position: 'top-right',
                  icon: 'warning',
                  timeout: 1500,
                  actions: [{
                    color: 'white',
                    icon: 'close'
                  }]
                })
              }
            }
            if (usuario.data.status === 200) {
              this.$q.notify({
                color: 'positive',
                message: usuario.data.response,
                position: 'top-right',
                icon: 'thumb_up',
                timeout: 1500,
                actions: [{
                  color: 'white',
                  icon: 'close'
                }]
              })
              this.modalEdit = false
              this.buscarUsuarios()
            }
          })
          .catch(() => {
            this.$q.notify({
              color: 'positive',
              message: 'Ocorreu um erro inesperado, entre em contato com o suporte',
              position: 'top-right',
              icon: 'thumb_up'
            })
          })
      }
    },
    buscarUm (id) {
      Usuario.buscarUmUsuario(id)
        .then((user) => {
          this.usuario = user.data.response[0]
          this.usuario.dt_nascimento = this.formartDate(user.data.response[0].dt_nascimento)
          this.usuario.id = user.data.response[0].id_usuario
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
    openModalEdit (usuario) {
      this.falseValidate()
      this.modalEdit = !this.modalEdit
      this.buscarUm(usuario.row.id)
    },
    buscarUsuarios () {
      this.loadingUser = true
      Usuario.buscarUsuario()
        .then((usuario) => {
          if (usuario.data.errors) {
            for (let i = 0; i < usuario.data.errors.length; i++) {
              this.$q.notify({
                color: 'negative',
                message: usuario.data.errors[i].message,
                position: 'top-right',
                icon: 'warning',
                timeout: 1500,
                actions: [{
                  color: 'white',
                  icon: 'close'
                }]
              })
            }
          }
          if (usuario.data.status === 200) {
            this.dados = true
            this.data = usuario.data.response.map((u) => {
              return {
                id: u.id_usuario,
                nome: u.nome,
                cpf: u.cpf,
                rg: u.rg,
                aniversario: u.dt_nascimento,
                grupo: u.hierarquia.nome,
                email: u.email,
                telefone: u.telefone,
                celular: u.celular,
                login: u.login,
                ativo: u.ativo,
                cep: u.endereco.cep,
                logradouro: u.endereco.logradouro,
                complemento: u.endereco.complemento,
                bairro: u.endereco.bairro,
                numero: u.endereco.numero,
                cidade: u.endereco.cidade,
                uf: u.endereco.uf
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
            timeout: 1500,
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
            timeout: 1500,
            actions: [{
              color: 'white',
              icon: 'close'
            }]
          })
        })
        .finally(() => {
          this.loadingUser = false
        })
    },
    validarCampos () {
      this.errors = []
      // Verificando o Nome
      if (this.usuario.nome.length === 0) {
        this.errors.push({ msg: 'O campo nome é obrigátorio', campo: 'nome', erro: true })
        this.v_.nome = true
      } else {
        this.v_.nome = false
      }

      // Verificando o CPF
      if (this.usuario.cpf.length !== 14) {
        this.errors.push({ msg: 'O campo cpf é obrigátorio', campo: 'cpf', erro: true })
        this.v_.cpf = true
      } else {
        this.v_.cpf = false
      }

      // Verificando o RG
      if (this.usuario.rg.length !== 12) {
        this.errors.push({ msg: 'O campo rg é obrigátorio', campo: 'rg', erro: true })
        this.v_.rg = true
      } else {
        this.v_.rg = false
      }

      // Verificando a data de nascimento
      if (this.usuario.dt_nascimento.length !== 10) {
        this.errors.push({ msg: 'O campo data de nascimento é obrigátorio', campo: 'dt_nascimento', erro: true })
        this.v_.dt_nascimento = true
      } else {
        this.v_.dt_nascimento = false
      }

      // Verificando o fk_usuario_hierarquia
      if (this.usuario.fk_usuario_hierarquia === 0) {
        this.errors.push({ msg: 'O campo hierarquia é obrigátorio', campo: 'hierarquia', erro: true })
        this.v_.fk_usuario_hierarquia = true
      } else {
        this.v_.fk_usuario_hierarquia = false
      }

      // Verificando o login
      if (this.usuario.login.length === 0) {
        this.errors.push({ msg: 'O campo login é obrigátorio', campo: 'login', erro: true })
        this.v_.login = true
      } else {
        this.v_.login = false
      }

      // Verificando o email
      if (this.usuario.email.length === 0) {
        this.errors.push({ msg: 'O campo email é obrigátorio', campo: 'email', erro: true })
        this.v_.email = true
      } else if (!this.isEmail(this.usuario.email)) {
        this.errors.push({ msg: 'O email informado está inválido', campo: 'email', erro: true })
        this.v_.email = true
      } else {
        this.v_.email = false
      }

      // Verificando o email
      if (this.usuario.celular.length === 0) {
        this.errors.push({ msg: 'O campo celular é obrigátorio', campo: 'celular', erro: true })
        this.v_.celular = true
      } else {
        this.v_.celular = false
      }

      // Verificando CEP
      if (this.usuario.endereco.cep.length !== 9) {
        this.errors.push({ msg: 'O cep informado é inválido', campo: 'cep', erro: true })
        this.v_.endereco.cep = true
      } else {
        this.v_.endereco.cep = false
      }

      // Verificando logradouro
      if (this.usuario.endereco.logradouro.length === 0) {
        this.errors.push({ msg: 'O campo logradouro é obrigátorio', campo: 'logradouro', erro: true })
        this.v_.endereco.logradouro = true
      } else {
        this.v_.endereco.logradouro = false
      }

      // Verificando CEP
      if (this.usuario.endereco.numero.length === 0) {
        this.errors.push({ msg: 'O campo numero é obrigátorio', campo: 'numero', erro: true })
        this.v_.endereco.numero = true
      } else {
        this.v_.endereco.numero = false
      }

      // Verificando bairro
      if (this.usuario.endereco.bairro.length === 0) {
        this.errors.push({ msg: 'O campo bairro é obrigátorio', campo: 'bairro', erro: true })
        this.v_.endereco.bairro = true
      } else {
        this.v_.endereco.bairro = false
      }

      // Verificando cidade
      if (this.usuario.endereco.cidade.length === 0) {
        this.errors.push({ msg: 'O campo cidade é obrigátorio', campo: 'cidade', erro: true })
        this.v_.endereco.cidade = true
      } else {
        this.v_.endereco.cidade = false
      }

      // Verificando uf
      if (this.usuario.endereco.uf.length === 0) {
        this.errors.push({ msg: 'O campo uf é obrigátorio', campo: 'uf', erro: true })
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
            timeout: 1500,
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
    falseValidate () {
      this.v_.id = false
      this.v_.nome = false
      this.v_.fk_usuario_hierarquia = false
      this.v_.rg = false
      this.v_.cpf = false
      this.v_.dt_nascimento = false
      this.v_.login = false
      this.v_.email = false
      this.v_.telefone = false
      this.v_.celular = false
      this.v_.endereco.cep = false
      this.v_.endereco.logradouro = false
      this.v_.endereco.numero = false
      this.v_.endereco.bairro = false
      this.v_.endereco.cidade = false
      this.v_.endereco.uf = false
      this.v_.endereco.complemento = false
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
