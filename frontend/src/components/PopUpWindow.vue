<template>
  <div class="container-popup">
      <div class="input-field-box">
          <input v-model="newNote" placeholder="Note" />
          <p>Ваша заметка: <br/>{{ newNote }}</p>
          <p>Текущая заметка: <br/>{{ currentNote }}</p>
      </div>
      <div class="btn-box">
          <button @click="addNote">Сохранить</button>
          <button @click="closePopUp">Отмена</button>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useClientsStore } from '@/stores/clientsStore.js'

const clientsStore = useClientsStore()

const currentNote = computed(() => {
  const user = clientsStore.clients.find(u => u.id === clientsStore.entryID)
  return user?.notes || ''
})

const newNote = ref(currentNote.value)

watch(currentNote, (val) => {
  newNote.value = val
})

const closePopUp = () => {
  clientsStore.entryID = null
}

const addNote = async () => {
  await clientsStore.editingNote(clientsStore.entryID, newNote.value)
  closePopUp()
}
</script>

<style scoped>
.container-popup {
    width: 600px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 5%;
    z-index: 100;
    background-color: rgb(106, 147, 192);
    padding: 20px;
}

.input-field-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
}

.input-field-box input {
    margin-top: 20px;
    height: 40px;
    width: 80%;
    background-color: #fff;
    border: 2px solid rgb(211, 209, 209);
    padding: 0 10px;
}

.input-field-box p {
    margin-top: 15px;
    text-align: center;
}

.btn-box { 
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
}

.btn-box button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(100, 99, 194);
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.btn-box button:hover {
    background-color: rgb(46, 44, 204);
    color: #fff;
}
</style>