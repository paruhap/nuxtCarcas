<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({
  layout: 'admin'
})

const user = ref(null)
const { data: users } = await useFetch('/api/users')
onMounted(() => {
  const { user: sessionUser } = useUserSession()
  user.value = sessionUser.value
})
</script>

<template>
  <div>
    <h1>Админ-панель</h1>
    <p v-if="user">Добро пожаловать, {{ user.name }}</p>
    <p v-else>Загрузка...</p>
    <div>
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    </div>
  </div>
</template>