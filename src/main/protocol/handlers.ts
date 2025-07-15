export function handleSpotifyAuthCallback(params: { [p: string]: string }): void {
  const code = params['code']

  if (code) {
    console.log('Code captured in main process:', code)

    // TODO: send code to renderer process or store it as needed
  }
}
