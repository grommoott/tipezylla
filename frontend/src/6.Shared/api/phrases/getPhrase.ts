import { apiBaseUrl } from "@config"
import { Phrase } from "@types"
import ky from "ky"

export type GetPhraseRequest = {
    id?: number
}

export type GetPhraseResponse = Promise<Phrase>

export const getPhrase: (
    request: GetPhraseRequest,
) => GetPhraseResponse = async ({ id }) => {
    const queryParams = new URLSearchParams()
    id && queryParams.set("id", id.toString())

    return await ky.get(`${apiBaseUrl}/phrase?${queryParams.toString()}`).json()
}
