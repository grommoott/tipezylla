import { useGlobalKeyDownStore } from "@shared/store/useGlobalKeyDownStore"
import { PracticeWidget } from "@widgets/PracticeWidget"
import { FC } from "preact/compat"

export const App: FC = () => {
    const { onGlobalKeyDown } = useGlobalKeyDownStore()

    return (
        <div
            className={
                "bg-zinc-900 h-full w-full flex flex-col items-center justify-center"
            }
            onKeyDown={onGlobalKeyDown}
        >
            <div className={"flex-[1]"} />
            <PracticeWidget />
            <div className={"flex-[2]"} />
        </div>
    )
}
