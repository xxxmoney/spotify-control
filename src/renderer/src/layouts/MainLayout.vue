<script setup lang="ts">
import NavBar from '@renderer/components/layout/NavBar.vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'

const store = useDeviceStore()

const isRunning = computed(() => store.isRunning)
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
