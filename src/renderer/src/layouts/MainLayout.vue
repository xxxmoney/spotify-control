<script setup lang="ts">
import NavBar from '@renderer/components/layout/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>Created by <code>xxxmoney</code></p>
  </footer>
</template>
