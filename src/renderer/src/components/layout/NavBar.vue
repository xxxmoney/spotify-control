<script setup lang="ts">
import * as routeConstants from '@renderer/constants/route.contants'
</script>

<template>
  <nav>
    <RouterLink :to="{ name: routeConstants.HOME }">
      <img alt="logo" class="logo" src="../../assets/electron.svg" />
    </RouterLink>

    <RouterLink :to="{ name: routeConstants.DEVICES }"> Devices </RouterLink>
  </nav>
</template>
