<template>
  <div class="q-pa-md">
    <q-input
      outlined
      dense
      debounce="300"
      v-model="searchQuery"
      label="Search by name"
      class="q-mb-md"
    />
    <q-table
      title="Clients"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :server-side="true"
      @request="onRequest"
    >
      <template v-slot:body-cell-notes="props">
        <q-td :props="props" @click="openNoteDialog(props.row)" class="cursor-pointer text-primary">
          {{ props.row.notes ? 'true' : 'false' }}
        </q-td>
      </template>
      <template v-slot:body-cell-provider="props">
        <q-td :props="props">
          <q-select
            v-model="props.row.provider"
            :options="clientsStore.providers"
            :option-label="opt => opt.firstname + ' ' + opt.surname"
            option-value="id"
            emit-value
            map-options
            @update:model-value="val => updateData(props.row.id, 'provider', val)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-dob="props">
        <q-td :props="props">
          <q-input
            v-model="props.row.dob"
            type="date"
            @update:model-value="val => updateData(props.row.id, 'dob', val)"
            outlined
            dense
          />
        </q-td>
      </template>
      <template v-slot:body-cell-date_pay="props">
        <q-td :props="props">
          <q-input
            v-model="props.row.date_pay"
            type="date"
            @update:model-value="val => updateData(props.row.id, 'date_pay', val)"
            outlined
            dense
          />
        </q-td>
      </template>
      <template v-slot:body-cell-date_end_pay="props">
        <q-td :props="props">
          <q-input
            v-model="props.row.date_end_pay"
            type="date"
            @update:model-value="val => updateData(props.row.id, 'date_end_pay', val)"
            outlined
            dense
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="noteDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Note</div>
        </q-card-section>

        <q-card-section>
          <q-input
            type="textarea"
            v-model="currentNote"
            label="Note"
            autogrow
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveNote" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { useClientsStore } from '../stores/clientsStore.js'

const clientsStore = useClientsStore()

const searchQuery = ref('')

const filteredRows = computed(() => {
  if (!searchQuery.value) return clientsStore.clientsPaging
  return clientsStore.clientsPaging.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'surname', label: 'Surname', field: 'surname', align: 'left' },
  { name: 'dob', label: 'Dob', field: 'dob', align: 'left' },
  { name: 'fee', label: 'Fee', field: 'fee', align: 'left' },
  { name: 'debt', label: 'Debt', field: 'debt', align: 'left' },
  { name: 'notes', label: 'Notes', field: 'notes', align: 'left' },
  { name: 'provider', label: 'Provider', field: row => row.provider ? `${row.provider.firstname} ${row.provider.surname}` : 'N/A', align: 'left'  },
  { name: 'type_of_payment', label: 'Payment Type', field: row => row.type_of_payment ? row.type_of_payment.name : 'N/A', align: 'left' },
  { name: 'date_pay', label: 'datePay', field: 'date_pay', align: 'left' },
  { name: 'date_end_pay', label: 'dateEndPay', field: 'date_end_pay', align: 'left' },
]

const noteDialog = ref(false)
const currentNote = ref('')
const currentRow = ref(null)


const pagination = ref({
  page: 1,
  rowsPerPage: 10
})

async function onRequest(props) {
  const { page, rowsPerPage } = props.pagination
  const offset = (page - 1) * rowsPerPage
  const response = await clientsStore.getClientsPage(rowsPerPage, offset)

  pagination.value = {
    ...pagination.value,
    page,
    rowsPerPage,
    rowsNumber: response.count
  }
}
function openNoteDialog(row) {
  currentRow.value = row
  currentNote.value = row.notes || ''
  noteDialog.value = true
}

async function saveNote() {
  await clientsStore.updateField(currentRow.value.id, 'notes', currentNote.value)
  const index = clientsStore.clientsPaging.findIndex(c => c.id === currentRow.value.id)
  if (index !== -1) {
    clientsStore.clientsPaging[index] = {
      ...clientsStore.clientsPaging[index],
      notes: currentNote.value
    } 
  }
  noteDialog.value = false
}

function updateData(clientId, field, value) {
  clientsStore.updateField(clientId, field, value)
}

onMounted(() => {
  onRequest({ pagination: pagination.value })
  clientsStore.getProviders()
})
</script>

<style scoped>
</style>