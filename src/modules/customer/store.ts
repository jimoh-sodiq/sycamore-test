import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import type { CustomerInfo } from '@/modules/customer/types.ts'

export const useCustomerStore = defineStore('customer', () => {
  const customerList = ref<Array<CustomerInfo>>([])
  const customerCount = computed(() => customerList.value.length)

  // create
  function createCustomer(data: Omit<CustomerInfo, "id">){
    const id = nanoid()
    customerList.value.push({ id, ...data })
  }

  // read
  function getCustomerInfo(id: string){
    return customerList.value.find((customer) => customer.id === id)
  }

  // update
  function editCustomer(data: CustomerInfo){
    const index = customerList.value.findIndex(
      (customer) => customer.id === data.id
    );
    if (index !== -1) {
      customerList.value[index] = { ...customerList.value[index], ...data };
    } else {
      console.error(`Customer with ID ${data.id} not found.`);
    }
  }

  // delete
  function deleteCustomer(id: string){
    customerList.value = customerList.value.filter(customer => customer.id !== id)
  }

  return { customerList, customerCount, createCustomer, getCustomerInfo, deleteCustomer, editCustomer }
})
