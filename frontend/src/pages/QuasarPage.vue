<template>
  <div>{{clientsStore.clients}}</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useClientsStore } from '../stores/clientsStore.js'

const clientsStore = useClientsStore()

onMounted(()=> {
  clientsStore.getProviders()
  clientsStore.getClients()
})
</script>
