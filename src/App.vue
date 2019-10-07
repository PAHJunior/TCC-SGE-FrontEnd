<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    background-color: #eaeff5
  }
  .validar-error .q-field--outlined .q-field__control:before {
    border: 1px solid #C10015;
  }
</style>
