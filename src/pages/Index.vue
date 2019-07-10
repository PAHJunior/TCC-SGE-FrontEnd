<template>
  <q-page class="row q-pa-xl">

    <div class="row col-12 flex flex-center">
      <p class="text-blue text-h5">O QUE MUDA DO LOGIN TCC PARA LOGIN RAOTES É O PARAMETRO PASSADO NA URL, OU SEJA CADA CLIENTE TERA UM LINK PARA LOGIN</p>
    </div>
    <div class="row col-12 flex flex-center">
      <div class="col-4 row">
        <q-btn label="ir para dashboard" class="col-12" to="/dashboard" />
      </div>
      <div class="col-4 row">
        <q-btn label="ir para login tcc" class="col-12" to="/login/tcc" />
      </div>
      <div class="col-4  row">
        <q-btn label="ir para login raotes" class="col-12" to="/login/raotes " />
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
