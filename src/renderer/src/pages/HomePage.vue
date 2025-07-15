<script setup lang="ts">
import * as routeConstants from '@renderer/constants/route.constants'
import { useRouter } from 'vue-router'
import { useSpotifyStore } from '@renderer/stores/spotify.store'
import { computed, onMounted } from 'vue'

const router = useRouter()

const spotifyStore = useSpotifyStore()

const isAuthorised = computed(() => spotifyStore.isAuthorised)

async function goToDevices(): Promise<void> {
  await router.push({ name: routeConstants.DEVICES })
}

onMounted(async () => {
  if (!isAuthorised.value) {
    await spotifyStore.authorise()

    // TODO: wait somehow for callback with authentication - have to somehow get it from main
  }
})
</script>

<template>
  <div class="home-page">
    <div class="title">Spotify Control</div>

    <template v-if="!isAuthorised">
      <p class="center">Please authorise in Spotify to continue</p>
    </template>
    <template v-else>
      <button class="action" @click="goToDevices">Show devices</button>
    </template>
  </div>
</template>
