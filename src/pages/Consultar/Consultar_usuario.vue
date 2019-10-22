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

                  <div class="row justify-between col-md-5 ">

                  </div>

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
                  <q-btn
                    flat round dense
                    :icon="dadosProps.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="dadosProps.toggleFullscreen"
                    class="q-ml-md"
                  />
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

                <template v-slot:top="props">

                  <div v-show="false">
                    {{ dadosProps = props }}
                  </div>

                  <q-space />
                  <div v-show="props.inFullscreen">
                    <q-btn
                      flat round dense
                      :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                      @click="props.toggleFullscreen"
                    />
                  </div>

                </template>

                <!-- Corpo da tabela -->
                <template v-slot:body="props">
                  <q-tr :props="props" >
                    <q-td auto-width>
                      <!-- <q-btn dense icon="edit" flat round @click="props.selected = !props.selected"/> -->
                      <q-btn dense icon="edit" flat round @click="editar(props)"/>
                      <q-btn dense icon="delete" color="red-8" flat round />
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
                    <q-td key="status" :props="props">{{ props.row.ativo }}</q-td>
                  </q-tr>
                </template>

              </q-table>
            </div>

          </div>

        </div>
      </div>
    </div>
    <q-dialog v-model="modal">
      <q-card class="col-12 ">
        <q-card-section class=" q-col-gutter-sm text-center items-end">
          <q-form>
            <div class="row">
              <div class="col">
                <div class="q-gutter-y-md row justify-center">

                  <fieldset class="col-12 no-border">

                  <legend>Dados cadastrais</legend>

                  <div class="q-col-gutter-sm row items-start">

                    <div :class="this.v_.id ? 'validar-error row col-md-1' : 'row col-md-1' ">
                      <q-input
                        class=" col-md-12"
                        dense
                        outlined
                        v-model="usuario.id"
                        label="ID"
                        disable
                      />
                    </div>

                    <!-- nom completo -->
                    <div :class="this.v_.nome ? 'validar-error row col-md-9' : 'row col-md-9' ">
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
                    <div class="col-md-2">
                      <q-checkbox
                        class="float-right"
                        left-label
                        v-model="usuario.ativo"
                        label="Status do usúario"/>
                    </div>

                    <!-- Campo do CPF -->
                    <div :class="this.v_.cpf ? 'validar-error row col-md-3' : 'row col-md-3'">
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
                    <div :class="this.v_.rg ? 'validar-error row col-md-3': 'row col-md-3'">
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
                    <div :class="this.v_.dt_nascimento ? 'validar-error row col-md-3' : 'row col-md-3'">
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
                    <div :class="this.v_.fk_usuario_hierarquia ? 'validar-error row col-md-3': 'row col-md-3'">
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
                    <div :class="this.v_.login ? 'validar-error row col-md-4' : 'row col-md-4'">
                      <q-input
                        class="col-12"
                        dense
                        outlined
                        v-model="usuario.login"
                        label="Login"
                      />
                    </div>

                          <!-- Campo Senha -->
                    <div :class="this.v_.senha ? 'validar-error row col-md-4' : 'row col-md-4'">
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

                    <!-- Campo Confirmar Senha -->
                    <div :class="this.v_.confirmarSenha ? 'validar-error row col-md-4' : 'row col-md-4'">
                      <q-input
                        class="col-12"
                        dense
                        outlined
                        :type="isConfirmPwd ? 'password' : 'text'"
                        v-model="usuario.confirmarSenha"
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

                    <!-- Dados para contato -->
                <fieldset class="col-12 no-border">
                  <legend>Dados para contato</legend>
                    <div class="q-col-gutter-sm row">

                        <!-- Campo do Telefone -->
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
                      <div :class="this.v_.telefone ? 'validar-error row col-md-6' : 'row col-md-6'">
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
                      <div :class="this.v_.celular ? 'validar-error row col-md-6' : 'row col-md-6'">
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
                      <div :class="this.v_.endereco.cep ? 'validar-error row col-md-2' : 'row col-md-2'">
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
                      <div :class="this.v_.endereco.logradouro ? 'validar-error row col-md-8' : 'row col-md-8'">
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
                      <div :class="this.v_.endereco.numero ? 'validar-error row col-md-2' : 'row col-md-2'">
                        <q-input
                          class="col-md-12"
                          dense
                          outlined
                          v-model="usuario.endereco.numero"
                          label="Numero"
                        />
                      </div>

                      <!-- Campo Bairro -->
                      <div :class="this.v_.endereco.bairro ? 'validar-error row col-md-5' : 'row col-md-5'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.bairro"
                          label="Bairro"
                        />
                      </div>

                      <!-- Campo Cidade -->
                      <div :class="this.v_.endereco.cidade ? 'validar-error row col-md-5' : 'row col-md-5'">
                        <q-input
                          class="col-12"
                          dense
                          outlined
                          v-model="usuario.endereco.cidade"
                          label="Cidade"
                        />
                      </div>

                      <!-- Campo UF -->
                      <div :class="this.v_.endereco.uf ? 'validar-error row col-md-2' : 'row col-md-2'">
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

                  <div class="row col-md-6 ">
                    <q-btn label="Alterar" @click="cadastrarUsuario"  type="submit" color="primary" class="col-12"/>
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
      opt_hierarquia: [],
      v_: {
        id: false,
        nome: false,
        fk_usuario_hierarquia: false,
        rg: false,
        cpf: false,
        dt_nascimento: false,
        login: false,
        senha: false,
        confirmarSenha: false,
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
        senha: '',
        confirmarSenha: '',
        email: '',
        telefone: '',
        celular: '',
        fk_usuario_hierarquia: 1,
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
      modal: false,
      dadosProps: [],
      loadingUser: false,
      dados: false,
      filtroPesquisa: [],
      visibleColumns: ['id', 'nome', 'cpf', 'rg', 'aniversario', 'grupo', 'status'],
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
        { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
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
    editar (item) {
      this.modal = !this.modal
      this.selected = { ...item }
      Usuario.buscarUmUsuario(item.row.id)
        .then((user) => {
          this.usuario = user.data.response[0]
          this.usuario.id = user.data.response[0].id_usuario
        })
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
                timeout: 2000,
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
                cep: u.endereco.cep,
                ativo: u.ativo ? 'Ativo' : 'Inativo',
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
          this.loadingUser = false
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
