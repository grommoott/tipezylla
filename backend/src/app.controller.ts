import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { AppService } from "./app.service"
import { CreatePhraseDto } from "./dto/createPhrase.dto"

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("phrase")
    getPhrase(@Query("id") id: string) {
        return this.appService.getPhrase(Number(id) ? Number(id) : undefined)
    }

    @Post("phrase")
    createPhrase(@Body() createPhraseDto: CreatePhraseDto) {
        return this.appService.createPhrase(createPhraseDto)
    }
}
