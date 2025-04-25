<script setup>

const { clear } = useUserSession()

const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' })
  await clear()
  navigateTo('/login')
}
</script>

<template>
  <div>
    <button @click="logout">Выйти</button>
  </div>
</template>