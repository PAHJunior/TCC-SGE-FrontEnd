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
                <q-breadcrumbs-el icon="img:statics/settings.png" to="/cadastro_usuario"  label="Configurações" />
                <q-breadcrumbs-el icon="fas fa-search" to="/cadastro_estoque"  label="Alterar senha" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 q-gutter-y-md row">

            <!-- Cabeçalho -->
            <q-card class="col-12 ">
              <q-card-section class=" q-col-gutter-sm text-center items-end">
                <div class="row col-12 justify-center q-gutter-x-xs q-gutter-y-xs">

                  <div class="col-md-3 col-sm-12 col-xs-12">

                    <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                      <template v-slot:prepend>
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="buscarUsuarios" flat dense round/>
                      </template>
                    </q-input>

                  </div>

                  <q-space />

                  <div class="col-md-3 col-sm-12 col-xs-12">

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
                    <q-td key="login" :props="props">{{ props.row.login }}</q-td>
                    <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
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

                    <!-- Campo Senha -->
                    <div :class="this.v_.senha ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12'">
                      <q-input
                        class="col-12"
                        dense
                        outlined
                        :type="isPwd ? 'password' : 'text'"
                        v-model="usuario.senha"
                        label="Senha"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </div>

                    <!-- Campo confirmar senha -->
                    <div :class="this.v_.csenha ? 'validar-error row col-md-4 col-sm-4 col-xs-12' : 'row col-md-4 col-sm-4 col-xs-12'">
                      <q-input
                        class="col-12"
                        dense
                        :type="isConfirmPwd ? 'password' : 'text'"
                        outlined
                        v-model="usuario.csenha"
                        label="Confirmar senha"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isConfirmPwd = !isConfirmPwd"
                          />
                        </template>
                      </q-input>
                    </div>

                  </div>
                </fieldset>

                  <div class="row col-md-6 col-sm-6 col-xs-12 ">
                    <q-btn label="Alterar" @click="alterarSenha"  type="submit" color="primary" class="col-12"/>
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
      isPwd: true,
      isConfirmPwd: true,
      id: 0,
      opt_hierarquia: [],
      errors: [],
      v_: {
        id: false,
        nome: false,
        login: false,
        senha: false,
        csenha: false
      },
      usuario: {
        id: '',
        nome: '',
        ativo: true,
        login: '',
        senha: '',
        csenha: ''
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
        { name: 'login', label: 'Login', field: 'login', align: 'left', sortable: true },
        { name: 'ativo', label: 'Status', field: 'ativo', align: 'left', sortable: true }
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
    alterarSenha () {
      if (this.validarCampos()) {
        Usuario.modSenha(this.usuario.id, this.usuario)
          .then((usuario) => {
            if (usuario.data.errors) {
              for (let i = 0; i < usuario.data.errors.length; i++) {
                this.$q.notify({
                  color: 'negative',
                  message: usuario.data.errors.errors[0].message,
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
              color: 'negative',
              message: 'Ocorreu um erro inesperado, entre em contato com o suporte',
              position: 'top-right',
              icon: 'warning'
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
                ativo: u.ativo,
                nome: u.nome,
                login: u.login
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

      // Verificando o login
      if (this.usuario.login.length === 0) {
        this.errors.push({ msg: 'O campo login é obrigátorio', campo: 'login', erro: true })
        this.v_.login = true
      } else {
        this.v_.login = false
      }

      // Verificando o senha
      if ((this.usuario.senha === undefined) || (this.usuario.senha.length === 0)) {
        this.errors.push({ msg: 'O campo senha é obrigátorio', campo: 'senha', erro: true })
        this.v_.senha = true
      }
      if ((this.usuario.senha.length < 5) || (this.usuario.senha.length > 45)) {
        this.errors.push({ msg: 'Sua senha deverá conter no mínimo 5 e no maximo 45 caracteres', campo: 'senha', erro: true })
        this.v_.senha = true
      } else {
        this.v_.senha = false
      }

      // confirmando a senha
      if (this.usuario.senha !== this.usuario.csenha) {
        this.errors.push({ msg: 'Senhas diferentes', campo: 'csenha', erro: true })
        this.v_.csenha = true
      } else {
        this.v_.csenha = false
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
      this.v_.login = false
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
