<template>
<div class="vue-page">
  <div class="debug-info">
    <p>Всего пользователей: {{ usersStore.users.length }}</p>
    <p>Видимых пользователей: {{ visibleUsers.length }}</p>
    <input v-model="searchQuery" type="search" placeholder="Search...">
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
        <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.dob }}</td>
            <td>{{ user.fee }}</td>
            <td>{{ user.debt }}</td>
            <td @click="setSelectedId(user.id)" style="cursor: pointer;"> {{ user.notes ? 'true' : 'false' }}</td>
            <td>
              <select v-model="user.provider.id" @change="updateProvider(user)">
                <option v-for="prov in providers" :key="prov.id" :value="prov.id">
                  {{ prov.firstname }} {{ prov.surname }}
                </option>
               </select>
            </td>
            <td>{{ user.type_of_payment?.name || 'N/A' }}</td>
            <td>{{ user.date_pay }}</td>
            <td>{{ user.date_end_pay }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</div>
<PopUpWindow v-if="usersStore.entryID" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '../stores/usersStore.js'
import PopUpWindow from '@/components/PopUpWindow.vue'

const usersStore = useUsersStore()
const visibleCount = ref(50)
const listContainer = ref(null)
const searchQuery = ref("")

// поменять на бек
const providers = ref([
  { id: 5, firstname: "Mateo", surname: "Jones" },
  { id: 6, firstname: "Olivia", surname: "Brown" },
  { id: 7, firstname: "Liam", surname: "Davis" }
])

const updateProvider = (user) => {
  const selected = providers.value.find(p => p.id === user.provider.id)
  if (selected) {
    user.provider = selected
  }
}

const setSelectedId = (id) => {
  usersStore.entryID = id
}

const visibleUsers = computed(() => {
  return Array.isArray(usersStore.users) ? usersStore.users.slice(0, visibleCount.value) : []
})


const onScroll = () => {
  const el = listContainer.value
  if (!el) return
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    visibleCount.value += 50
  }
}

const filteredUsers = computed(() => {
  return visibleUsers.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  await usersStore.getUsers()
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
