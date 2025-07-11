export function handleSpotifyAuthCallback(params: { [p: string]: string }): void {
  const token = params['access_token']

  if (token) {
    console.log('Token captured in main process:', token)

    // TODO: send token to renderer process or store it as needed
  }
}
