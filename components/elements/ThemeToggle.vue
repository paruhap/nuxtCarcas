<template>
    <button 
      @click="toggleTheme"
      class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      <span v-if="$colorMode.value === 'dark'">🌞</span>
      <span v-else>🌙</span>
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      toggleTheme() {
        this.$colorMode.preference = 
          this.$colorMode.value === 'dark' ? 'light' : 'dark'
      }
    }
  }
  </script>