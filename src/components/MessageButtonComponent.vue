<template>
    <v-row>
        <v-col>

            <!-- Generate Message Button -->
            <v-btn @click="getRandomMessage()">Generate message</v-btn>

            <!-- Dialog and Button for All Messages -->
            <v-dialog v-model="dialogAllMessages" width="auto">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="mx-4" @click="loadMessages">Get all messages</v-btn>
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

            <!-- Dialog and Button for a New Messages -->
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
import { useLoadingStore } from '../store/loading'
import { onBeforeMount } from 'vue';

let dialogAllMessages = ref(false)
let dialogNewMessage = ref(false)

let random = ref(0)

let tag = ref("")
let message = ref("")
let code = ref("")

// Init Store and Service
const messageService = new MessageService()
const messagesStore = useMessageStore()
const loading = useLoadingStore()

// Defining Emits
const emits = defineEmits(["generate-message"])

onBeforeMount(() => {
    loadMessages()
})

/**
 * Get a random message from the store
 */
function getRandomMessage(): void {
    loading.triggerLoading({isLoading: true, loadingText: "Getting a message"})
    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * messagesStore.messages.length);
        if (random.value !== randomIndex) {
            emits('generate-message',messagesStore.messages[randomIndex].message)      
        } else {
            getRandomMessage()
        }
        loading.triggerLoading({isLoading: false, loadingText: ""})   
    }, 3000);
}

/**
 * Submit a newMessage
 * @param code code that will be sent
 * @param tag tag that will be sent
 * @param message message that will be sent
 */
function submitNewMessage(code: string, tag: string, message: string): void {
    console.log("test")
    messageService.SendMessage({code: parseInt(code), tag: tag, message: message}).catch((error) => {
        console.error(error)
    })
    loadMessages()
}

/**
 * Load all the messages from the store
 */
 function loadMessages(): void {
    messageService.GetMessages().then((response) => {
        const newMessages = []
        for (let i = 0; i < response.data.excuses.length; i++) {
            const message = response.data.excuses[i]
            newMessages.push({code: message.http_code,message:message.message,tag: message.tag})
        }
        messagesStore.messages = newMessages
    }).catch((error) => {
        console.error(error)
    })
}




</script>