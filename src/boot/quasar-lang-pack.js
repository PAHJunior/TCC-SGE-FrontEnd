// import something here
import { Quasar } from 'quasar'

// "async" is optional
export default async () => {
  const langIso = 'de' // ... some logic to determine it (use Cookies Plugin?)

  try {
    await import(`quasar/lang/${langIso}`)
      .then(lang => {
        Quasar.lang.set(lang.default)
      })
  } catch (err) {

  }
}
