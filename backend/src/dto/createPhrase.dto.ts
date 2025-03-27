import { IsString } from "class-validator"

export class CreatePhraseDto {
    @IsString()
    text: string
}
