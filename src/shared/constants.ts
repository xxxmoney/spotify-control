import { VUEJS_DEVTOOLS_BETA } from 'electron-devtools-installer'

export const DEFAULT_WIDTH = 800
export const DEFAULT_HEIGHT = 600
export const MIN_WIDTH = 400
export const MIN_HEIGHT = 600

export const EXTENSIONS = [VUEJS_DEVTOOLS_BETA]

export const SPOTIFY_AUTHORISE_URL = 'https://accounts.spotify.com/authorize'
export const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming'
]
