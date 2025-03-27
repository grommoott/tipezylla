import { FC, useEffect, useRef, useState } from "preact/compat"
import dayjs from "dayjs"
import { Dayjs } from "dayjs"
import { TypingError } from "../types"
import { useGlobalKeyDown } from "@hooks"

interface Props {
    text?: string
    onComplete?: ({
        time,
        errors,
    }: {
        time: number
        errors: TypingError[]
    }) => void
}

export const TypeBox: FC<Props> = ({ text = "", onComplete = () => {} }) => {
    const [typedText, setTypedText] = useState("")
    const [pointer, setPointer] = useState(0)
    const [errors, setErrors] = useState<TypingError[]>([])
    const [startTypingMoment, setStartTypingMoment] = useState<
        Dayjs | undefined
    >(undefined)
    const [cursorPosition, setCursorPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })

    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) {
            return
        }

        const element = ref.current as HTMLDivElement

        element.focus()
    }, [ref])

    useEffect(() => {
        if (!ref.current || pointer >= text.length) {
            return
        }

        const parent = ref.current as HTMLDivElement

        if (parent.children.length <= pointer) {
            return
        }

        const child = parent.children[pointer] as HTMLSpanElement
        const padding = 2

        setCursorPosition({
            x: child.offsetLeft - padding,
            y: child.offsetTop - padding,
            width: child.scrollWidth + 2 * padding,
            height: child.scrollHeight + 2 * padding,
        })
    }, [pointer])

    useGlobalKeyDown((e) => {
        if (e.key == "Backspace") {
            if (typedText.length == 0) {
                return
            }

            setTypedText((prev) => prev.substring(0, prev.length - 1))
            setPointer((prev) => Math.max(prev - 1, 0))
            return
        }

        if (e.key.length != 1 || pointer >= text.length) {
            return
        }

        if (!startTypingMoment) {
            setStartTypingMoment(dayjs())
        }

        if (text[pointer] != e.key) {
            setErrors((prev) =>
                prev.concat({
                    expected: text[pointer],
                    received: e.key,
                }),
            )
        }

        setTypedText((prev) => prev + e.key)
        setPointer((prev) => prev + 1)

        if (pointer == text.length - 1) {
            onComplete({
                time: dayjs().diff(startTypingMoment, "milliseconds"),
                errors: errors,
            })
        }
    })

    useEffect(() => {
        setTypedText("")
        setPointer(0)
        setErrors([])
        setStartTypingMoment(undefined)
    }, [text])

    return (
        <div
            tabIndex={1}
            ref={ref}
            className={"outline-none p-4 text-xl relative"}
        >
            {text.split("").map((char, index) => {
                const textColor = (() => {
                    if (typedText.length <= index) {
                        return "text-violet-100"
                    } else if (typedText[index] != char) {
                        return "text-red-500"
                    } else {
                        return "text-violet-500"
                    }
                })()

                return (
                    <span className={`${textColor}`} key={index}>
                        {char}
                    </span>
                )
            })}
            <div
                className={
                    "absolute bg-violet-500/30 border-[1px] border-violet-500 rounded-lg duration-100"
                }
                style={{
                    top: cursorPosition.y,
                    left: cursorPosition.x,
                    width: cursorPosition.width,
                    height: cursorPosition.height,
                }}
            />
        </div>
    )
}
