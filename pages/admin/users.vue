<!-- pages/users.vue -->
<template>
    <div class="container">
      <h1>Add User</h1>
      
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
  </template>
  
  <script setup>
  definePageMeta({
  layout: 'admin'
})
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