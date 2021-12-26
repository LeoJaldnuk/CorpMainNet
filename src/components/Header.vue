<template>
  <div>
    <router-link :to="{ name: 'home' }">Home | </router-link>
    <router-link :to="{ name: 'con-tek-calc' }">ConTek Job Calculator</router-link>
  </div>
</template>

<script>
export default {
  name: 'the-header'
}
</script>

<style>

</style>