import {EntityRepository, Repository} from 'typeorm';
import {DiscordChannel} from "../entity/discordChannel.entity";

@EntityRepository(DiscordChannel)
export class DiscordChannelRepository extends Repository<DiscordChannel> {

    constructor() {
        super();
    }

}
