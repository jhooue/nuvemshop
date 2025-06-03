<!-- src/views/CategoryView.vue -->
<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Título da categoria -->
    <h1 class="text-2xl font-bold mb-6 capitalize">
      {{ formattedSlug }}
    </h1>

    <!-- Estado de carregamento -->
    <div v-if="loading" class="text-center text-gray-500">
      Carregando produtos…
    </div>

    <!-- Grid de produtos -->
    <div
      v-else
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <article
        v-for="prod in products"
        :key="prod.id"
        class="bg-white rounded shadow hover:shadow-lg p-4 flex flex-col"
      >
        <router-link
          :to="`/product/${prod.id}`"
          class="block overflow-hidden mb-4"
        >
          <img
            :src="prod.thumbnail"
            :alt="prod.title"
            class="w-full h-40 object-contain rounded transition-transform hover:scale-105"
          />
        </router-link>

        <h2 class="font-semibold text-gray-900 mb-2 truncate">
          {{ prod.title }}
        </h2>
        <p class="text-indigo-600 font-bold mb-2">R$ {{ prod.price }}</p>
        <p class="text-sm text-gray-500 mb-4">Estoque: {{ prod.stock }}</p>

        <router-link
          :to="`/product/${prod.id}`"
          class="mt-auto bg-indigo-600 text-white py-2 rounded text-center hover:bg-indigo-700 transition"
        >
          Ver Detalhes
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// captura o slug da rota
const route    = useRoute()
const slug     = ref(route.params.slug || '')
const products = ref([])
const loading  = ref(true)

// formata o slug para exibir
const formattedSlug = computed(() =>
  slug.value.replace(/[-_]/g, ' ')
)

// busca produtos pela categoria diretamente na API
async function loadByCategory() {
  loading.value = true
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${slug.value}?limit=0`
    )
    products.value = res.data.products
  } catch (e) {
    console.error('Erro ao carregar categoria:', e)
    products.value = []
  } finally {
    loading.value = false
  }
}

// reagir a mudanças no parâmetro da rota
watch(
  () => route.params.slug,
  newSlug => {
    slug.value = newSlug
    loadByCategory()
  }
)

// carregar ao montar
onMounted(loadByCategory)
</script>

<style scoped>
/* Todo estilo é feito com TailwindCSS */
</style>
