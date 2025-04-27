<template>
  <select v-model="selectedTheme" class="p-2 border rounded">
    <option value="system">Системная</option>
    <option value="light">Светлая</option>
    <option value="dark">Тёмная</option>
  </select>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const selectedTheme = computed({
  get: () => colorMode.preference,
  set: (value: 'system' | 'light' | 'dark') => {
    colorMode.preference = value
  }
})
</script>