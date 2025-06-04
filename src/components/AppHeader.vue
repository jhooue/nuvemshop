<template>
  <header class="bg-white shadow fixed top-0 inset-x-0 w-full z-50">
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
      <div class="flex-shrink-0 flex items32-center space-x-4">
        <!-- Carrinho -->
        <router-link to="/cart" class="text-gray-700 hover:text-gray-900" aria-label="Carrinho">
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
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 9.75L12 4l9 5.75v8.5A2.75 2.75 
                     0 0118.25 21h-12A2.75 2.75 0 
                     013 18.25v-8.5z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 21V12H15V21"/>
          </svg>
        </router-link>
        <!-- Botão para abrir o menu lateral -->
        <button @click="$emit('open-sidebar')" class="text-gray-700 hover:text-gray-900" aria-label="Opções">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const searchTerm = ref('')

// Se quiser emitir o evento para abrir o sidebar
defineEmits(['open-sidebar'])
</script>
