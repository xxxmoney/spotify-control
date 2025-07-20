import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useConstants } from '@renderer/composables/constants.comp'

export const useSpotifyStore = defineStore('spotify', () => {
  const constants = useConstants()

  const tokenCheckInterval = ref<NodeJS.Timeout | null>(null)
  const isAuthorised = ref(false)

  async function authorize(): Promise<void> {
    // If code was already acquired, set authorised straight to true
    if (await window.api.spotify.isCodeValid()) {
      isAuthorised.value = true
    } else {
      await window.api.spotify.authorise()
    }
  }

  function startTokenCheckInterval(): void {
    tokenCheckInterval.value = setInterval(async () => {
      if (isAuthorised.value) {
        // When authorised, reacquire token if no longer valid
        if (!(await window.api.spotify.isTokenValid())) {
          await window.api.spotify.reacquireToken()
        }
      } else {
        // When not authorised, check if the token is valid to set authorised
        isAuthorised.value = await window.api.spotify.isTokenValid()
      }
    }, constants.SPOTIFY_TOKEN_CHECK_INTERVAL)
  }

  return {
    isAuthorised,

    startTokenCheckInterval,

    authorize
  }
})
