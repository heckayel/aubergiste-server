import {Body, Controller, Delete, Get, Param, Post, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordServerRepository} from "../../database/repository/discordServer.repository";
import {CreateServerDto} from "../../database/dto/create-server.dto";
import {DiscordService} from "../service/discord.service";

@ApiBearerAuth()
@ApiTags('DiscordServers')
@Controller('discord-servers')
export class DiscordServerController {

    constructor(
        @InjectRepository(DiscordServerRepository) private readonly discordServerRepository: DiscordServerRepository,
        private discordService: DiscordService
    ) {
    }

    @Get()
    async index(@Request() req) {
        return this.discordServerRepository.find();
    }

    @Post()
    async post(@Body() createServerDto: CreateServerDto) {
        const alreadyExist = await this.discordServerRepository.findOne({"discordId" : createServerDto.discordId});
        console.log(alreadyExist)
        if(alreadyExist){
            return {"error" : "This server is already registered"};
        }

        const server = await this.discordService.findServer(createServerDto.discordId);

        if(!server){
            return {"error":"This server is not found"};
        }
        createServerDto.name = server.name;
        createServerDto.prefix = createServerDto.prefix || "!";
        return this.discordServerRepository.save(createServerDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.discordServerRepository.delete(id);
    }
}
