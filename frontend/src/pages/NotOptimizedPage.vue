<template>
  <div class="vue-page">
    <div class="vue-table-container">
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
          <tr v-for="client in clientsStore.clientsPaging" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.surname }}</td>
            <td>{{ client.dob }}</td>
            <td>{{ client.fee }}</td>
            <td>{{ client.debt }}</td>
            <td>{{ client.notes }}</td>
            <td>{{ client.provider }}</td>
            <td>{{ client.type_of_payment }}</td>
            <td>
                <q-input
                  v-model="client.date_pay"
                  type="date"
                />
              </td>
              <td>
                <q-input
                  v-model="client.date_end_pay"
                  type="date"
                />
              </td>
            </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useClientsStore } from '../stores/clientsStore.js'

const clientsStore = useClientsStore()

onMounted(() => {
  clientsStore.getClientsPage(1000, 0)
})
</script>

<style scoped>
.vue-page {
  padding: 10px;
}

.vue-table-container {
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