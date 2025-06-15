<script lang="ts" setup>
type Props = {
  data: any[]
  theads: any[]
}

defineProps<Props>()
defineEmits(['select-line'])
</script>

<template>
  <div class="h-[100vh]">
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden shadow">
            <table class="min-w-full divide-y divide-gray-600 table-fixed">
              <thead class="bg-gray-700">
                <tr>
                  <th
                    v-for="column of theads"
                    scope="col"
                    :key="column.key"
                    class="p-4 text-xs font-medium text-left text-gray-400 uppercase"
                  >
                    {{ column.value }}
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-xs font-medium text-left text-gray-400 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-gray-800 divide-y divide-gray-700"
              >
                <tr v-for="row of data" class="hover:bg-gray-700">
                  <td
                    v-for="column of theads"
                    class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs"
                  >
                    <template v-if="column.custom">
                      {{ row[column.key]?.length }}
                    </template>
                    <template v-else>
                      {{ row[column.key] }}
                    </template>
                  </td>

                  <td class="p-4 space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      @click.prevent="$emit('select-line', row)"
                      data-modal-target="affiliate-modal"
                      data-modal-toggle="affiliate-modal"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-800"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Edit user
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      class="sticky bottom-0 right-0 items-center w-full p-4 bg-gray-800 border-t border-gray-700 sm:flex sm:justify-between"
    >
      <div class="flex items-center mb-4 sm:mb-0">
        <span class="text-sm font-normal text-gray-400"
          >Showing <span class="font-semibold text-white">1-20</span> of
          <span class="font-semibold text-white">{{ data.length }}</span></span
        >
      </div>
    </div>
  </div>
</template>
