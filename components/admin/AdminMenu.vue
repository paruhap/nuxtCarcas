<script setup lang="ts">
import { NuxtLink } from '#components';

</script>

<template>
    <ul class="admin-menu">
        <li><NuxtLink to="/admin">Главная</NuxtLink></li>
        <li><NuxtLink to="/admin/users">Админы</NuxtLink></li>
        <li><NuxtLink to="/admin/team">Соотрудники</NuxtLink></li>
    </ul>
</template>