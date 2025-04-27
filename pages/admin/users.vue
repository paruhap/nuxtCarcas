<!-- pages/users.vue -->
<template>
  <div class="container">
      <div>
        <h2>Админ-панель Пользователи</h2>
        <div class="add-user-btn-wrap" @click="isModalOpen = true">
          <p v-if="user">Добро пожаловать, {{ user.name }}</p>
          <p v-else>Загрузка...</p>
          <button class="border border-solid border-gray-500 p-4">Выйти</button>
        </div>
        <h2>Users</h2>
        <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
        </ul>
      </div> 
      <SideModal v-model="isModalOpen" >
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="form.name" type="text" required>
          </div>
         
          <div class="form-group">
            <label>Email:</label>
            <input v-model="form.email" type="email" required>
          </div>
         
          <button type="submit" :disabled="loading">
            {{ loading ? 'Sending...' : 'Submit' }}
          </button>
         
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="success" class="success">User added successfully! ID: {{ success }}</div>
        </form>
      </SideModal>          
      <!-- <Teleport to="body">
            <transition name="modal" @click="isModalOpen = false">
                <div v-if="isModalOpen" class="modal">
                    <div class="close-icon cursor-pointer" @click="isModalOpen = false">x</div>
                    <div class="modal-content">
                      <form @submit.prevent="submitForm">
                        <div class="form-group">
                          <label>Name:</label>
                          <input v-model="form.name" type="text" required>
                        </div>
                      
                        <div class="form-group">
                          <label>Email:</label>
                          <input v-model="form.email" type="email" required>
                        </div>
                      
                        <button type="submit" :disabled="loading">
                          {{ loading ? 'Sending...' : 'Submit' }}
                        </button>
                      
                        <div v-if="error" class="error">{{ error }}</div>
                        <div v-if="success" class="success">User added successfully! ID: {{ success }}</div>
                      </form>
                    </div>
                </div>
            </transition>
      </Teleport> -->
  </div>
</template>
  
<script setup>
  definePageMeta({
  layout: 'admin'
})

const isModalOpen = ref(false);

  const form = ref({
    name: '',
    email: ''
  })
  
  const loading = ref(false)
  const error = ref('')
  const success = ref('')
  
  const submitForm = async () => {
    try {
      loading.value = true
      error.value = ''
      success.value = ''
  
      const { data } = await useFetch('/api/users', {
        method: 'POST',
        body: form.value
      })
  
      success.value = data.value.id
      form.value = { name: '', email: '' }
    } catch (e) {
      error.value = e.data?.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const user = ref(null)
  const { data: users } = await useFetch('/api/users')
  onMounted(() => {
  const { user: sessionUser } = useUserSession()
  user.value = sessionUser.value
})
</script>