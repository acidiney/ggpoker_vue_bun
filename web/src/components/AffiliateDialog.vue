<script setup lang="ts">
import { type User, useUsersStore } from '@/stores/users'
import slugify from 'slugify'
import { reactive, defineProps, watch, computed } from 'vue'

const form = reactive<User>({
  nickname: '',
  email: '',
  root_percentage: 0,
  referred: [],
})

const store = useUsersStore()

function addReferrer() {
  form.referred.push({ percentage: 0, username: '' })
}

function removeReferrer(i: number) {
  form.referred.splice(i, 1)
}

const props = defineProps(['current'])

watch(props, (value) => {
  if (value.current) {
    form.id = value.current.id
    form.nickname = value.current.nickname
    form.username = value.current.username
    form.email = value.current.email
    form.root_percentage = value.current.root_percentage
    form.referred = value.current.referred || []
    return
  }

  form.id = undefined
  form.nickname = ''
  form.email = ''
  form.root_percentage = 0
  form.referred = []
})

const username = computed(() => (form.id ? form.username : slugify(form.nickname)))
</script>
<template>
  <div
    id="affiliate-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div class="relative w-full h-full max-w-2xl md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ form.id ? 'Update' : 'Add' }} Affiliate
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
            data-modal-hide="affiliate-modal"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form id="affiliate-form">
            <div class="grid grid-cols-6 gap-6">
              <!-- Nickname / Alias -->
              <div class="col-span-8 sm:col-span-4">
                <label
                  for="nickname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nickname / Alias</label
                >
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  v-model="form.nickname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nickname"
                />
              </div>

              <!-- Username -->
              <div class="col-span-4 sm:col-span-2">
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Username</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  v-model="username"
                  disabled
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Username"
                  required
                />
              </div>

              <!-- Email -->
              <div class="col-span-8 sm:col-span-4">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="form.email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <!-- Base Percentage -->
              <div class="col-span-4 sm:col-span-2">
                <label
                  for="base-percentage"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Base Percentage (%)</label
                >
                <input
                  type="number"
                  step="0.01"
                  id="base-percentage"
                  name="base-percentage"
                  v-model="form.root_percentage"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Ex: 5.0"
                />
              </div>

              <!-- Referenced by + Percentage -->
              <div class="col-span-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Referenced by + Percentage
                </label>

                <div id="referenced-container" class="space-y-2">
                  <div
                    v-for="(ref, idx) in form.referred"
                    :key="idx"
                    class="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      v-model="ref.username"
                      class="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Referrer Username"
                    />
                    <input
                      type="number"
                      step="0.01"
                      v-model.number="ref.percentage"
                      class="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="% Commission"
                    />
                    <button
                      type="button"
                      @click="removeReferrer(idx)"
                      class="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addReferrer"
                  class="mt-2 text-sm text-blue-600 hover:underline"
                >
                  + Add another referrer
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-700"
        >
          <button
            v-if="!form.id"
            type="submit"
            form="edit-user-form"
            @click="() => store.addUser({ ...form, username })"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save all
          </button>
          <button
            v-else
            type="submit"
            form="edit-user-form"
            @click="() => store.updateUser(form)"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update all
          </button>
          <button
            data-modal-hide="affiliate-modal"
            type="button"
            class="text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
