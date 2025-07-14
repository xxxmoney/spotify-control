import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as webApi from '@renderer/api/spotify.api'
import SpotifyWebApi from 'spotify-web-api-js'
import { useEnv } from '@renderer/composables/env.comp'
import { useConstants } from '@renderer/composables/constants.comp'

export const useSpotifyStore = defineStore('spotify', () => {
  const constants = useConstants()

  const controlApi = new SpotifyWebApi()

  const isAuthorised = ref(false)
  const token = ref<string | null>(null)

  function setToken(newToken: string): void {
    token.value = newToken
    controlApi.setAccessToken(newToken)
  }

  async function authorise(): Promise<void> {
    const env = useEnv()

    await webApi.authorise({
      clientId: env.spotifyClientId,
      redirectUri: constants.SPOTIFY_REDIRECT_URL,
      scope: constants.SPOTIFY_SCOPES.join(' ')
    })
  }

  return {
    controlApi,

    isAuthorised,

    setToken,
    authorise
  }
})
