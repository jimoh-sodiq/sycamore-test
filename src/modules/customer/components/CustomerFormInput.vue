<script setup lang="ts">
import { defineModel } from 'vue'

const model = defineModel<sring| number>()

withDefaults(defineProps<{
  type?: string
  placeholder?: string
  role?: string
  required?: boolean
  readonly?: boolean
}>(),
  {
    type: 'text',
    placeholder: '',
    required: true,
    readonly: false
  })
</script>

<template>
  <input :readonly="readonly" :disabled="readonly" :required="required" :type="type" :role="role" :placeholder="placeholder" v-model.trim="model" class="px-4 py-2 bg-white rounded outline-none ring-[1px] ring-gray-200 shadow w-full text-sm" />
</template>

<style scoped>

</style>
