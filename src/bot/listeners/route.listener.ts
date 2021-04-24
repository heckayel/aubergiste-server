import {Injectable} from "@nestjs/common";
import {DiscordService} from "../service/discord.service";
import {EmbedService} from "../service/embed.service";
import {RouteTypeEnum} from "../core/enums/route-type.enum";
import {AnswerControllerBot} from "../controller-bot/answer.controller-bot";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../../discord/core/repository/discord-guild.repository";

@Injectable()
export class RouteListener {

    prefix: string;

    session: {};

    ROUTES = {
        'answer': {type: RouteTypeEnum.ADMIN, route: (message) => this.answerController.answer(message)}
    }

    constructor(
        private readonly discordService: DiscordService,
        private readonly embedService: EmbedService,
        private readonly answerController: AnswerControllerBot,
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository
    ) {
        this.prefix = process.env.BOT_PREFIX || "!";
        this.discordService.addEvent("message", (message) => this.handler(message));
        this.session = [];
    }

    async handler(message) {

        const curentDiscordGuild = await this.fetchCurrentDiscordGuild(message);

        if (!curentDiscordGuild) {
            // Pas de serveur trouvé, on ne fait rien !
            return;
        }

        // Ca commence par le préfix ?
        if (message.content.startsWith(curentDiscordGuild.prefix)) {

            // On récupère la commande et les arguments (ce qui suit derière le préfixe)
            //@todo améliorer le trim split pour gérer des guillements (groupe de mots)
            message.content = message.content.replace(this.prefix, "");
            message.args = message.content.trim().split(/ +/g); // [0:commande, 1:argument1 2: argument2]

            // La commande existe ?
            if (this.ROUTES[message.args[0]] !== undefined) {

                // Commande Admin ?
                if (this.ROUTES[message.args[0]].type === RouteTypeEnum.ADMIN) {
                    return this.ROUTES[message.args[0]].route(message);
                }

                return this.ROUTES[message.args[0]].route(message);
            }

            // on a le bon prefix mais aucune commande par défaut ne correspond : on délègue au controllerBot Answer
            return this.answerController.answer(message);

        }
        return;
    }


    /**
     * On met les serveur en session pour éviter un aller retour en base à chaque message écrit sur discord
     * @param message
     * @private
     */
    private async fetchCurrentDiscordGuild(message) {

        if (!message.guild) {
            return null;
        }

        // Serveur en session n'existe pas ou trop ancien ?
        if (!this.session[message.guild.id]
            || ((new Date().getTime()) - this.session[message.guild.id].time) > parseInt(process.env.SESSION_GUILD_TIME_LIMIT)) {

            const discordGuild = await this.discordGuildRepository.findOne({where: {guildId: message.guild.id}});

            if (!discordGuild) {
                // On ne fait rien :D
                console.log('On ne fait rien');
                return null;
            }

            this.session[message.guild.id] = {
                time: new Date().getTime(),
                discordGuild
            };
        }

        return await this.session[message.guild.id].discordGuild;
    }
}
