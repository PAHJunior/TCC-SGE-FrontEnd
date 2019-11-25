<template>
  <q-page class="q-pa-lg  shadow-4 ">

    <div class="row">

      <div class="col">

        <div class="row q-col-gutter-md">

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
                <q-breadcrumbs-el icon="dashboard" to="/dashboard"  label="Dashboard" />

              </q-breadcrumbs>

            </q-card>

          </div>

          <!-- Selecionar Estoque -->
          <div class="col-md-6 col-sm-6 col-xs-12 row">

            <q-card class="col-12">
              <q-card-section class="text-center">
                <span class="text-weight-medium text-h5">Selecionar Estoque</span>
                <q-select
                  outlined
                  v-model="home.estoque"
                  dense
                  options-dense
                  :options="estoqueOpt"
                  option-value="id"
                  option-label="desc"
                  map-options
                  emit-value
                  >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum estoque encontrado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
            </q-card>

          </div>
          <!-- Selecionar Produto -->
          <div class="col-md-6 col-sm-6 col-xs-12 row">

            <q-card class="col-12">
              <q-card-section class="text-center">
                <span class="text-weight-medium text-h5">Selecionar Produto</span>
                <q-select
                  outlined
                  v-model="home.produto"
                  option-value="id"
                  option-label="desc"
                  map-options
                  emit-value
                  dense
                  options-dense
                  :options="produtoOpt">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum produto encontrado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
            </q-card>

          </div>

          <!-- Total de Entrada do estoque -->
          <div class="col-md-4 col-sm-4 col-xs-12 row">

            <q-card class="col-12">
              <q-card-section class="text-center">
                <span class="text-weight-medium text-green-5 text-h5">Entrada</span>

                <br/>

                <span class="text-h6"> {{ this.entrada }} </span>
              </q-card-section>
            </q-card>

          </div>

          <!-- Total de Saída do estoque -->
          <div class="col-md-4 col-sm-4 col-xs-12 row">

            <q-card class="col-12">
              <q-card-section class="text-center">
                <span class="text-weight-medium text-red-5 text-h5">Saída</span>

                <br/>

                <span class="text-h6"> {{ this.saida }} </span>
              </q-card-section>
            </q-card>

          </div>

          <!-- Grafico da quantidade de cada produto em estoque -->
          <div class="col-md-4 col-sm-4 col-xs-12 row">

            <q-card class="col-12">
              <q-card-section class="text-center">
                <span class="text-h5 text-weight-medium">Total Estoque</span>

                <br/>

                <span class="text-h6">{{ this.entrada - this.saida }}</span>
              </q-card-section>
            </q-card>

          </div>

          <!-- Movimentação do estoque -->
          <div class="col-12 row">

            <q-card class="col-12">
              <!-- <div class="row">
                <q-select class="col-4" dense borderless :options="year" v-model="yearGrafico">
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-select>
              </div> -->
              <q-card-section>
                <apexchart type=bar height=350 :options="chartOptionsBarra" :series="seriesBarra" />
              </q-card-section>
            </q-card>

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import ApexCharts from 'apexcharts' // Gráfico
import VueApexCharts from 'vue-apexcharts'
import Estoque from '../service/estoque/estoque.js'
import Produto from '../service/produto/produto.js'

export default {
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      estoqueOpt: [],
      produtoOpt: [],
      home: {
        estoque: '',
        produto: ''
      },
      entrada: 500,
      saida: 348,
      valorEstoque: '100.000.00',
      seriesBarra: [{
        name: 'Entrada',
        data: [10, 31, 40, 101, 50, 36, 32, 23, 24, 15, 34, 32]
      },
      {
        name: 'Saída',
        data: [6, 25, 32, 81, 40, 30, 27, 21, 18, 13, 23, 21]
      }],
      chartOptionsBarra: {
        colors: [ '#1f6289', '#c91010' ],
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: [ '#304758' ]
          }
        },
        xaxis: {
          categories: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
          position: 'top',
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + '%'
            }
          }
        },
        title: {
          text: 'Grafico - Movimentação do estoque - 2019',
          style: {
            fontSize: '18px',
            color: '#444'
          }
        }
      }
    }
  },
  computed: {

  },
  mounted () {
    Estoque.buscarEstoqueAtivo()
      .then((estoque) => {
        this.estoqueOpt = estoque.data.response.map((e) => {
          return {
            id: e.id_estoque,
            desc: e.nome_estoque
          }
        })
      })
  },
  watch: {
    'home.estoque': function (val) {
      this.produtoOpt = []
      Produto.buscarProdEstoque(val)
        .then((produto) => {
          this.produtoOpt = produto.data.response.map((produto) => {
            return {
              id: produto.id_produto,
              desc: produto.nome_produto
            }
          })
        })
    }
  }
}
</script>

<style>

</style>
