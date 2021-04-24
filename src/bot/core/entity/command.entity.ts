import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {OneToMany} from "typeorm";
import {Column} from "typeorm/decorator/columns/Column";
import {Answer} from "./answer.entity";

@Entity()
export class Command {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    key?: string;

    @OneToMany(type => Answer, answer => answer.command , {
        cascade: true,
        eager: true
    })
    answers?: Answer[];

}
