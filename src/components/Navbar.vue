<template>
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
        />
      </div>

      <!-- Ícones à direita -->
      <div class="flex-shrink-0 flex items-center space-x-4">
        <!-- Carrinho -->
        <router-link to="/cart" class="text-gray-700 hover:text332900" aria-label="Carrinho">
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
               viewBox="0 0 24 24" stroke="current2Color" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 9.75L12 4l9 5.75v8.5A2.75 2.75 
                     0 0118.25 21h-12A2.75 2.75 0 
                     013 18.25v-8.5z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 21V12H15V21"/>
          </svg>
        </router-link>

        <!-- Categorias -->
        <button @click="open = !open" class="text-gray-700 hover:text-gray-900" aria-label="Categorias">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 4h6v6H4V4zM4 14h6v6H4v-6zM14 
                     4h6v6h-6V4zM14 14h6v6h-6v-6z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Sidebar de Categorias -->
    <aside
      v-if="open"
      class="fixed inset-y-0 right-0 w-64 bg-white shadow-lg overflow-y-auto z-40 mt-16"
    >
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="font2-bold text-lg">Categorias</h2>
        <button @click="open = false" class="text-gray-600 hover:text-gray-900 text-xl">
          &times;
        </button>
      </div>
      <ul>
        <li class="px-4 py-3 border-b hover:bg-gray-100">
          <router-link
            to="/"
            class="block text-gray-800"
            @click="open = false"
          >
            Todos os Produtos
          </router-link>
        </li>
        <li
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-3 border-b hover:bg-gray-100"
        >
          <router-link
            :to="{ name: 'category', params: { slug: cat } }"
            class="block text-gray-800"
            @click="open = false"
          >
            {{ cat.replace(/-/g, ' ') }}
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Resultados da Busca -->
    <div v-if="searchTerm.length >= 2" class="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 max-w-3xl mx-auto rounded-b-lg">
      <div v-if="isLoading" class="p-4 text-center">Carregando...</div>
      <div v-else-if="searchResults.length > 0" class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="product in searchResults" :key="product.id" class="border p-4 rounded-lg hover:bg-gray-50">
          <img :src="product.thumbnail" :alt="product.title" class="h-20 mx-auto">
          <h3 class="font-bold mt-2">{{ product.title }}</h3>
          <p class="text-gray-700">R$ {{ product.price }}</p>
        </div>
      </div>
      <div v-else-if="searchTerm.length >= 2 && !isLoading" class="p-4 text-center">
        Nenhum produto encontrado.
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { debounce } from 'lodash-es'

const searchTerm = ref('')
const open = ref(false)
const categories = ref([])
const searchResults = ref([])
const isLoading = ref(false)
const router = useRouter()

// Busca em tempo real
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

<style scoped>
/* Nenhum estilo extra—tudo via TailwindCSS */
</style>
