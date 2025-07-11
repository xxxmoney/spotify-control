export function handleSpotifyAuthCallback(urlParams: string): void {
  const raw_code = /access_token=([^&]*)/.exec(url) || null
  const token = raw_code && raw_code.length > 1 ? raw_code[1] : null

  if (token) {
    console.log('Token captured in main process:', token)

    // TODO: send token to renderer process or store it as needed
  }
}
