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
                <q-breadcrumbs-el icon="fas fa-search" to="/cadastro_estoque"  label="Buscar usúario" />

              </q-breadcrumbs>

            </q-card>
          </div>

          <!-- Formulario usuario -->
          <div class="col-md-12 col-sm-12 col-xs-12 row">

            <div class="col-12">

              <q-table
                :data="data"
                :columns="columns"
                :separator="separator"
                row-key="name"/>

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
      separator: 'horizontal',
      data: [
        { name: '1', login: 'Paulo', email: 'pahjunior@outlook.com', create: '20/07/2019' },
        { name: '2', login: 'Polyana', email: 'polyana@outlook.com', create: '24/07/2019' },
        { name: '3', login: 'Natalia', email: 'natalia@gmail.com', create: '25/07/2019' }
      ],
      columns: [{
        name: 'login',
        required: true,
        label: 'Login',
        field: 'login',
        align: 'left',
        sortable: true
      },
      { name: 'email', label: 'Login', field: 'email', align: 'left', sortable: true },
      { name: 'create', label: 'Data de criação', field: 'create', align: 'left', sortable: true }
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
