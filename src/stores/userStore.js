import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    providers: [],
    paymentTypes: []
  }),

  actions: {
    generateUsers(forceRegenerate = false) {
      console.log('Начинаю генерацию пользователей...')
      
      if (!forceRegenerate) {
        const saved = localStorage.getItem('users')
        if (saved) {
          try {
            this.users = JSON.parse(saved)
            console.log('Загружено из localStorage:', this.users.length, 'пользователей')
            return
          } catch (error) {
            console.error('Ошибка при загрузке из localStorage:', error)
            localStorage.removeItem('users')
          }
        }
      } else {
        console.log('Принудительная перегенерация - игнорирую localStorage')
        localStorage.removeItem('users')
      }

      console.log('Генерирую новых пользователей...')

      const providers = []
      for (let i = 1; i <= 20; i++) {
        providers.push({
          id: i,
          firstName: faker.person.firstName(),
          surname: faker.person.lastName(),
        })
      }
      this.providers = providers
      console.log('Сгенерировано провайдеров:', this.providers.length)

      this.paymentTypes = [
        { id: 1, name: 'Cash' },
        { id: 2, name: 'Card' },
        { id: 3, name: 'Bank Transfer' }
      ]
      console.log('Типы платежей:', this.paymentTypes)

      const users = Array.from({ length: 10000 }, (_, index) => {
        const user = {
          id: faker.string.uuid(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          dob: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }).toISOString().split('T')[0],
          fee: Number(faker.finance.amount(100, 1000, 2)),
          debt: Number(faker.finance.amount(0, 500, 2)),
          notes: faker.lorem.sentence(),
          provider: faker.helpers.arrayElement(this.providers),
          typeOfPayment: faker.helpers.arrayElement(this.paymentTypes),
          datePay: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
          dateEndPay: faker.date.soon({ days: 30 }).toISOString().split('T')[0]
        }
        
        if (index === 0) {
          console.log('Пример первого пользователя:', user)
        }
        
        return user
      })

      this.users = users
      console.log('Сгенерировано пользователей:', this.users.length)
      
      try {
        localStorage.setItem('users', JSON.stringify(users))
        console.log('Данные сохранены в localStorage')
      } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error)
      }
    },

    clearUsers() {
      console.log('Очищаю пользователей...')
      this.users = []
      this.providers = []
      this.paymentTypes = []
      localStorage.removeItem('users')
      console.log('Пользователи очищены')
    },

    updateUser(userId, field, value) {
      const user = this.users.find(u => u.id === userId)
      if (user) {
        user[field] = value
        try {
          localStorage.setItem('users', JSON.stringify(this.users))
        } catch (error) {
          console.error('Ошибка при обновлении localStorage:', error)
        }
      }
    }
  }
})