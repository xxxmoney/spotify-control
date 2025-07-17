import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as webApi from '@renderer/api/spotify.api'
//import SpotifyWebApi from 'spotify-web-api-js'
import { useEnv } from '@renderer/composables/env.comp'
import { useConstants } from '@renderer/composables/constants.comp'

export const useSpotifyStore = defineStore('spotify', () => {
  // TODO: move to main
  //const controlApi = new SpotifyWebApi()
  const constants = useConstants()
  const env = useEnv()

  const tokenCheckInterval = ref<NodeJS.Timeout | null>(null)
  const isAuthorised = ref(false)

  function startTokenCheckInterval(): void {
    tokenCheckInterval.value = setInterval(async () => {
      if (isAuthorised.value) {
        // When authorised, reacquire token if no longer valid
        if (!(await webApi.isTokenValid())) {
          await webApi.reacquireToken()
        }
      } else {
        // When not authorised, check if the token is valid to set authorised
        isAuthorised.value = await webApi.isTokenValid()
      }
    }, constants.SPOTIFY_TOKEN_CHECK_INTERVAL)
  }

  async function authorise(): Promise<void> {
    await webApi.authorise({
      clientId: env.spotifyClientId,
      redirectUri: constants.SPOTIFY_REDIRECT_URL,
      scope: constants.SPOTIFY_SCOPES.join(' '),
      responseType: constants.SPOTIFY_RESPONSE_TYPE
    })
  }

  return {
    isAuthorised,

    startTokenCheckInterval,

    authorise
  }
})
