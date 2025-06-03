<!-- src/views/HomeView.vue -->
<template>
  <div class="mt-16 max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Catálogo de Produtos</h1>

    <!-- Controles de ordenação e carregamento -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0"
    >
      <!-- Ordenação -->
      <div>
        <label for="sort" class="mr-2 font-medium">Ordenar por:</label>
        <select
          id="sort"
          v-model="sortOrder"
          class="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Padrão</option>
          <option value="price-asc">Preço Crescente</option>
          <option value="price-desc">Preço Decrescente</option>
          <option value="name-asc">Nome A → Z</option>
          <option value="name-desc">Nome Z → A</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-gray-500">
        Carregando produtos...
      </div>
    </div>

    <!-- Grid de Produtos -->
    <div
      v-if="!loading"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <article
        v-for="product in sortedProducts"
        :key="product.id"
        class="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col"
      >
        <!-- Imagem leva à detail -->
        <router-link
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="block overflow-hidden mb-4"
        >
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-40 object-contain rounded transition-transform hover:scale-105"
          />
        </router-link>

        <h2 class="font-semibold text-gray-900 mb-1 truncate">{{ product.title }}</h2>
        <p class="text-sm text-gray-500 mb-2 capitalize">{{ product.category }}</p>
        <p class="text-indigo-600 font-bold mb-2">R$ {{ product.price }}</p>
        <p class="text-xs text-gray-600 mb-4">Estoque: {{ product.stock }}</p>

        <!-- Botão Ver detalhes agora usa rota nomeada -->
        <router-link
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="mt-auto text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Ver detalhes
        </router-link>
      </article>
    </div>

    <!-- Paginação -->
    <div class="flex justify-center items-center gap-4 mt-6">
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
import axios from 'axios'

const products      = ref([])
const loading       = ref(false)
const page          = ref(1)
const limit         = 32
const totalPages    = ref(1)
const totalProducts = ref(0)
const sortOrder     = ref('')

// Busca produtos com paginação
async function fetchProducts() {
  loading.value = true
  try {
    const skip     = (page.value - 1) * limit
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    products.value      = response.data.products
    totalProducts.value = response.data.total
    totalPages.value    = Math.ceil(response.data.total / limit)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  } finally {
    loading.value = false
  }
}

// Computed que aplica ordenação local
const sortedProducts = computed(() => {
  const list = [...products.value]
  switch (sortOrder.value) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title))
    case 'name-desc':
      return list.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return list
  }
})

// Navegação de páginas
function nextPage() { if (page.value < totalPages.value) page.value++ }
function prevPage() { if (page.value > 1) page.value-- }

onMounted(fetchProducts)
watch(page, fetchProducts)
</script>

<style scoped>
/* Todo o estilo é feito com TailwindCSS */
</style>
