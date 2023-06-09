import axios, { AxiosResponse } from 'axios'
import Message from '../core/message'

export default class MessageService {
    
    /**
     * Return all the messages from the service
     */
    public async GetMessages(): Promise<AxiosResponse<string[]>> {
        try {
            const response = await axios.get<string[]>("http://localhost:8080/messages")
            return response
        } catch (error) {
            console.error("Une erreur est survenue")
            throw error
        }
    }

    /**
     * POST a new message
     * @param message Message object that will be sent
     */
    public async SendMessage(message: Message): Promise<AxiosResponse> {
        try {
            const response = await axios.post("http://localhost:8080/AddExcuse", {http_code: message.code, tag: message.tag, message: message.message})
            return response
        } catch (error) {
            console.error("Une erreur est survenue")
            throw error
        }
    }
}