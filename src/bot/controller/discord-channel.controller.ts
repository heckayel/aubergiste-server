import {Controller, Get, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordServerRepository} from "../../database/repository/discordServer.repository";
import {DiscordChannelRepository} from "../../database/repository/discordChannel.repository";

@ApiBearerAuth()
@ApiTags('DiscordChannels')
@Controller('discord-channels')
export class DiscordChannelController {

    constructor(
        @InjectRepository(DiscordChannelRepository) private readonly discordChannelRepository: DiscordChannelRepository
    ) {
    }

    @Get()
    async index(@Request() req) {

        return {
            'a': 'b'
        };
    }
}
