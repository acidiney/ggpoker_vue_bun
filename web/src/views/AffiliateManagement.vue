<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import AffiliateDialog from '@/components/AffiliateDialog.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppTable from '@/components/AppTable.vue'

import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const breadcrumb = ['home', 'affiliate management']
const affiliates = computed(() => store.users)
const columns = computed(() => store.columns)

const currentAffiliate = ref(null)

onMounted(() => {
  store.getUsers()
})
</script>

<template>
  <main>
    <AppBreadcrumb :breadcrumb="breadcrumb">
      <div class="sm:flex">
        <div
          class="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 divide-gray-700"
        >
          <form class="lg:pr-3" action="#" method="GET">
            <label for="users-search" class="sr-only">Search</label>
            <div class="relative mt-1 lg:w-64 xl:w-96">
              <input
                type="text"
                name="email"
                id="users-search"
                class="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search for users"
              />
            </div>
          </form>
        </div>
        <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
          <button
            type="button"
            data-modal-target="affiliate-modal"
            data-modal-toggle="affiliate-modal"
            @click="() => (currentAffiliate = null)"
            class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-800 sm:w-auto"
          >
            <svg
              class="w-5 h-5 mr-2 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Add Affiliate
          </button>
        </div>
      </div>
    </AppBreadcrumb>

    <AppTable
      :data="affiliates"
      :theads="columns"
      @select-line="(row) => (currentAffiliate = row)"
    />

    <AffiliateDialog :current="currentAffiliate" />
  </main>
</template>
