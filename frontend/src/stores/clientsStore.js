import { defineStore } from 'pinia'
import axios from "axios"

export const useClientsStore = defineStore('clientsStore', {
    state: () => ({
        providers: [],
        clients: [],
        entryID: null,
    }),
    actions: {
        async getProviders() {
            const response = await axios.get('/api/providers/')
            this.providers = response.data
        },
        async getClients() {
            const response = await axios.get('/api/users/')
            this.clients = response.data
        },
        async editingNote(entryID, newNote) {
            try{
              await axios.patch(`/api/users/${entryID}/`, {
                "notes": newNote
              })
            } catch(error) {
              console.error("Ошибка при добавлении заметки:", error)
            }
        },
        async editingProvider(clientId, providerId) {
          try{
            await axios.patch(`/api/users/${clientId}/`, {
              "provider": providerId
            })
          } catch(error) {
            console.error("Ошибка при изменении/добавлении провайдера:", error)
          }
        },
    }

})