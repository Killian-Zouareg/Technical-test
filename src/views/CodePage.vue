<template>
    <v-row>
        <v-col>
            message d'erreur : {{  message }}
        </v-col>
    </v-row>

</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"
import MessageService from "../services/Messages"

const route = useRoute()
const messageService = new MessageService()

let message = ref<any>("")

onBeforeMount(() => {
    if (route.params !== undefined) {
        messageService.GetMessages().then((response) => {
            for (let i = 0; i < response.data.excuses.length; i++) {
            if (response.data.excuses[i].http_code.toString() === route.params.code.toString()) {
                message.value = response.data.excuses[i].message
            }
        }
        })
    }
})

</script>