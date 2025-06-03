<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">{{ product.title }}</h1>
    <img :src="product.thumbnail" :alt="product.title" class="h-40 mx-auto">
    <p class="text-gray-700 mt-2">R$ {{ product.price }}</p>
    <p class="mt-4">{{ product.description }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref({})

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products/${route.params.id}`)
    product.value = data
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
  }
})
</script>
