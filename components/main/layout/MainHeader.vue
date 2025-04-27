<template>
    <header class="flex justify-between items-center py-2 px-6">
        <div class="main-header-logo flex justify-start items-center basis-1/4">
            <img src="~/assets/img/logo-red.png" alt="">
        </div>
        <menu class="top-bar-menu basis-2/4 flex justify-center items-center">
            <MainMenu class="flex justify-between items-center gap-8 list-none text-xl"/>
        </menu>
        <div class="top-bar-phone basis-1/4 flex items-center justify-end">
            <a :href="'tel:'" class="top-bar-phone-link text-red-600 text-4xl">{{ contact[0].phone }}</a>
        </div>
    </header>
</template>

<script setup>
const { data: contact } = await useFetch('/api/users')
console.log(contact.value[0].phone)
</script>