import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as webApi from '@renderer/api/spotify.api'
import SpotifyWebApi from 'spotify-web-api-js'
import { SPOTIFY_SCOPES } from '@/shared/constants'

export const useSpotifyStore = defineStore('counter', () => {
  const controlApi = new SpotifyWebApi()

  const isAuthorised = ref(false)
  const token = ref<string | null>(null)

  function setToken(newToken: string): void {
    token.value = newToken
    controlApi.setAccessToken(newToken)
  }

  async function authorise(): Promise<void> {
    // TODO: proper calling of authorise
    await webApi.authorise({
      clientId: null,
      redirectUri: null,
      scope: SPOTIFY_SCOPES.join(' ')
    })
  }

  return {
    api: controlApi,

    isAuthorised,

    authorise,
    setToken
  }
})
