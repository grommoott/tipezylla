import { create } from "zustand"

type Subscriber = {
    identity: any
    callback: (e: KeyboardEvent) => void
}

type Store = {
    onGlobalKeyDown: (e: KeyboardEvent) => void
    subscribeGlobalKeyDown: (
        callback: (e: KeyboardEvent) => void,
        indentity: any,
    ) => void
    unsubscribeGlobalKeyDown: (subscriber: any) => void
    subscribers: Subscriber[]
}

export const useGlobalKeyDownStore = create<Store>((set) => ({
    onGlobalKeyDown: (e) =>
        set((state) => {
            for (const subscriber of state.subscribers) {
                if (
                    subscriber &&
                    subscriber.identity &&
                    !!subscriber.callback
                ) {
                    subscriber.callback(e)
                }
            }

            return {}
        }),
    subscribeGlobalKeyDown: (callback, identity) =>
        set((state) => ({
            subscribers: state.subscribers.concat({ identity, callback }),
        })),
    unsubscribeGlobalKeyDown: (identity) =>
        set((state) => ({
            subscribers: state.subscribers.filter(
                (subscriber) => subscriber.identity !== identity,
            ),
        })),
    subscribers: [],
}))
