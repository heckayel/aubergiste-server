import {Injectable} from "@nestjs/common";
import {DiscordService} from "../service/discord.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CommandRepository} from "../core/repository/command.repository";

@Injectable()
export class AnswerListener {

    prefix: string;

    constructor(
        private readonly discordService: DiscordService,
        @InjectRepository(CommandRepository) private readonly commandRepository: CommandRepository
    ) {
        this.discordService.addEvent("message", (message) => this.handler(message));
        this.prefix = process.env.BOT_PREFIX || "!";
    }

    async handler(message) {
        if (message.content.startsWith(this.prefix)) {
            const key = message.content.replace(this.prefix, "");
            const command = await this.commandRepository.findOne({key});
            if(command && command.answers.length > 0 && command.answers[0]){
                message.channel.send(this.discordService.replaceKeyWords(command.answers[0].content,message));
            }
        }
    }

}
