<template>
  <aside
    v-if="isOpen"
    class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transition-transform duration-300"
  >
    <div class="p-4 border-b flex justify-between items-center">
      <h2 class="font-bold text-lg">Opções</h2>
      <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900 text-xl">
        &times;
      </button>
    </div>
    <ul>
      <li class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link to="/" @click="$emit('close')" class="block text-gray-800">
          Todos os Produtos
        </router-link>
      </li>
      <li v-for="cat in categories" :key="cat" class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link
          :to="{ name: 'category', params: { slug: cat } }"
          @click="$emit('close')"
          class="block text-gray-800"
        >
          {{ cat.replace(/-/g, ' ') }}
        </router-link>
      </li>
      <!-- Adicione mais opções aqui -->
      <li class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link to="/about" @click="$emit('close')" class="block text-gray-800">
          Sobre
        </router-link>
      </li>
      <li class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link to="/contact" @click="$emit('close')" class="block text-gray-800">
          Contato
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  categories: Array
})
defineEmits(['close'])
</script>

