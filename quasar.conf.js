// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'ionicons-v4',
      'mdi-v3',
      'fontawesome-v5',
      'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      lang: 'pt-br', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QBtnDropdown',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCheckbox',
        'QForm',
        'QInput',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QImg',
        'QSpace',
        'QExpansionItem',
        'QScrollArea',
        'QDate',
        'QToggle',
        'QPopupProxy',
        'QMenu',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QSelect',
        'QForm',
        'QUploader',
        'QStepper',
        'QStep',
        'QSeparator',
        'QStepperNavigation',
        'QTree',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QBanner',
        'QDialog',
        'QBadge',
        'QChip',
        'QAvatar'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog'
      ]
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      env: ctx.dev ? {
        VERSAO: JSON.stringify(require('./package.json').version),
        API: JSON.stringify('http://localhost:3000/api'),
        APIREPORT: JSON.stringify('http://localhost:5488/api/report')
      } : {
        VERSAO: JSON.stringify(require('./package.json').version),
        API: JSON.stringify('https://api-sge.herokuapp.com/api'),
        APIREPORT: JSON.stringify('http://localhost:5488/api/report')
      },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'TCC SGE',
        // short_name: 'TCC SGE',
        // description: 'Trabalho de conclusão de curso - SISTEMA DE GERENCIAMENTO DE ESTOQUE - ETEC de Embu - curso: desenvolvimento de sistemas -  \n Integrantes \n Paulo Arthur \n Natalia Pires \n Polyana Feitosa',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          'src': 'statics/icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'tcc_sge'
      }
    }
  }
}
