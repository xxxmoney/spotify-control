<script setup lang="ts">
import * as routeConstants from '@renderer/constants/route.contants'
import { useRouter } from 'vue-router'

const router = useRouter()

async function goToDevices(): Promise<void> {
  await router.push({ name: routeConstants.DEVICES })
}
</script>

<template>
  <div class="home-page">
    <div class="title">Spotify Control</div>

    <button class="action" @click="goToDevices">Show devices</button>
  </div>
</template>
