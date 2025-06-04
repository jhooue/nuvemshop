<template>
  <div class="p-4">
    <!-- Opções de ordenação -->
    <select
      v-model="sortOption"
      @change="sortProducts"
      class="mb-4 p-2 border rounded"
    >
      <option value="crescente">Preço: Crescente</option>
      <option value="decrescente">Preço: Decrescente</option>
      <option value="a-z">Nome: A-Z</option>
      <option value="z-a">Nome: Z-A</option>
    </select>

    <!-- Lista de produtos -->
    <div v-if="loading" class="text-center text-gray-500">
      Carregando produtos...
    </div>
    <div v-else-if="products.length === 0" class="text-center text-gray-500">
      Nenhum produto encontrado.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="border p-4 rounded-lg hover:bg-gray-50"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-40 mx-auto"
        />
        <h3 class="font-bold mt-2">{{ product.title }}</h3>
        <p class="text-gray-700">R$ {{ product.price }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(true)
const sortOption = ref('crescente')

async function loadAllProducts() {
  const allProducts = []
  // DummyJSON tem cerca de 100 produtos (4 páginas de 30)
  const totalPages = 4

  for (let i = 1; i <= totalPages; i++) {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=30&skip=${(i - 1) * 30}`
      )
      allProducts.push(...data.products)
    } catch (err) {
      console.error(`Erro ao buscar produtos da página ${i}:`, err)
    }
  }

  products.value = allProducts
  loading.value = false
  sortProducts() // Ordena após carregar
}

function sortProducts() {
  const sorted = [...products.value]

  if (sortOption.value === 'crescente') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'decrescente') {
    sorted.sort((a, b) => b.price - a.price)
  } else if (sortOption.value === 'a-z') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortOption.value === 'z-a') {
    sorted.sort((a, b) => b.title.localeCompare(a.title))
  }

  products.value = sorted
}

onMounted(loadAllProducts)
</script>

<style scoped>
/* Estilos opcionais, se quiser adicionar algo específico */
</style>
