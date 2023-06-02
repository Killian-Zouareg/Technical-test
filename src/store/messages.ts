import { defineStore } from "pinia"
import Message from "../core/message"

export const useMessageStore = defineStore({
    id: "messages",
    state: () => ({
        messages: [] as Message[],
    }),
    getters: {
        getRandomMessage(state): any {
            if (this.messages.length === 0) {
                return "error fetching the message";
            }
            let randomIndex = Math.floor(Math.random() * state.messages.length);
            console.log(randomIndex)
            return state.messages[randomIndex].message;
        }
    }
})