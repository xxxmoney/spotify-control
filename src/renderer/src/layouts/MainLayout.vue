<script setup lang="ts">
import NavBar from '@renderer/components/layout/NavBar.vue'
import { useCheckingStore } from '@renderer/stores/checking.store'
import { computed } from 'vue'

const checkingStore = useCheckingStore()

const isRunning = computed(() => checkingStore.isChecking)
</script>

<template>
  <header>
    <NavBar v-if="!isRunning" />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>Created by <code>xxxmoney</code></p>
  </footer>
</template>
