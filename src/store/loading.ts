import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
    id: 'loading',
    state: () => ({
        loading: false,
        loadingText: '',
    }),
    actions: {
        triggerLoading(payload: {isLoading: boolean,loadingText: string}): void {
            this.loadingText = payload.loadingText
            this.loading = payload.isLoading
        }
    }
})
