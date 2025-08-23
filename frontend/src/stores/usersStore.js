import { defineStore } from 'pinia'
import axios from "axios"

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    entryID: null
  }),

  actions: {
    async getUsers(limit = 50) {
      try{
        const response = await axios.get('/api/users/', {
          params: { limit: limit }
        })
        console.log('Полный ответ:', response)
        console.log('Response.data:', response.data)
        console.log('Response.status:', response.status)
        
        if (response.data && Array.isArray(response.data)) {
          this.users = response.data
        } else if (response.data && response.data.results) {
          this.users = response.data.results
        } else {
          console.error('Неожиданная структура ответа:', response.data)
          this.users = []
        }
        
        console.log('Данные загружены:', this.users.length, 'пользователей')
        return this.users
      }catch(error){
        console.error("Ошибка при загрузке пользователей:", error)
        return []
      }
    },
    async editingNote(entryID, newNote) {
      console.log("Инфа со стора")
      try{
        await axios.patch(`/api/users/${entryID}/`, {
          "notes": newNote
        })
      } catch(error) {
        console.error("Ошибка при добавлении заметки:", error)
      }
    }
  }
})