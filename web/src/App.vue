<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initFlowbite } from 'flowbite'
import AppHeader from '@/components/AppHeader.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <AppHeader />
  <div class="bg-gray-800">
    <div class="flex overflow-hidden bg-gray-900">
      <div
        class="fixed inset-0 z-10 hidden bg-gray-900/90"
        id="sidebarBackdrop"
      ></div>

      <div
        id="main-content"
        class="relative w-full h-full overflow-y-auto bg-gray-900"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
