import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as spotifyApi from '@renderer/api/spotify.api'
import { useConstants } from '@renderer/composables/constants.comp'

export const useSpotifyStore = defineStore('spotify', () => {
  const constants = useConstants()

  const tokenCheckInterval = ref<NodeJS.Timeout | null>(null)
  const isAuthorised = ref(false)

  function startTokenCheckInterval(): void {
    tokenCheckInterval.value = setInterval(async () => {
      if (isAuthorised.value) {
        // When authorised, reacquire token if no longer valid
        if (!(await spotifyApi.isTokenValid())) {
          await spotifyApi.reacquireToken()
        }
      } else {
        // When not authorised, check if the token is valid to set authorised
        isAuthorised.value = await spotifyApi.isTokenValid()
      }
    }, constants.SPOTIFY_TOKEN_CHECK_INTERVAL)
  }

  async function authorise(): Promise<void> {
    await spotifyApi.authorise()
  }

  return {
    isAuthorised,

    startTokenCheckInterval,

    authorise
  }
})
