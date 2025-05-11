<script setup lang="ts">
import * as routeConstants from '@renderer/constants/route.contants'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack(): void {
  router.back()
}
function goForward(): void {
  router.forward()
}
</script>

<template>
  <nav>
    <button class="action" @click="goBack">←</button>

    <RouterLink :to="{ name: routeConstants.HOME }" class="logo-container">
      <img alt="logo" class="logo" src="../../assets/electron.svg" />
    </RouterLink>

    <button class="action" @click="goForward">→</button>
  </nav>
</template>
