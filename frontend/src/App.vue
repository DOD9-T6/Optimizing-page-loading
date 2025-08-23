<template>
  <AppHeader />
  <div class='main-container'>
    <router-view />
  </div>
</template> 

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style> 
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
