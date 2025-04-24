<!-- pages/users.vue -->
<template>
    <div class="container">
      <h1>Add User</h1>
      
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Имя:</label>
          <input v-model="form.name" type="text" >
        </div>

        <div class="form-group">
          <label>Отчество:</label>
          <input v-model="form.secondname" type="text" >
        </div>

        <div class="form-group">
          <label>Фамилия:</label>
          <input v-model="form.lastname" type="text" >
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="form.email" type="email" >
        </div>
  
        <div class="form-group">
          <label>Телефон:</label>
          <input v-model="form.phone" type="text" >
        </div>

        <div class="form-group">
          <label>Telegram:</label>
          <input v-model="form.telegram" type="text" >
        </div>

        <div class="form-group">
          <label>WhatsApp:</label>
          <input v-model="form.whatsapp" type="text" >
        </div>

        <div class="form-group">
          <label>Заголовок:</label>
          <input v-model="form.title" type="text" >
        </div>

        <div class="form-group">
          <label>Подзаголовок:</label>
          <input v-model="form.subtitle" type="text" >
        </div>

        <div class="form-group">
          <label>Описание:</label>
          <textarea v-model="form.description" name="description" id=""></textarea>
        </div>

        <div class="form-group">
          <label>Текст:</label>
          <textarea v-model="form.maintext" name="description" id=""></textarea>
        </div>

        <div class="form-group">
          <label>Список:</label>
          <textarea v-model="form.list"  name="description" id=""></textarea>
        </div>

        <div class="form-group">
          <label>Ссылка:</label>
          <input v-model="form.link" type="text" >
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Sending...' : 'Submit' }}
        </button>
  
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">User added successfully! ID: {{ success }}</div>
      </form>
    </div>
  </template>
  
  <script setup>
  const form = ref({
    name: '',
    secondname: '',
    lastname:'',
    email: '',
    phone:'',
    telegram:'',
    whatsapp:'',
    title:'',
    subtitle:'',
    description:'',
    maintext:'',
    list:'',
    link:''
  })
  
  const loading = ref(false)
  const error = ref('')
  const success = ref('')
  
  const submitForm = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = ''

    // Исправленная часть
    const data = await $fetch('/api/team', {
      method: 'POST',
      body: form.value
    })

    success.value = data.id
    form.value = { 
      name: '',
      secondname: '',
      lastname: '',
      email: '',
      phone: '',
      telegram: '',
      whatsapp: '',
      title: '',
      subtitle: '',
      description: '',
      maintext: '',
      list: '',
      link: ''
    }
  } catch (e) {
    error.value = e.data?.message || 'An error occurred'
  } finally {
    loading.value = false
  }
  }
  </script>
  
  <style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  button {
    background: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  
  .error {
    color: #dc3545;
    margin-top: 1rem;
  }
  
  .success {
    color: #28a745;
    margin-top: 1rem;
  }
  </style>