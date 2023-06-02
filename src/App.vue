<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-container><a href="/" class="white--text">Symbol-it</a></v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView/>
      </v-container>
    </v-main>

  </v-app>
</template>
