<template>
    <header>
        <div class="main-header-logo">main-logo-img</div>
        <menu class="top-bar-menu">
            <MainMenu/>
        </menu>
    </header>
</template>

<style scoped>
header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.top-bar-menu ul{
display: flex;
justify-content: space-between;
align-items: center;
gap: 2rem;
list-style: none;
}
</style>