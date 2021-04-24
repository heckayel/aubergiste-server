import {DiscordService} from "../service/discord.service";
import {Injectable} from "@nestjs/common";
import {EmbedService} from "../service/embed.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CommandRepository} from "../core/repository/command.repository";

@Injectable()
export class AnswerControllerBot {

    constructor(
        private discordService: DiscordService,
        private embedService: EmbedService,
        @InjectRepository(CommandRepository) private readonly commandRepository: CommandRepository
    ) {
    }


    async answer(message) {
        const key = message.args[0];
        const command = await this.commandRepository.findOne({key});
        if(command && command.answers.length > 0 && command.answers[0]){
            message.channel.send(this.discordService.replaceKeyWords(command.answers[0].content,message));
        }
        return;
    }
}
