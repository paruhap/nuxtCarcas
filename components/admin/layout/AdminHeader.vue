<script setup lang="ts">
import Logout from '~/components/elements/logout.vue';
import AdminMenu from '../AdminMenu.vue';

</script>

<template>
    <header class="flex justify-between  items-center p-4">
        <span>Название</span>
        <AdminMenu/>
        <Logout/>
        <ThemeToggle/>
    </header>
</template>

<style scoped>

</style>