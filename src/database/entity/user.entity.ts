import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {Role} from "./role.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    googleId?: string;

    @ManyToMany(type => Role, role => role.users, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    roles?: Role[];
}
