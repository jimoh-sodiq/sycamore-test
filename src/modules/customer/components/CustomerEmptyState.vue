<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'addCustomer'): void
  }>()
</script>

<template>
  <div class="grow p-4 flex items-center justify-center flex-col gap-2">
    <p class="text-sm font-semibold text-gray-700">Oops! No Customer found</p>
    <p class="text-sm text-gray-500">Please add a Customer</p>
    <button type="button" @click="emit('addCustomer')" class="bg-red-600 text-white font-semibold text-xs rounded p-2.5 hover:bg-red-500 hover:scale-105 transition-all">Add Customer</button>
  </div>
</template>

<style scoped>

</style>
