<script setup lang="ts">
import Logout from '~/components/elements/logout.vue';
import AdminMenu from '../AdminMenu.vue';

</script>

<template>
    <header>
        <span>Название</span>
        <AdminMenu/>
        <Logout/>
    </header>
</template>

<style scoped>
header{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
header ul{
    display: flex;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    list-style: none;
}
</style>