<script lang="ts" setup>
import { defineProps } from 'vue'

type Props = {
  breadcrumb: string[]
}

defineProps<Props>()
</script>

<template>
  <div
    class="p-4 bg-gray-800 block sm:flex items-center justify-between border-b border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <nav class="flex mb-5" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
            <li v-for="(step, i) in breadcrumb">
              <div class="flex items-center">
                <svg
                  v-if="i != 0"
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  class="ml-1 text-gray-300 hover:text-white md:ml-2"
                  >{{ step }}</a
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
