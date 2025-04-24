<script setup>
import { ref, onMounted } from 'vue'

const { loggedIn, user, fetch, clear } = useUserSession()
const email = ref('')
const password = ref('')
const error = ref('')

onMounted(() => {
  fetch() // Загружаем данные сессии только на клиенте
})

const login = async () => {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await fetch() // Обновляем сессию после входа
    navigateTo('/admin')
  } catch (e) {
    error.value = 'Ошибка входа'
  }
}
</script>

<template>
  <div>
    <h1>Вход</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>