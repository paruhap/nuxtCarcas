<!-- pages/users.vue -->
<template>
    <div class="container-fluid p-4">
      <div class="admin-team-topc--content flex justify-start items-center gap-8">
        <h2>Добавить нового сотрудника</h2>
        <div class="admin-team-add-btn">
          <button class="bg-slate-500" @click="isModalOpen=true">Добавить</button>
        </div>
      </div>
      <div class="admin-team-item-list">
        <ul class="admin-team-item-list-ul">
          <li v-for="item in teams" :key="item.id">  
            <span>{{item.name}}</span> 
            <span>{{item.secondname}}</span>
            <span>{{item.lastname}}</span>
            <span>{{item.email}}</span> 
            <span>{{item.phone}}</span> 
            <span>{{item.telegram}}</span>         
            <span>{{item.whatsapp}}</span> 
            <span>{{item.title}}</span> 
            <span>{{item.subtitle}}</span> 
            <span>{{item.description}} </span>
            <span>{{item.maintext}}</span> 
            <span>{{item.list}} </span>
            <span>{{item.link}}</span>
          </li>
        </ul>
      </div>
      <Teleport to="body">
            <transition name="modal">
                <div v-if="isModalOpen" class="modal">
                    <div class="close-icon cursor-pointer" @click="isModalOpen = false">x</div>
                    <div class="modal-content">
                      <form v-if="showModal=true" @submit.prevent="submitForm">
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
                </div>
            </transition>
      </Teleport>
    </div>
  </template>
  
<script setup>
  definePageMeta({
  layout: 'admin'
  })
  const isModalOpen = ref(false);
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
    const dataForm = await $fetch('/api/team', {
      method: 'POST',
      body: form.value
    })

    success.value = dataForm.id
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
    error.value = e.dataForm?.message || 'An error occurred'
  } finally {
    loading.value = false
  }
  }

  const user = ref(null)
  const { data: teams } = await useFetch('/api/team')
  onMounted(() => {
    const { user: sessionUser } = useUserSession()
    user.value = sessionUser.value
  })
</script>
  

<style>
.form-group > input, textarea{
background: none;
border: 1px solid var(--l-color);
}
</style>