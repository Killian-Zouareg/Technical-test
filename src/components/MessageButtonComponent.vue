<template>
    <v-row>
        <v-col>
            <v-btn>Generate message</v-btn>
            <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ props }">
                    <v-btn @click="GetAllMessages()" v-bind="props">Get all messages</v-btn>
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
                        <tr v-for="message in messages" :key="message.code">
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
import Message from '../core/message'

let dialog = ref(false)

let messages = ref<Message[]>([])

const messageService = new MessageService()

function GetAllMessages() {
    messageService.GetMessages().then((response) => {
        for (let i = 0; i < response.data.excuses.length; i++) {
            const message = response.data.excuses[i]
            messages.value.push({code: message.http_code,message:message.message,tag: message.tag})
        }

    }).catch((error) => {
        console.error(error)
    })
}

</script>