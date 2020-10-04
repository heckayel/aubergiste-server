import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {JoinColumn, ManyToOne} from "typeorm";
import {Column} from "typeorm/decorator/columns/Column";
import {Command} from "./command.entity";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({default: 1})
    proba?: number;

    @Column({nullable: true})
    content?: string;

    @ManyToOne(type => Command, command => command.answers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn()
    command?: Command;

}
