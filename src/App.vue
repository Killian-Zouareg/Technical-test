<template>
  <v-app>
    <v-app-bar app>
      <v-container><a href="/" class="white--text">Symbol-it</a></v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView/>
      </v-container>

      <!-- Loading Overlay -->
      <v-overlay :model-value="loading.loading" class="align-center justify-center">
        <v-progress-circular v-if="loading.loading" indeterminate size="50"></v-progress-circular>
        <strong class="pl-5">
          {{ loading.loadingText }}
        </strong>
    </v-overlay>
    </v-main>
    

  </v-app>
</template>

<script setup lang="ts">
import { useLoadingStore } from './store/loading';

const loading = useLoadingStore()
</script>
