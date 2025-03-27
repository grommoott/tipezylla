import { useGlobalKeyDownStore } from "@shared/store/useGlobalKeyDownStore"
import { useEffect, useState } from "preact/hooks"

export const useGlobalKeyDown = (callback: (e: KeyboardEvent) => void) => {
    const { subscribeGlobalKeyDown, unsubscribeGlobalKeyDown } =
        useGlobalKeyDownStore()
    const [globalKeyDownEvent, setGlobalKeyDownEvent] = useState<
        KeyboardEvent | undefined
    >(undefined)

    useEffect(() => {
        const symbol = Symbol("keydownidentity")
        subscribeGlobalKeyDown(setGlobalKeyDownEvent, symbol)

        return () => unsubscribeGlobalKeyDown(symbol)
    }, [])

    useEffect(() => {
        if (!globalKeyDownEvent) {
            return
        }

        callback(globalKeyDownEvent)
    }, [globalKeyDownEvent])
}
