<script setup lang="ts">
import {useElectronAPI} from "@renderer/composables/api.comp";
import {onMounted, ref} from "vue";
import * as HID from "node-hid";

const api = useElectronAPI();

const devices = ref([] as HID.Device[]);

const getDevices = async () => {
  devices.value = [];
  devices.value = await api.getDevices();
};

const showDevice = async (device: HID.Device) => {
  // TODO
};

onMounted(async () => {
  await getDevices();
});
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Created by <code>xxxmoney</code></div>
  <div class="text">
    Spotify Control
  </div>
  <p class="tip">
    Select device:
  </p>

  <button class="action" @click="getDevices">
    Refresh
  </button>

  <div class="devices">
    <div :key="device.productId" v-for="device in devices" class="device">
      <button class="action" @click="showDevice(device)">
        {{device.manufacturer}} {{ device.product }}
      </button>
    </div>
  </div>
<!--  <div class="actions">-->
<!--      <button class="action" @click="handle">-->
<!--        Get devices-->
<!--      </button>-->
<!--  </div>-->
</template>
