<script setup lang="ts">
const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Created by <code>xxxmoney</code></div>
  <div class="text">
    Dummy text
  </div>
  <p class="tip">Dummy tip text</p>
  <div class="actions">
      <button class="action" @click="ipcHandle">Dummy action</button>
  </div>
</template>
