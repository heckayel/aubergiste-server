import {Body, Controller, Delete, Get, Param, Put, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {AnswerRepository} from "../core/repository/answer.repository";
import {UpdateAnswerDto} from "../core/dto/update-answer.dto";

@ApiBearerAuth()
@ApiTags('Answers')
@Controller('answers')
export class AnswerController {

    constructor(
        @InjectRepository(AnswerRepository) private readonly answerRepository: AnswerRepository
    ) {
    }

    @Get()
    async index(@Request() req) {
        return this.answerRepository.find();
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
        return await this.answerRepository.save({...updateAnswerDto, id});
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.answerRepository.delete(id);
    }
}
