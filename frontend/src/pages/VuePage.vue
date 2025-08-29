<template>
<div class="vue-page">
<div class="debug-info">
    <p>Всего пользователей: {{ clientsStore.clients.length }}</p>
    <p>Видимых пользователей: {{ visibleCount }}</p>
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
          <tr v-for="client in filteredUsers" :key="client.id">
              <td>{{ client.id }}</td>
              <td>{{ client.name }}</td>
              <td>{{ client.surname }}</td>
              <td>
                <q-input
                  v-model="client.dob"
                  type="date"
                  outlined
                  dense
                  @update:model-value="val => updateData(client.id, 'dob', val)"
                />
              </td>
              <td>{{ client.fee }}</td>
              <td>{{ client.debt }}</td>
              <td @click="setSelectedId(client.id)" style="cursor: pointer;"> {{ client.notes ? 'true' : 'false' }}</td>
              <td>
                <select v-model="client.provider.id" @change="updateData(client.id, 'provider', client.provider.id)">
                  <option v-for="prov in clientsStore.providers" :key="prov.id" :value="prov.id">
                    {{ prov.firstname }} {{ prov.surname }}
                  </option>
                 </select>
              </td>
              <td>{{ client.type_of_payment?.name || 'N/A' }}</td>
              <td>
                <q-input
                  v-model="client.date_pay"
                  type="date"
                  outlined
                  dense
                  @update:model-value="val => updateData(client.id, 'date_pay', val)"
                />
              </td>
              <td>
                <q-input
                  v-model="client.date_end_pay"
                  type="date"
                  outlined
                  dense
                  @update:model-value="val => updateData(client.id, 'date_end_pay', val)"
                />
              </td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
<PopUpWindow v-if="clientsStore.entryID" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useClientsStore } from '../stores/clientsStore.js'
import PopUpWindow from '@/components/VueUi/PopUpWindow.vue'


const clientsStore = useClientsStore()

const visibleCount = ref(50)
const listContainer = ref(null)

const visibleUsers = computed(() => {
  return Array.isArray(clientsStore.clients) ? clientsStore.clients.slice(0, visibleCount.value) : []
})

const onScroll = () => {
  const el = listContainer.value
  if (!el) return
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    visibleCount.value += 50
  }
}

const searchQuery = ref("")

const setSelectedId = (id) => {
  clientsStore.entryID = id
}

const filteredUsers = computed(() => {
  return visibleUsers.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const updateData = async (clientId, field, value) => {
  try {
    await clientsStore.updateField(clientId, field, value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  clientsStore.getClients()
  clientsStore.getProviders()
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
