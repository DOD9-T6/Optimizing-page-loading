<template>
  <div>
    <DxDataGrid
      :data-source="clientsStore.clients"
      key-expr="id"
      :show-borders="true"
      :repaint-changes-only="true"
      :editing="{
        mode: 'row',
        allowUpdating: true
      }"
      @row-updated="onRowUpdated"
    >
      <DxEditing
        :allow-updating="true"
        :allow-adding="false"
        mode="cell"
      />
      <DxSearchPanel
        :visible="true"
        :highlight-case-sensitive="false"
        placeholder="Search..."
      />
      <DxColumn data-field="id" caption="ID" />
      <DxColumn data-field="name" caption="Name" />
      <DxColumn data-field="surname" caption="Surname" />
      <DxColumn 
        data-field="dob" 
        caption="dob" 
        data-type="date"
        format="dd.MM.yyyy"
      />
      <DxColumn data-field="fee" caption="fee" />
      <DxColumn data-field="debt" caption="debt" />
      <DxColumn data-field="notes" caption="notes" :cell-template="notesCell" />
      

      <DxColumn
      data-field="provider.id"
      caption="Провайдер"
      >
      <DxLookup
        :data-source="clientsStore.providers"
        value-expr="id"
        :display-expr="(item) => `${item.firstname} ${item.surname}`"
      />
      </DxColumn>

      <DxColumn data-field="type_of_payment.name" caption="type_of_payment" />
      <DxColumn 
        data-field="date_pay" 
        caption="date_pay" 
        data-type="date"
        format="dd.MM.yyyy"
      />
      <DxColumn 
        data-field="date_end_pay" 
        caption="date_end_pay" 
        data-type="date"
        format="dd.MM.yyyy"
      />

      <DxPager
        :allowed-page-sizes="[5, 10, 20]"
        show-page-size-selector="true"
        show-info="true"
      />
    </DxDataGrid>

    <DxPopup
      v-model:visible="popupVisible"
      :width="400"
      :height="300"
      :show-title="true"
      title="Редактировать заметку"
    >
      <div class="note-popup">
        <textarea 
          v-model="currentNote" 
          placeholder="Введите заметку"
          class="note-textarea"
        ></textarea>
        <div class="note-buttons">
          <button @click="saveNote" class="btn btn-primary">Сохранить</button>
          <button @click="popupVisible = false" class="btn btn-secondary">Отмена</button>
        </div>
      </div>
    </DxPopup>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DxDataGrid, { DxLookup, DxColumn, DxPager, DxEditing, DxSearchPanel } from 'devextreme-vue/data-grid'
import { DxPopup } from 'devextreme-vue/popup'
import { useClientsStore } from '../stores/clientsStore.js'

const popupVisible = ref(false)
const selectedClient = ref(null)
const currentNote = ref("")

const clientsStore = useClientsStore()

const onRowUpdated = async (e) => {
  const clientId = e.data.id
  
  const fieldsToCheck = [
    'name', 'surname', 'dob', 'fee', 'debt', 'notes',
    'date_pay', 'date_end_pay', 'provider.id', 'type_of_payment.name'
  ]

  for (const field of fieldsToCheck) {
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj)
    }
    
    const oldValue = getNestedValue(e.oldData, field)
    const newValue = getNestedValue(e.data, field)
    
    if (newValue !== oldValue) {
      try {
        let apiField = field
        let apiValue = newValue
        
        if (field === 'provider.id') {
          apiField = 'provider'
        } else if (field === 'type_of_payment.name') {
          apiField = 'type_of_payment'
        }
        
        await clientsStore.updateField(clientId, apiField, apiValue)
        console.log(`Поле ${apiField} успешно обновлено`)
      } catch (error) {
        console.error(`Ошибка при обновлении поля ${field}:`, error)
      }
    }
  }
}

const notesCell = (container, options) => {
  const { value } = options
  const div = document.createElement('div')
  div.style.cursor = 'pointer'
  div.style.color = 'blue'
  div.textContent = value ? 'true' : 'false'
  div.onclick = () => {
    popupVisible.value = true
    selectedClient.value = options.data
    currentNote.value = options.data.notes || ''
  }
  container.appendChild(div)
}

const saveNote = async () => {
  if (!selectedClient.value) return
  try {
    await clientsStore.updateField(selectedClient.value.id, 'notes', currentNote.value)
    selectedClient.value.notes = currentNote.value

    popupVisible.value = false
    selectedClient.value = null
    currentNote.value = ''
  } catch (error) {
    console.error("Ошибка при сохранении заметки:", error)
  }
}

onMounted(() => {
  clientsStore.getClients()
  clientsStore.getProviders()
})
</script>

<style scoped>
.note-popup {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 300px;
}

.note-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.note-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.note-textarea::placeholder {
  color: #adb5bd;
}

.note-buttons {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
}

.btn:active {
  transform: translateY(0);
}
</style>