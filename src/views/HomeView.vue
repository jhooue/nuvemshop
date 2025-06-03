<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Catálogo de Laptops</h1>

    <!-- Grid de Produtos -->
    <div v-if="loading" class="text-center text-gray-500 mb-6">
      Carregando produtos...
    </div>
    <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
      <article
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-40 object-contain rounded transition-transform hover:scale-105"
        />
        <h2 class="font-semibold text-gray-900 mb-1 truncate">{{ product.title }}</h2>
        <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
        <p class="text-indigo-600 font-bold mb-2">R$ {{ product.price }}</p>
        <p class="text-xs text-gray-600 mb-4">Estoque: {{ product.stock }}</p>
        <router-link
          :to="`/product/${product.id}`"
          class="mt-auto text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Ver detalhes
        </router-link>
      </article>
    </div>

    <!-- Paginação -->
    <div class="flex justify-center items-center gap-4">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/services/api.js'

const products    = ref([])
const loading     = ref(true)
const page        = ref(1)
const limit       = 8
const total       = ref(0)

const totalPages = computed(() => Math.ceil(total.value / limit))

async function loadProducts() {
  loading.value = true
  try {
    const skip = (page.value - 1) * limit
    const res  = await api.get(`/products/category/laptops?limit=${limit}&skip=${skip}`)
    products.value = res.data.products
    total.value    = res.data.total
  } catch (err) {
    console.error('Erro ao carregar laptops:', err)
  } finally {
    loading.value = false
  }
}

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

onMounted(loadProducts)
watch(page, loadProducts)
</script>

<style scoped>
/* Todo estilo é feito com TailwindCSS */
</style>
