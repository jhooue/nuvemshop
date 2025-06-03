<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Carrinho de Compras</h1>

    <!-- Carrinho vazio -->
    <div v-if="items.length === 0" class="text-center text-gray-500">
      Seu carrinho está vazio.
    </div>

    <!-- Lista de itens -->
    <div v-else class="space-y-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center bg-white rounded shadow p-4"
      >
        <img
          :src="item.thumbnail"
          :alt="item.title"
          class="w-20 h-20 object-cover rounded mr-4"
        />
        <div class="flex-1">
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-gray-500 mb-2">R$ {{ item.price }}</p>
          <div class="flex items-center gap-2">
            <button
              @click="decreaseQty(item)"
              class="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              @click="increaseQty(item)"
              class="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
        <button
          @click="removeItem(item.id)"
          class="text-red-600 hover:underline ml-4"
        >
          Remover
        </button>
      </div>

      <!-- Total -->
      <div class="text-right mt-6">
        <span class="text-xl font-bold">
          Total: R$ {{ totalPrice.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Se ainda não estiver usando store, deixamos items vazio
// e funções inativas para não quebrar a view.
const items = computed(() => [])

// totalPrice também vazio
const totalPrice = computed(() => 0)

function increaseQty(item) {
  // placeholder, ainda sem carrinho ativo
}

function decreaseQty(item) {
  // placeholder
}

function removeItem(id) {
  // placeholder
}
</script>

<style scoped>
/* Todo o estilo é feito com TailwindCSS */
</style>
