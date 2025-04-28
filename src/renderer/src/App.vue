<script setup lang="ts">
import {useElectronAPI} from "@renderer/composables/api.comp";

const api = useElectronAPI();

const handle = async () => {
  const result = await api.getDevices();
  console.log(result);
};
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Created by <code>xxxmoney</code></div>
  <div class="text">
    Dummy text
  </div>
  <p class="tip">
    Dummy tip text
  </p>
  <div class="actions">
      <button class="action" @click="handle">
        Get devices
      </button>
  </div>
</template>
