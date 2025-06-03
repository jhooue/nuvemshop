<!-- src/views/ProductDetailView.vue -->
<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-500">
      Carregando produto…
    </div>

    <!-- Produto encontrado -->
    <div v-else-if="product" class="grid gap-6 md:grid-cols-2">
      <!-- Imagens -->
      <div>
        <img
          :src="selectedImage"
          :alt="product.title"
          class="w-full h-80 object-cover rounded mb-4"
        />
        <div class="flex gap-2 overflow-x-auto">
          <button
            v-for="img in product.images"
            :key="img"
            @click="selectedImage = img"
            class="border-2 rounded overflow-hidden focus:outline-none"
            :class="{
              'border-indigo-600': selectedImage === img,
              'border-transparent': selectedImage !== img
            }"
          >
            <img
              :src="img"
              class="w-24 h-24 object-cover"
              :alt="product.title"
            />
          </button>
        </div>
      </div>

      <!-- Detalhes -->
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-600 mb-4 capitalize">{{ product.category }}</p>
        <p class="text-indigo-600 text-2xl font-bold mb-4">
          R$ {{ product.price }}
        </p>
        <p class="mb-4">Estoque: {{ product.stock }}</p>
        <p class="mb-6">{{ product.description }}</p>
        <!-- Botão desabilitado até implementar o carrinho -->
        <button
          disabled
          class="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>

    <!-- Não encontrado -->
    <div v-else class="text-center text-red-500">
      Produto não encontrado.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api.js'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const selectedImage = ref('')

async function loadProduct() {
  loading.value = true
  try {
    const res = await api.get(`/products/${route.params.id}`)
    product.value = res.data
    selectedImage.value = res.data.thumbnail
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
    product.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadProduct)
// Se o ID da rota mudar, recarrega o produto
watch(() => route.params.id, loadProduct)
</script>

<style scoped>
/* Toda estilização utiliza TailwindCSS */
</style>
