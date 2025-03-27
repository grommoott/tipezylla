import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Phrase } from "./phrase.entity"
import { IsNull, Repository } from "typeorm"
import { CreatePhraseDto } from "./dto/createPhrase.dto"

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Phrase) private phrasesRepository: Repository<Phrase>,
    ) {}

    async getPhrase(id?: number) {
        const phrase = await (() => {
            if (id) {
                return this.phrasesRepository.findOne({
                    where: { id },
                    relations: { next: true },
                    select: { id: true, text: true, next: { id: true } },
                })
            } else {
                return this.phrasesRepository.findOne({
                    where: {},
                    relations: { next: true },
                    select: { id: true, text: true, next: { id: true } },
                })
            }
        })()

        if (!phrase) {
            throw new NotFoundException()
        }

        return phrase
    }

    async createPhrase(createPhraseDto: CreatePhraseDto) {
        const phrase = new Phrase()
        phrase.text = createPhraseDto.text
        const prevPhrase = await this.phrasesRepository.findOne({
            where: { next: IsNull() },
        })

        await this.phrasesRepository.save(phrase)

        if (!prevPhrase) {
            return phrase
        }

        prevPhrase.next = phrase
        await this.phrasesRepository.save(prevPhrase)

        return phrase
    }
}
