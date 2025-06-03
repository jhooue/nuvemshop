<template>
  <aside
    :class="{
      'translate-x-0': isOpen,
      '-translate-x-full': !isOpen
    }"
    class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out"
  >
    <div class="p-4 border-b">
      <h2 class="font-bold text-lg">Opções</h2>
      <button @click="closeSidebar" class="text-gray-600 hover:text-gray-900 text-xl">
        &times;
      </button>
    </div>
    <ul class="divide-y divide-gray-200">
      <!-- Opções do menu -->
      <li class="px-4 py-3 hover:bg-gray-100">
        <router-link to="/" class="block text-gray-800" @click="closeSidebar">
          Todos os Produtos
        </router-link>
      </li>
      <li
        v-for="cat in categories"
        :key="cat"
        class="px-4 py-3 hover:bg-gray-100"
      >
        <router-link
          :to="{ name: 'category', params: { slug: cat } }"
          class="block text-gray-800"
          @click="closeSidebar"
        >
          {{ cat.replace(/-/g, ' ') }}
        </router-link>
      </li>
      <!-- Adicione mais opções conforme necessário -->
    </ul>
  </aside>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  categories: Array
})
const emit = defineEmits(['close'])

function closeSidebar() {
  emit('close')
}
</script>
