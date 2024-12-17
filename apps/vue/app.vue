<script setup lang="ts">
import { PopupProvider } from "@expressthat/core/vue";
import "@expressthat/core/vue.css";
</script>

<template>
  <PopupProvider>
    <div>
      <NuxtRouteAnnouncer />
      <Home />
    </div>
  </PopupProvider>
</template>
