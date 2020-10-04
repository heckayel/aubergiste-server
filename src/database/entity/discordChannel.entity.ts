import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {ManyToOne} from "typeorm";
import {Column} from "typeorm/decorator/columns/Column";
import {DiscordServer} from "./discordServer.entity";

@Entity()
export class DiscordChannel {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    discordId?: string;

    @Column()
    name?: string;


    @ManyToOne(type => DiscordServer, discordServer => discordServer.discordChannels, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    discordServer?: DiscordServer;

}
