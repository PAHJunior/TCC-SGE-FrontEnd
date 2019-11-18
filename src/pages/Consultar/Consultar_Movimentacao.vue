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
                <q-breadcrumbs-el icon="fas fa-box" to="/cadastro_movimentacao"  label="Cadastro de movimentações" />
                <q-breadcrumbs-el icon="fas fa-search" to="/consultar_movimentacao"  label="Consultar movimentações" />

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
                        <q-btn :icon="dados ? 'refresh' : 'search'" @click="dados = !dados" flat dense round/>
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
                    </q-td>
                    <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                    <q-td key="cpf" :props="props">{{ props.row.cpf }}</q-td>
                    <q-td key="rg" :props="props">{{ props.row.rg }}</q-td>
                    <q-td key="aniversario" :props="props">{{ props.row.aniversario }}</q-td>
                    <q-td key="grupo" :props="props">{{ props.row.grupo }}</q-td>
                  </q-tr>
                </template>

              </q-table>
            </div>

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
      dados: false,
      filtroPesquisa: [],
      filter: '',
      selected: [],
      visibleColumns: ['id', 'nome', 'cpf', 'rg', 'aniversario', 'grupo'],
      separator: 'horizontal',
      data: [
        { id: '1', nome: 'Paulo Arhur', cpf: '460.224.398-33', rg: '19.406.953-9', aniversario: '20/04/1999', grupo: 'admin' },
        { id: '2', nome: 'Polyana Feitosa', cpf: '779.636.080-09', rg: '19.251.981-5', aniversario: '20/07/2000', grupo: 'admin' },
        { id: '3', nome: 'Natalia Pires', cpf: '919.310.680-70', rg: '27.238.588-8', aniversario: '14/08/1999', grupo: 'admin' }
      ],
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
        { name: 'estado', label: 'UF', field: 'estado', align: 'left', sortable: true },
        { name: 'complemento', label: 'Complemento', field: 'complemento', align: 'left', sortable: true }
      ]
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
