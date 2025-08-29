import { defineStore } from 'pinia'
import axios from "axios"

export const useClientsStore = defineStore('clientsStore', {
    state: () => ({
        providers: [],
        clients: [],
        entryID: null,
        clientsPaging: [],
    }),
    actions: {
        async getProviders() {
          try{
            const response = await axios.get('/api/providers/')
            this.providers = response.data
          }catch(error) {
            console.error("Ошибка при загрузке провайдеров:", error)
          }
        },
        async getClients() {
          try{
            const response = await axios.get('/api/users/')
            this.clients = response.data
          }catch(error){
            console.error("Ошибка при добавлении заметки:", error)
          }
        },
        async getClientsPage(limit, offset) {
          try {
            const response = await axios.get(`/api/users?limit=${limit}&offset=${offset}`)
            this.clientsPaging = response.data.results
            return response.data
          } catch (error) {
            console.error("Ошибка при получении страницы:", error)
          }
        },
        async updateField(clientId, field, value) {
          try {
            await axios.patch(`/api/users/${clientId}/`, { [field]: value })
          } catch (error) {
            console.error(`Ошибка при обновлении ${field}:`, error)
          }
        }
    }

})