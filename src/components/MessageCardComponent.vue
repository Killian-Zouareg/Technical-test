<template>
  <v-row>
    <v-col>
      <v-card title="Ma super application !" width="600px" color="blue" class="py-3">
        <v-card-text>
          {{ message }}
        </v-card-text>
        <MessageButton @generate-message="displayMessage"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageButton from './MessageButtonComponent.vue';

let message = ref("")

/**
 * Display a random message
 * @param errorMessage message that will be displayed 
 */
function displayMessage(errorMessage: string): void {
  message.value = errorMessage
}
</script>
