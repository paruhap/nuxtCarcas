<!-- pages/users.vue -->
<template>
  <div class="container">
    <div>
      <h2>Админ-панель Пользователи</h2>
      <div class="add-user-btn-wrap" @click="openAddModal">
        <p v-if="user">Добро пожаловать, {{ user.name }}</p>
        <p v-else>Загрузка...</p>
        <button class="border border-solid border-gray-500 p-4">Выйти</button>
      </div>
      <h2>Users</h2>
      <ul>
        <li v-for="u in usersList" :key="u.id" class="flex items-center gap-2">
          <span>{{ u.name }} - {{ u.email }}</span>
          <button @click="openEditModal(u)" class="px-2 py-1 bg-blue-500 text-white rounded">Редактировать</button>
          <button @click="deleteUser(u.id)" class="px-2 py-1 bg-red-500 text-white rounded">Удалить</button>
        </li>
      </ul>
    </div>
    <SideModal v-model="isModalOpen">
      <form @submit.prevent="submitForm" class="users-form flex flex-col justify-center items-center gap-2">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="form.name" type="text" required>
        </div>
        <div class="form-group">
          <label>Address:</label>
          <input v-model="form.addres" type="text">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="form.email" type="email">
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input v-model="form.phone" type="text">
        </div>
        <div class="form-group">
          <label>Telegram:</label>
          <input v-model="form.telegram" type="text">
        </div>
        <div class="form-group">
          <label>WhatsApp:</label>
          <input v-model="form.whatsapp" type="text">
        </div>
        <div class="form-group">
          <label>VK:</label>
          <input v-model="form.vk" type="text">
        </div>
        <div class="form-group">
          <label>Instagram:</label>
          <input v-model="form.insta" type="text">
        </div>
        <div class="form-group">
          <label>Title:</label>
          <input v-model="form.title" type="text">
        </div>
        <div class="form-group">
          <label>Subtitle:</label>
          <input v-model="form.subtitle" type="text">
        </div>
        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="form.description"></textarea>
        </div>
        <div class="form-group">
          <label>Main Text:</label>
          <textarea v-model="form.maintext"></textarea>
        </div>
        <div class="form-group">
          <label>Worktime:</label>
          <input v-model="form.worktime" type="text">
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Sending...' : (editMode ? 'Сохранить' : 'Добавить') }}
        </button>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">User {{ editMode ? 'updated' : 'added' }} successfully! ID: {{ success }}</div>
      </form>
    </SideModal>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'admin'
  })

  const isModalOpen = ref(false)
  const editMode = ref(false)
  const editingId = ref(null)

  const form = ref({
    name: '',
    addres: '',
    email: '',
    phone: '',
    telegram: '',
    whatsapp: '',
    vk: '',
    insta: '',
    title: '',
    subtitle: '',
    description: '',
    maintext: '',
    worktime: ''
  })

  const loading = ref(false)
  const error = ref('')
  const success = ref('')

  const { data: users, refresh } = await useFetch('/api/users')
  const usersList = computed(() => users.value || [])

  const openAddModal = () => {
    editMode.value = false
    editingId.value = null
    Object.assign(form.value, {
      name: '',
      addres: '',
      email: '',
      phone: '',
      telegram: '',
      whatsapp: '',
      vk: '',
      insta: '',
      title: '',
      subtitle: '',
      description: '',
      maintext: '',
      worktime: ''
    })
    isModalOpen.value = true
  }

  const openEditModal = (u) => {
    editMode.value = true
    editingId.value = u.id
    Object.assign(form.value, { ...u })
    isModalOpen.value = true
  }

  const submitForm = async () => {
    try {
      loading.value = true
      error.value = ''
      success.value = ''
      if (editMode.value) {
        // PUT для обновления
        await $fetch('/api/users', {
          method: 'PUT',
          body: { ...form.value, id: editingId.value }
        })
        success.value = editingId.value
      } else {
        // POST для создания
        const data = await $fetch('/api/users', {
          method: 'POST',
          body: form.value
        })
        success.value = data.id
      }
      isModalOpen.value = false
      await refresh()
    } catch (e) {
      error.value = e.data?.message || e.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id) => {
    if (!confirm('Удалить пользователя?')) return
    loading.value = true
    try {
      await $fetch('/api/users', {
        method: 'DELETE',
        body: { id }
      })
      await refresh()
    } catch (e) {
      error.value = e.data?.message || e.message || 'Ошибка удаления'
    } finally {
      loading.value = false
    }
  }

  const user = ref(null)
  onMounted(() => {
    const { user: sessionUser } = useUserSession()
    user.value = sessionUser.value
  })
</script>

<style scoped>
  .form-group{
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
</style>