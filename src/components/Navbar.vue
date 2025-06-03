<!-- src/components/NavBar.vue -->
<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold text-indigo-600">
            NuvemShop
          </router-link>
        </div>

        <!-- Menu de Categorias (desktop) -->
        <div class="hidden md:block">
          <ul class="flex space-x-6">
            <li
              v-for="cat in categories"
              :key="cat.slug"
            >
              <router-link
                :to="`/category/${cat.slug}`"
                class="text-gray-700 hover:text-indigo-600 transition"
                :class="{ 'font-semibold text-indigo-600': isActive(cat.slug) }"
              >
                {{ cat.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Busca + Carrinho -->
        <div class="flex items-center space-x-4">
          <!-- Busca -->
          <div class="relative">
            <input
              v-model="searchTerm"
              @keyup.enter="onSearch"
              type="text"
              placeholder="Buscar..."
              class="w-40 sm:w-64 px-3 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="onSearch"
              class="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"/>
              </svg>
            </button>
          </div>

          <!-- Carrinho -->
          <router-link to="/cart" class="relative text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m0 0h12.4m-12.4 0a1 1 0
                       001 1h.01M17 19a1 1 0 001-1"/>
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-2 inline-flex items-center justify-center
                     px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
            >
              {{ cartCount }}
            </span>
          </router-link>
        </div>

        <!-- Mobile menu button (apenas exemplo; você pode implementar Drawer) -->
        <div class="md:hidden">
          <button @click="open = !open" class="text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div v-if="open" class="md:hidden mt-2 pb-4 border-t">
        <ul class="space-y-2">
          <li v-for="cat in categories" :key="cat.slug">
            <router-link
              @click="open = false"
              :to="`/category/${cat.slug}`"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              {{ cat.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Definição estática das categorias do DummyJSON
const categories = [
  { slug: 'laptops',           name: 'Laptops' },
  { slug: 'smartphones',       name: 'Smartphones' },
  { slug: 'tablets',           name: 'Tablets' },
  { slug: 'mobile-accessories',name: 'Acessórios' }
]

const route = useRoute()
const router = useRouter()

// controle do menu mobile
const open = ref(false)

// searchTerm v-model
const searchTerm = ref('')

// simulação de estado do carrinho (integre ao seu store)
const cartCount = ref(0)

// Ao pressionar Enter ou clicar na lupa
function onSearch() {
  // navega para a rota home com query ?q=...
  router.push({ path: '/', query: { q: searchTerm.value } })
}

// destaca categoria ativa
function isActive(slug) {
  return route.params.slug === slug
}
</script>

<style scoped>
/* Nenhum estilo extra—tudo via TailwindCSS */
</style>
