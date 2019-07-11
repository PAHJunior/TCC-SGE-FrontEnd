<template>
  <q-page class="row q-pa-lg shadow-4 ">
    <div class="row co-12 q-gutter-md">
      <q-card class="col-md-2">
        <q-card-section>
          Dashboard
        </q-card-section>
      </q-card>
      <q-card class="col-md-9 ">
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style>

</style>
