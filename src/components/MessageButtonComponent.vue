<template>
    <v-row>
        <v-col>
            <v-btn @click="getRandomMessage()" class="mr-4">Generate message</v-btn>
            <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">Get all messages</v-btn>
                </template>

                <v-table fixed-header height="400px">
                    <thead>
                        <tr>
                            <th class="text-left">
                                http-code
                            </th>
                            <th class="text-left">
                                tag
                            </th>
                            <th class="text-left">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="message in messagesStore.messages" :key="message.code">
                            <td>{{ message.code }}</td>
                            <td>{{ message.tag }}</td>
                            <td>{{ message.message }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageService from '../services/Messages'
import { useMessageStore } from '../store/messages'
import { onBeforeMount } from 'vue';

let dialog = ref(false)

const messageService = new MessageService()
const messagesStore = useMessageStore()
const emits = defineEmits(["generate-message"])

onBeforeMount(() => {
    messageService.GetMessages().then((response) => {
        for (let i = 0; i < response.data.excuses.length; i++) {
            const message = response.data.excuses[i]
            messagesStore.messages.push({code: message.http_code,message:message.message,tag: message.tag})
        }
    }).catch((error) => {
        console.error(error)
    })
})

function getRandomMessage(): void {
    let randomMessage = messagesStore.getRandomMessage
    emits('generate-message', randomMessage)
}



</script>