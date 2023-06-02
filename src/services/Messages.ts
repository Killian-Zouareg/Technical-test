import axios, { AxiosResponse } from 'axios'

export default class MessageService {
    
    public async GetMessages(): Promise<AxiosResponse<string[]>> {
        try {
            const response = await axios.get<string[]>("http://localhost:8080/messages")
            return response
        } catch (error) {
            console.error("Une erreur est survenue")
            throw error
        }
    }
}