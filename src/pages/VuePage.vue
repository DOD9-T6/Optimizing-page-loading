<template>
<div class="vue-page">
  <div class="debug-info">
    <p>Всего пользователей: {{ userStore.users.length }}</p>
    <p>Видимых пользователей: {{ visibleUsers.length }}</p>
    <button @click="userStore.clearUsers()">Очистить</button>
    <button @click="userStore.generateUsers(true)">Перегенерировать</button>
  </div>
  
  <div class="vue-table-container" ref="listContainer" @scroll="onScroll">
    <table class="vue-table" border="2">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>surname</th>
          <th>dob</th>
          <th>fee</th>
          <th>debt</th>
          <th>notes</th>
          <th>provider</th>
          <th>typeOfPayment</th>
          <th>datePay</th>
          <th>dateEndPay</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in visibleUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.dob }}</td>
            <td>{{ user.fee }}</td>
            <td>{{ user.debt }}</td>
            <td>{{ user.notes }}</td>
            <td>{{ user.provider?.firstName || 'N/A' }}</td>
            <td>{{ user.typeOfPayment?.name || 'N/A' }}</td>
            <td>{{ user.datePay }}</td>
            <td>{{ user.dateEndPay }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '../stores/userStore.js'

const userStore = useUsersStore()
const visibleCount = ref(50)
const visibleUsers = computed(() => userStore.users.slice(0, visibleCount.value))
const listContainer = ref(null)

const onScroll = () => {
  const el = listContainer.value
  if (!el) return
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    visibleCount.value += 50
  }
}


onMounted(() => {
  userStore.generateUsers()
  console.log('Store после монтирования:', userStore.users.length)
})
</script>

<style scoped>
.vue-page {
  padding: 10px;
}

.debug-info {
  margin-bottom: 20px;
  padding: 5px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.debug-info button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.debug-info button:hover {
  background-color: #0056b3;
}

.vue-table-container {
  height: 800px;
  overflow-y: auto;
  margin-top: 20px;
}

.vue-table {
  width: 100%;
  border-collapse: collapse;
}

.vue-table th,
.vue-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.vue-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
