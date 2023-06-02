<template>
    <v-row>
        <v-col cols="12">
            <h1>404: Page non trouvé (redirection...)</h1>
            <v-img src="https://media.tenor.com/RPcJQct20RwAAAAi/sadge-rain.gif" width="200px"></v-img>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

setTimeout(() => {
    router.push("/")
}, 5000);

</script>