<template>
  <!-- NavBar (opcional, pode ser removido se quiser tudo em App.vue) -->
  <NavBar @open-sidebar="sidebarOpen = true" />

  <!-- Barra de busca e resultados (tudo em App.vue) -->
  <nav class="bg-white shadow fixed top-0 inset-x-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-indigo-600">
        NuvemShop
      </router-link>
      <!-- Busca -->
      <div class="flex-1 flex justify-center px-4 max-w-md w-full">
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Buscar produtos..."
          class="w-full bg-gray-100 text-gray-900 placeholder-gray-500 
                 rounded-full py-2 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          @keyup.enter="searchTerm && performSearch()"
        />
      </div>
      <!-- Ícones à direita (opcional, pode ser removido se usar NavBar) -->
      <div class="flex-shrink-0 flex items-center space-x-4">
        <!-- Carrinho -->
        <router-link to="/cart" class="text-gray-700 hover:text-gray-900" aria-label="Carrinho">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m0 0h12.4
                     m-12.4 0a1 1 0 001 1h.01M17 19a1 1 0 001-1"/>
          </svg>
        </router-link>
        <!-- Home -->
        <router-link to="/" class="text-gray-700 hover:text-gray-900" aria-label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 9.75L12 4l9 5.75v8.5A2.75 2.75 
                     0 0118.25 21h-12A2.75 2.75 0 
                     013 18.25v-8.5z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 21V12H15V21"/>
          </svg>
        </router-link>
        <!-- Botão para abrir o menu lateral -->
        <button @click="sidebarOpen = true" class="text-gray-700 hover:text-gray-900" aria-label="Opções">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Resultados da busca -->
  <div v-if="searchTerm.length >= 2" class="absolute top-16 left-0 right-0 w-full z-40 bg-white">
    <div v-if="isLoading" class="p-4 text-center">Carregando...</div>
    <div v-else-if="searchResults.length > 0" class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link
        v-for="product in searchResults"
        :key="product.id"
        :to="{ name: 'product-detail', params: { id: product.id } }"
        class="border p-4 rounded-lg hover:bg-gray-50"
      >
        <img :src="product.thumbnail" :alt="product.title" class="h-20 mx-auto">
        <h3 class="font-bold mt-2">{{ product.title }}</h3>
        <p class="text-gray-700">R$ {{ product.price }}</p>
      </router-link>
    </div>
    <div v-else-if="searchTerm.length >= 2 && !isLoading" class="p-4 text-center">
      Nenhum produto encontrado.
    </div>
  </div>

  <!-- Menu Lateral (Sidebar) -->
  <aside
    v-if="sidebarOpen"
    class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transition-transform duration-300 mt-16"
  >
    <div class="p-4 border-b flex justify-between items-center">
      <h2 class="font-bold text-lg">Op000E7ões</h2>
      <button @click="sidebar0pen = false" class="text-gray-600 hover:text-gray-900 text-xl">
        &times;
      </button>
    </div>
    <ul>
      <li class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link to="/" @click="sidebarOpen = false" class="block text-gray-800">
          Todos os Produtos
        </router-link>
      </li>
      <li v-for="cat in categories" :key="cat" class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link
          :to="{ name: 'category', params: { slug: cat } }"
          @click="sidebarOpen = false"
          class="block text-gray-800"
        >
          {{ cat.replace(/-/g, ' ') }}
        </router-link>
      </li>
      <!-- Adicione mais opções aqui -->
      <li class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link to="/about" @click="sidebarOpen = false" class="block text-gray-800">
          Sobre
        </router-link>
      </li>
      <li class="px-4 py-3 border-b hover:bg-gray-100">
        <router-link to="/contact" @click="sidebarOpen = false" class="block text-gray-800">
          Contato
        </router-link>
      </li>
    </ul>
  </aside>

  <!-- Conteúdo principal -->
  <main class="pt-16 min-h-screen">
    <router-view />
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

const sidebarOpen = ref(false)
const categories = ref([])
const searchTerm = ref('')
const searchResults = ref([])
const isLoading = ref(false)

// Busca em tempo real
function debounce(fn, delay) {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

const performSearch = debounce(async () => {
  if (searchTerm.value.length < 2) {
    searchResults.value = []
    return
  }
  isLoading.value = true
  try {
    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm.value}`)
    searchResults.value = data.products
  } catch (err) {
    console.error('Erro ao buscar produtos:', err)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}, 500)

watch(searchTerm, performSearch)

onMounted(async () => {
  try {
    const { data } = await axios.get('https://dummyjson.com/products/categories')
    categories.value = data
  } catch (err) {
    console.error('Erro ao carregar categorias:', err)
  }
})
</script>

<style>
/* Estilos globais podem ser adicionados aqui, se necessário */
</style>
