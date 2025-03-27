import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Phrase } from "./phrase.entity"

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: "tipezylla_db",
                port: configService.get("DB_PORT"),
                password: configService.get("DB_PASSWORD"),
                username: configService.get("DB_USERNAME"),
                database: configService.get("DB_DATABASE"),
                synchronize: true,
                entities: [Phrase],
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Phrase]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
