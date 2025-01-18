<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import CustomerEmptyState from '@/modules/customer/components/CustomerEmptyState.vue'
import GlobalModal from '@/components/GlobalModal.vue'
import CustomerForm from '@/modules/customer/components/CustomerForm.vue'
import type { CustomerInfo } from '@/modules/customer/types.ts'
import { useCustomerStore } from "@/modules/customer/store"
import CustomerTableHead from '@/modules/customer/components/CustomerTableHead.vue'

const screenState = reactive({
  showAddCustomerModal: false,
  isEditingForm: false,
  isViewingDetails: false,
})

const customerStore = useCustomerStore()

const customerSearchTerm = ref("")

const selectedCustomerDetails = ref<CustomerInfo | undefined>()

const filteredCustomers = computed<Array<CustomerInfo>>(() => {
  return customerStore.customerList.filter((customer: CustomerInfo) =>
    customer.firstName.toLowerCase().includes(customerSearchTerm.value.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(customerSearchTerm.value.toLowerCase()) ||
    customer.state.toLowerCase().includes(customerSearchTerm.value.toLowerCase()) ||
    customer.phone.toString().toLowerCase().includes(customerSearchTerm.value.toLowerCase())
  );
})

function handleAddCustomerInit(){
  screenState.showAddCustomerModal = true
}

function handleCloseCustomerModal(){
  screenState.showAddCustomerModal = false
  screenState.isEditingForm = false
  screenState.isViewingDetails = false
}

function handleViewCustomerDetails(customerDetails: CustomerInfo){
  selectedCustomerDetails.value = customerDetails
  screenState.showAddCustomerModal = true
  screenState.isViewingDetails = false
  screenState.isEditingForm = true
}
</script>

<template>
  <div class="px-4 lg:px-6 bg-gray-200 min-h-[100dvh] h-fit flex flex-col">
    <main class="max-w-[1440px] mx-auto py-6 grow w-full flex flex-col gap-6">
      <section class="flex items-center justify-between">
        <h1 class="font-semibold text-2xl">Customer</h1>
        <button
          @click="handleAddCustomerInit"
          class="bg-red-600 text-white font-semibold text-xs rounded p-2.5 hover:bg-red-500 hover:scale-105 transition-all"
        >
          Add Customer
        </button>
      </section>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="space-y-2.5 shadow ring-gray-200 rounded ring-[1px] bg-gray-50 hover:scale-105 transition-transform"
        >
          <h2 class="p-4 border-b-[1px] border-b-gray-300 text-xs font-medium uppercase">
            Total Customer
          </h2>
          <p class="p-4 text-green-700 font-medium text-xl">{{ customerStore.customerCount }}</p>
        </div>
      </section>

      <section class="grow rounded bg-gray-50 shadow ring-gray-200 ring-[1px] flex flex-col">
        <div class="p-5 flex items-center gap-4 justify-between flex-wrap">
          <h3 class="text-sm uppercase font-medium">Customer List</h3>
          <input
            v-model="customerSearchTerm"
            placeholder="Search Customer"
            type="search"
            class="rounded text-sm px-4 py-2.5 ring-[1.5px] outline-none shadow ring-gray-100 bg-white grow max-w-[400px]"
          />
        </div>
        <div class="overflow-x-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <CustomerTableHead />
              <tbody v-if="customerStore.customerCount > 0" class="text-sm font-medium text-gray-600">
              <tr v-for="customer in filteredCustomers" :key="customer.id" class="border-b-[1px] border-b-gray-200">
                <td class="pl-5 py-4">{{ customer.firstName + " " + customer.lastName}}</td>
                <td class="px-3">{{ customer.email }}</td>
                <td class="px-3">{{ customer.state}}</td>
                <td class="px-3">{{ customer.phone }}</td>
                <td class="px-3">
                  <span v-if="customer.active" class="text-green-600">Active</span>
                  <span v-else class="text-red-600">Inactive</span>
                </td>
                <td class="pr-5">
                  <button
                    @click="handleViewCustomerDetails(customer)"
                    class="underline underline-offset-2 text-blue-500"
                  >
                    View Details
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <CustomerEmptyState v-if="customerStore.customerCount === 0 || filteredCustomers.length === 0" @add-customer="handleAddCustomerInit" />
        <GlobalModal v-if="screenState.showAddCustomerModal" modalContentClass="max-w-4xl">
          <CustomerForm
            @close="handleCloseCustomerModal"
            :customer-info="selectedCustomerDetails"
            :is-editing="screenState.isEditingForm"
            :readonly="screenState.isViewingDetails"
          />
        </GlobalModal>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
