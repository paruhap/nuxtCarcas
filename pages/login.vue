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
  <div class="login-page flex justify-around items-center p-8 h-dvh">
    <div class="login-page-form flex flex-col justify-center items-center gap-4 border border-solid border-gray p-4">
      <h2>Вход в админ панель</h2>
      <input v-model="email" placeholder="Email" class="border border-solid border-gray" />
      <input v-model="password" type="password" placeholder="Пароль" class="border border-solid border-gray"/>
      <button @click="login"class="border border-solid border-gray bg-gray-300 p-2">Войти</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style>
/* .login-page {
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.login-page-form {
  border: 1px solid var(--dark-color);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
} */
</style>