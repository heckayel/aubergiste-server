import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {OneToMany} from "typeorm";
import {Column} from "typeorm/decorator/columns/Column";
import {DiscordChannel} from "./discordChannel.entity";

@Entity()
export class DiscordServer {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    discordId?: string;

    @Column()
    name?: string;

    @Column()
    prefix?: string;

    @OneToMany(type => DiscordChannel, discordChannel => discordChannel.discordServer, {
        cascade: true,
        eager: true
    })
    discordChannels?: DiscordChannel[];

}
