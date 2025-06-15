import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

type Common = {
  id?: string
  created_at?: Date
  updated_at?: Date
}

export type Referred = Common & {
  percentage: number
  username: string
}

export type User = Common & {
  username?: string
  nickname: string
  email: string
  root_percentage: number
  referred: Referred[]
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    columns: [
      {
        key: 'username',
        value: 'username',
      },
      {
        key: 'nickname',
        value: 'Nickname',
      },
      {
        key: 'email',
        value: 'E-mail',
      },
      {
        key: 'root_percentage',
        value: 'Base Percentage',
      },
      {
        key: 'referred',
        value: 'Referred',
        custom: true,
      },
      {
        key: 'updated_at',
        value: 'Updated at',
        date_relative: true,
      },
    ],
  }),
  actions: {
    async getUsers() {
      const fetchResult = await fetch('/api/users')
      const jsonResult = await fetchResult.json()
      this.users = jsonResult.data
    },
    async addUser(form: any) {
      const result = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      const jsonResult = await result.json()

      toast(jsonResult.message, {
        theme: 'dark',
        autoClose: 1000,
      })

      this.getUsers()
    },

    async updateUser(form: any) {
      const result = await fetch(`/api/users/${form.username}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      })

      const jsonResult = await result.json()

      toast(jsonResult.message, {
        theme: 'dark',
        autoClose: 1000,
      })

      this.getUsers()
    },
  },
})
