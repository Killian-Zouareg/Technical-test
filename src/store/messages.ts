import { defineStore } from "pinia"
import Message from "../core/message"

export const useMessageStore = defineStore({
    id: "messages",
    state: () => ({
        messages: [] as Message[],
    })
})