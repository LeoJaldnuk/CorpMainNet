<template>
  <div>
    <router-link :to="{ name: 'home' }">Home | </router-link>
    <router-link :to="{ name: 'con-tek-comp' }">ConTek Job Calculator</router-link>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style>

</style>