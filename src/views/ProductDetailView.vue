<!-- src/views/ProductDetailView.vue -->
<template>
  <div class="mt-16 max-w-4xl mx-auto p-6">
    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500">
      Carregando produto…
    </div>

    <!-- Produto carregado -->
    <div v-else-if="product" class="grid gap-6 md:grid-cols-2">
      <!-- Galeria de imagens -->
      <div>
        <img
          :src="selectedImage"
          :alt="product.title"
          class="w-full h-80 object-contain rounded mb-4"
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
              class="w-24 h-24 object-contain"
              :alt="product.title"
            />
          </button>
        </div>
      </div>

      <!-- Detalhes do produto -->
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-600 mb-4 capitalize">{{ product.category }}</p>
        <p class="text-indigo-600 text-2xl font-bold mb-4">
          R$ {{ product.price }}
        </p>
        <p class="mb-4">Estoque: {{ product.stock }}</p>
        <p class="mb-6">{{ product.description }}</p>
        <router-link
          to="/"
          class="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Voltar ao catálogo
        </router-link>
      </div>
    </div>

    <!-- Se nada for encontrado -->
    <div v-else class="text-center text-red-500">
      Produto não encontrado.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const selectedImage = ref('')

async function loadProduct() {
  loading.value = true
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${route.params.id}`
    )
    product.value = data
    selectedImage.value = data.thumbnail
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
    product.value = null
  } finally {
    loading.value = false
  }
}

// Carrega ao montar e quando o :id mudar
onMounted(loadProduct)
watch(() => route.params.id, loadProduct)
</script>

<style scoped>
/* Toda estilização via TailwindCSS */
</style>
