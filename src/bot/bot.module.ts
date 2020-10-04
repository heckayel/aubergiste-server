import {Module} from '@nestjs/common';
import {BotController} from "./controller/bot.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiscordServer} from "../database/entity/discordServer.entity";
import {DiscordServerRepository} from "../database/repository/discordServer.repository";
import {DiscordChannel} from "../database/entity/discordChannel.entity";
import {DiscordChannelRepository} from "../database/repository/discordChannel.repository";
import {Command} from "../database/entity/command.entity";
import {CommandRepository} from "../database/repository/command.repository";
import {Answer} from "../database/entity/answer.entity";
import {AnswerRepository} from "../database/repository/answer.repository";
import {AnswerController} from "./controller/answer.controller";
import {CommandController} from "./controller/command.controller";
import {DiscordChannelController} from "./controller/discord-channel.controller";
import {DiscordServerController} from "./controller/discord-server.controller";
import {DiscordService} from "./service/discord.service";
import {UsersModule} from "../users/users.module";
import {AnswerListener} from "./listeners/answer.listener";

@Module({
    controllers: [
        BotController,
        AnswerController,
        CommandController,
        DiscordChannelController,
        DiscordServerController
    ],
    imports: [
        TypeOrmModule.forFeature([
            DiscordServer, DiscordServerRepository,
            DiscordChannel, DiscordChannelRepository,
            Command, CommandRepository,
            Answer, AnswerRepository
        ]),
        UsersModule
    ],
    providers: [
        DiscordService,
        AnswerListener
    ]
})
export class BotModule {

}
