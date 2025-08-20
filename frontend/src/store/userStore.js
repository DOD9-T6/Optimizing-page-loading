import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: []
  }),

  actions: {
    generateUsers() {
      const saved = localStorage.getItem('users')
      if (saved) {
        this.users = JSON.parse(saved)
        return
      }

      const users = Array.from({ length: 10000 }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        city: faker.location.city(),
      }))

      this.users = users
      localStorage.setItem('users', JSON.stringify(users))
    },

    clearUsers() {
      this.users = []
      localStorage.removeItem('users')
    }
  }
})