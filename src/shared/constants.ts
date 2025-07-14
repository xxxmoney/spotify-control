import { VUEJS_DEVTOOLS_BETA } from 'electron-devtools-installer'
import { Constants } from '@/shared/types'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const MIN_WIDTH = 400
const MIN_HEIGHT = 600

const EXTENSIONS = [VUEJS_DEVTOOLS_BETA]

const APP_PROTOCOL = 'app-spotify-control'

const PROTOCOL_HANDLERS = {
  SPOTIFY_AUTH: 'spotify-auth'
}

const SPOTIFY_AUTHORISE_URL = 'https://accounts.spotify.com/authorize'
const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming'
]
const SPOTIFY_REDIRECT_URL = `${APP_PROTOCOL}://spotify-auth`

const BRIDGE_EXPOSE = {
  ELECTRON: 'electron',
  API: 'api',
  ENV: 'env',
  CONSTANTS: 'constants'
}

const constants: Constants = {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  MIN_WIDTH,
  MIN_HEIGHT,

  EXTENSIONS,

  APP_PROTOCOL,

  PROTOCOL_HANDLERS,

  SPOTIFY_AUTHORISE_URL,
  SPOTIFY_SCOPES,
  SPOTIFY_REDIRECT_URL,

  BRIDGE_EXPOSE
}
export default constants
