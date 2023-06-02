<template>
    <v-row>
        <v-col>
            <v-btn @click="getRandomMessage()">Generate message</v-btn>
            <v-dialog v-model="dialogAllMessages" width="auto">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="mx-4">Get all messages</v-btn>
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
            <v-dialog v-model="dialogNewMessage" width="auto">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">Add a new excuse</v-btn>
                </template>
                
                <v-sheet width="300" class="mx-auto">
                    <v-form @submit.prevent>
                        <v-text-field v-model="code" label="Code"></v-text-field>
                        <v-text-field v-model="tag" label="Tag"></v-text-field>
                        <v-text-field v-model="message" label="Message"></v-text-field>
                        <v-btn v-if="tag.length === 0 || message.length === 0 || code.length === 0" disabled block>submit</v-btn>
                        <v-btn v-else @click="submitNewMessage(code,tag,message)" block>Submit</v-btn>
                    </v-form>
                </v-sheet>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageService from '../services/Messages'
import { useMessageStore } from '../store/messages'
import { onBeforeMount } from 'vue';

let dialogAllMessages = ref(false)
let dialogNewMessage = ref(false)

let random = ref(0)

let tag = ref("")
let message = ref("")
let code = ref("")

const messageService = new MessageService()
const messagesStore = useMessageStore()
const emits = defineEmits(["generate-message"])

onBeforeMount(() => {
    loadMessages()
})

function getRandomMessage(): void {
    let randomIndex = Math.floor(Math.random() * messagesStore.messages.length);
    if (random.value !== randomIndex) {
        emits('generate-message',messagesStore.messages[randomIndex].message)      
    } else {
        getRandomMessage()
    }
}

function submitNewMessage(code: string, tag: string, message: string): void {
    messageService.SendMessage({code: parseInt(code), tag: tag, message: message})
    loadMessages()
}

function loadMessages(): void {
    messageService.GetMessages().then((response) => {
        for (let i = 0; i < response.data.excuses.length; i++) {
            const message = response.data.excuses[i]
            messagesStore.messages.push({code: message.http_code,message:message.message,tag: message.tag})
        }
    }).catch((error) => {
        console.error(error)
    })
}



</script>