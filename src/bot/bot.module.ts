import {Module} from '@nestjs/common';
import {BotController} from "./controller/bot.controller";
import {AnswerController} from "./controller/answer.controller";
import {CommandController} from "./controller/command.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Command} from "./core/entity/command.entity";
import {Answer} from "./core/entity/answer.entity";
import {AnswerRepository} from "./core/repository/answer.repository";
import {CommandRepository} from "./core/repository/command.repository";
import {DiscordService} from "./service/discord.service";
import {EmbedService} from "./service/embed.service";
import {RouteListener} from "./listeners/route.listener";
import {AnswerControllerBot} from "./controller-bot/answer.controller-bot";
import {DiscordGuildRepository} from "../discord/core/repository/discord-guild.repository";
import {DiscordGuild} from "../discord/core/entity/discord-guild.entity";

@Module({
    controllers: [
        BotController,
        AnswerController,
        CommandController
    ],
    imports: [
        TypeOrmModule.forFeature([
            Command, CommandRepository,
            Answer, AnswerRepository,
            DiscordGuild, DiscordGuildRepository
        ])
    ],
    providers: [
        DiscordService,
        EmbedService,
        AnswerControllerBot,
        RouteListener
    ]
})
export class BotModule {}
