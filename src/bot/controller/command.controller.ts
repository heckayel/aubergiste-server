import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {JwtAuthGuard} from "../../users/auth/jwt-auth.guard";
import {Roles} from "../../users/auth/roles.decorator";
import {CommandRepository} from "../core/repository/command.repository";
import {CreateCommandDto} from "../core/dto/create-command.dto";
import {UpdateCommandDto} from "../core/dto/update-command.dto";
import {RolesEnum} from "../../users/core/enum/roles.enum";

@ApiBearerAuth()
@ApiTags('Commands')
@Controller('commands')
export class CommandController {

    constructor(
        @InjectRepository(CommandRepository ) private readonly commandRepository: CommandRepository
    ) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.commandRepository.find();
    }

    @Post()
    async post(@Body() createCommandDto: CreateCommandDto) {

        if (createCommandDto.key === undefined || createCommandDto.key === null) {
            return {"error": "The key can't be null"};
        }

        const alreadyExist = await this.commandRepository.findOne({"key": createCommandDto.key});

        if (alreadyExist) {
            return {"error": "This command already exist"};
        }

        return this.commandRepository.save(createCommandDto);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {

        if (updateCommandDto.key !== undefined && updateCommandDto.key === null) {
            return {"error": "The key can't be null"};
        }
        return await this.commandRepository.save({...updateCommandDto, id});
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.commandRepository.delete(id);
    }
}
