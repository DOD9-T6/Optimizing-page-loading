<template>
    <header class="header-container">
        <nav>
            <router-link class="header-link" to="/devextreme">DevExtreme</router-link>
            <router-link class="header-link" to="/vue">Vue</router-link>
            <router-link class="header-link" to="/quasar">Quasar</router-link>
        </nav>
    </header>
</template>

<script setup>

</script>

<style scoped>
.header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(29, 27, 27);
    font-size: 1.5rem;
    color: #fff;
    padding: 10px;
}
.header-link {
    color: #fff;
    margin-right: 100px;
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    padding: 10px;
    transition: all 1s ease;
}
.header-link:hover {
    background-color: #fff;
    color: #000;
}
</style>

