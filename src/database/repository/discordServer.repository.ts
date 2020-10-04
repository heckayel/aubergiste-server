import {EntityRepository, Repository} from 'typeorm';
import {DiscordServer} from "../entity/discordServer.entity";

@EntityRepository(DiscordServer)
export class DiscordServerRepository extends Repository<DiscordServer> {

    constructor() {
        super();
    }

}
