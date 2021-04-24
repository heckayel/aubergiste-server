import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {DiscordService} from "../service/discord.service";
import {JwtAuthGuard} from "../../users/auth/jwt-auth.guard";
import {Roles} from "../../users/auth/roles.decorator";
import {DirectMessageBotDto} from "../core/dto/direct-message-bot-dto.dto";
import {RolesEnum} from "../../users/core/enum/roles.enum";

@ApiBearerAuth()
@ApiTags('Bots')
@Controller('bots')
export class BotController {

    constructor(private discordService: DiscordService) {
    }

    @Post('/send')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async post(@Body() directMessageBotDto: DirectMessageBotDto) {
        return {'success': await this.discordService.sendAMessage(directMessageBotDto.channelId, directMessageBotDto.content)};
    }
}
