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

                    <div class="">
                      <q-checkbox  color="primary" left-label label="Ativos" v-model="filtroPesquisa" val="ativos" />
                    </div>

                    <q-btn icon="person_add" flat round dense @click="teste()"/>

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
                </div>
              </q-card-section>
            </q-card>

            <div class="col-12">

              <q-table
                :filter="filter"
                :data="dados ? data : na"
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
                      <q-btn dense icon="edit" flat round @click="props.selected = !props.selected"/>
                      <q-btn dense icon="delete" color="red-8" flat round />
                    </q-td>
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
                  </q-tr>
                </template>

              </q-table>
              <!-- <div class="q-mt-md">
                Usuario Selecionado: {{ JSON.stringify(selected) }}
              </div>
              <div class="q-mt-md">
                Filtro pesquisa: {{filtroPesquisa}}
              </div> -->
            </div>

          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Usuario from '../../service/usuario/usuario.js'

export default {
  data () {
    return {
      dados: false,
      filtroPesquisa: [],
      visibleColumns: ['id', 'nome', 'cpf', 'rg', 'aniversario', 'grupo'],
      filter: '',
      selected: [],
      separator: 'horizontal',
      data: [],
      columns: [
        { required: true, name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
        { name: 'cpf', label: 'CPF', field: 'cpf', align: 'left', sortable: true },
        { name: 'rg', label: 'RG', field: 'rg', align: 'left', sortable: true },
        { name: 'aniversario', label: 'Aniversario', field: 'aniversario', align: 'left', sortable: true },
        { name: 'grupo', label: 'Grupo', field: 'grupo', align: 'left', sortable: true },
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
  methods: {
    buscarUsuarios () {
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
    },
    teste () {
      this.$router.push('/cadastro_usuario')
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
