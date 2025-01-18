<script setup lang="ts">

</script>

<template>
  <main class="min-h-[100dvh] w-full flex flex-col">
    <div class="grow flex items-center justify-center flex-col gap-5">
      <div>Welcome to Sycamore</div>
      <RouterLink to="/customer" class="rounded block w-fit px-6 py-4 bg-slate-700 hover:bg-slate-600 transition-all font-medium text-gray-200">Manage Customers</RouterLink>
    </div>
    <footer class="p-4 bg-gray-800 text-white font-medium text-center">
      <p>Design Inspiration: <a href="https://dribbble.com/shots/21531483-Organized-Customer-Management-Dashboard" class="underline text-blue-300" target="_blank">https://dribbble.com/shots/21531483-Organized-Customer-Management-Dashboard</a></p>
    </footer>
  </main>
</template>

<style scoped>

</style>
