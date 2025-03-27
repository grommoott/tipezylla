import { TypeBox } from "@entities/TypeBox"
import { getPhrase } from "@api/phrases/getPhrase"
import { useEffect, useState } from "preact/hooks"
import { Phrase } from "@types"

type Stats = {
    cpm?: number
    errors?: number
}

export const PracticeWidget = () => {
    const [currentPhrase, setCurrentPhrase] = useState<Phrase | undefined>(
        undefined,
    )
    const [isNextPhraseNeeded, setNextPhraseNeeded] = useState(true)
    const [stats, setStats] = useState<Stats>({})

    useEffect(() => {
        if (!isNextPhraseNeeded) {
            return
        }

        ;(async () => {
            const phrase = await getPhrase({
                id: currentPhrase?.next?.id || undefined,
            })

            setNextPhraseNeeded(false)
            setCurrentPhrase(() => phrase)
        })()
    }, [isNextPhraseNeeded])

    return (
        <div className={"flex flex-col items-stretch w-2/3"}>
            <div
                className={
                    "p-4 bg-zinc-900 drop-shadow-xl border-[1px] border-violet-100/40 flex flex-col items-center text-violet-50/70 rounded-2xl"
                }
            >
                <p className={"text-xl"}>Статистика по предыдущему уроку</p>
                <div className={"flex flex-row gap-4 items-center"}>
                    <p>
                        Скорость:{" "}
                        <span className="text-violet-500">
                            {stats.cpm
                                ? `${stats.cpm.toFixed(1)} символов в минуту`
                                : "неизвестна"}
                        </span>
                    </p>
                    <p>
                        Количество ошибок:{" "}
                        <span className="text-violet-500">
                            {stats.errors ? `${stats.errors}` : "неизвестно"}
                        </span>
                    </p>
                </div>
            </div>

            <TypeBox
                onComplete={({ time, errors }) => {
                    if (!currentPhrase) {
                        return
                    }

                    const newStats: Stats = {}
                    newStats.cpm =
                        currentPhrase.text.length / (time / 1000 / 60)
                    newStats.errors = errors.length

                    setStats(() => newStats)
                    setNextPhraseNeeded(() => true)
                }}
                text={currentPhrase?.text}
            />
        </div>
    )
}
