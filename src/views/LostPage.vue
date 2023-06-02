<template>
    <v-row>
        <v-col>
            <p>I'M LOST ? (don't worry you're being redirected...)</p>
            <v-img src="https://media.tenor.com/5R1whvx7pOkAAAAC/lost-johntravolta.gif" cover>
            </v-img>
        </v-col>
    </v-row>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

setTimeout(() => {
      router.push("/")
}, 5000);

</script>