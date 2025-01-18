<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import CustomerFormInput from '@/modules/customer/components/CustomerFormInput.vue'
import type { CustomerInfo } from '@/modules/customer/types.ts'
import { statesInNigeria } from '@/modules/customer/utils.ts'
import { useCustomerStore } from "@/modules/customer/store.ts"

const emit = defineEmits<{
  (e: 'close'): void
}>()



const props = withDefaults(defineProps<{
  readonly?: boolean,
  isEditing?: boolean,
  customerInfo?: CustomerInfo
}>(), {
})

const customerStore = useCustomerStore()

const disabled = ref(false)

function handleCancel(){
  emit('close')
}

const editorTools = ref([
  "bold",
  "italic",
  "underline",
  "link",
  "strike",
  "align",
  "image",
  { align: "center" },
  { align: "right" },
  { list: "bullet" },
]);
const quillEditorRef = ref()

const customerFormData = reactive<Omit<CustomerInfo, 'id'>>({
  firstName: props.customerInfo?.firstName ?? "",
  lastName: props.customerInfo?.lastName ?? "",
  email: props.customerInfo?.email ?? "",
  phone: props.customerInfo?.phone ?? "",
  state: props.customerInfo?.state ?? "",
  active: props.customerInfo?.active ?? false,
  details: props.customerInfo?.details ?? ""
})

function handleSubmit(){
  if(props.isEditing){
    const data = {id: props.customerInfo?.id, ...customerFormData} as CustomerInfo
    customerStore.editCustomer(data)
    emit('close')
    return;
  }
  customerStore.createCustomer(customerFormData)
  emit('close')
}

function handleDeleteCustomer(){
  const ok = confirm('Are you sure you want to delete this customer')
  if(ok){
    customerStore.deleteCustomer(props.customerInfo!.id)
    emit('close')
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-5">
    <h1 class="text-lg font-medium text-gray-600">Create Customer</h1>
    <div class="grid grid-cols-2 gap-5">
      <CustomerFormInput v-model="customerFormData.firstName" :readonly="readonly" placeholder="Firstname" />
      <CustomerFormInput v-model="customerFormData.lastName" :readonly="readonly" placeholder="Lastname" />
      <CustomerFormInput v-model="customerFormData.email" :readonly="readonly" placeholder="Email" type="email" />
      <CustomerFormInput v-model="customerFormData.phone" :readonly="readonly" placeholder="Phone" type="phone" role="number" />
      <select v-model="customerFormData.state" :disabled="readonly" required class="required px-4 py-2 bg-white rounded outline-none ring-[1px] ring-gray-200 shadow w-full text-sm">
        <option selected value="">State</option>
        <option v-for="state in statesInNigeria" :key="state">{{ state }}</option>
      </select>
      <div class="flex items-center">
        <label class="flex w-fit  gap-x-4 cursor-pointer"><span class="text-sm text-gray-600 font-medium">Active:</span> <input v-model="customerFormData.active" :readonly="readonly" :disabled="readonly" type="checkbox" class="accent-red-600 w-5 h-5" /></label>
      </div>
    </div>
<!--    <div ref="quillHolderRef" class="w-full">-->
<!--      <textarea v-model="customerFormData.details" class="w-full">CustomerDetails</textarea>-->
<!--    </div>-->
    <QuillEditor
      ref="quillEditorRef"
      class="text-black border border-solid max-h-[282px] bg-white"
      :disabled="disabled"
      v-model:content="customerFormData.details"
      style="height: 170px"
      :toolbar="editorTools"
      contentType="html"
    />
    <div class="grid gap-5" :class="readonly ? 'grid-cols-1' : 'grid-cols-2'">
      <button :disabled="disabled" v-if="!readonly" type="submit" class="bg-green-600 text-white w-full font-semibold text-sm rounded p-2.5 hover:bg-green-500 transition-all">{{ isEditing ? 'Edit Customer' : 'Create Customer' }}</button>
      <button :disabled="disabled" v-if="readonly" type="submit" class="bg-green-600 text-white w-full font-semibold text-sm rounded p-2.5 hover:bg-green-500 transition-all">{{ isEditing ? 'Edit Customer' : 'Create Customer' }}</button>
      <button @click="handleCancel" :disabled="disabled" type="button" class="bg-red-600 text-white w-full font-semibold text-sm rounded p-2.5 hover:bg-red-500 transition-all">{{ readonly ? 'Close' : 'Cancel'}}</button>
    </div>
      <button v-if="isEditing" @click="handleDeleteCustomer" :disabled="disabled" type="button" class="bg-red-600 text-white w-full font-semibold text-sm rounded p-2.5 hover:bg-red-500 transition-all">Delete Customer</button>
  </form>
</template>

<style scoped>

</style>
