import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../database/repository/user.repository";
import {UserDto} from "../database/dto/user.dto";
import {EncrDecrService} from "./service/EncDecrService";
import {User} from "../database/entity/user.entity";

@Injectable()
export class UsersService {
    //
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private encrDecrService: EncrDecrService,
    ) {
    }

    async validateUser(username, password): Promise<UserDto | null> {//: Promise<UserDto> {

        //avoid empty passwords as ex google account
        if (password.length <= 3) {
            return null;
        }

        const passwordCrypted = this.encrDecrService.encrypt(process.env.salt, password);

        const user = await this.userRepository.findOne({
            where: {
                username, password: passwordCrypted
            }
        });

        if (user) {
            const {password, ...result} = user;
            return {
                email: user.email,
                roles: user.roles.map(r => r.label),
                username: user.username
            };
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    //
    // isEmailAccountExists(email: string): boolean {
    //     return false;
    // }
    //
    // async findOne(login: string): Promise<User | undefined> {
    //     return null;
    // }


    // private readonly users: User[];

    // constructor(private connection: Connection) {
    //     this.users = [
    //         {
    //             userId: 1,
    //             login: 'john',
    //             password: 'changeme',
    //             roles: new Role('admin')
    //         },
    //         {
    //             userId: 2,
    //             login: 'chris',
    //             password: 'secret',
    //             roles: new Role('user')
    //         },
    //         {
    //             userId: 3,
    //             login: 'maria',
    //             password: 'guess',
    //             roles: new Role('guest')
    //         },
    //     ];
    // }
    //
    // async findOne(login: string): Promise<User | undefined> {
    //     return this.users.find(user => user.login === login);
    // }
    //
    // async createMany(users: User[]) {
    //     const queryRunner = this.connection.createQueryRunner();
    //
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();
    //     try {
    //         await queryRunner.manager.save(users[0]);
    //         await queryRunner.manager.save(users[1]);
    //
    //         await queryRunner.commitTransaction();
    //     } catch (err) {
    //         // since we have errors lets rollback the changes we made
    //         await queryRunner.rollbackTransaction();
    //     } finally {
    //         // you need to release a queryRunner which was manually instantiated
    //         await queryRunner.release();
    //     }
    // }
}

// import { Injectable } from '@nestjs/common';
// import {Connection} from 'typeorm';
// import { User } from './user.entity';
// import {Role} from "./role.entity";
//
// @Injectable()
// export class UsersService {
//
//     private readonly users: User[];
//
//     constructor(private connection: Connection) {
//         this.users = [
//             {
//                 id: 1,
//                 login: 'john',
//                 password: 'changeme',
//                 roles:[new Role('admin')]
//             },
//             {
//                 id: 2,
//                 login: 'chris',
//                 password: 'secret',
//                 roles:[new Role('guest')]
//             },
//             {
//                 id: 3,
//                 login: 'maria',
//                 password: 'guess',
//                 roles:[new Role('user')]
//             },
//         ];
//     }
//
//     async findOne(login: string): Promise<User | undefined> {
//         return this.users.find(user => user.login === login);
//     }
//
//     async createMany(users: User[]) {
//         const queryRunner = this.connection.createQueryRunner();
//
//         await queryRunner.connect();
//         await queryRunner.startTransaction();
//         try {
//             await queryRunner.manager.save(users[0]);
//             await queryRunner.manager.save(users[1]);
//
//             await queryRunner.commitTransaction();
//         } catch (err) {
//             // since we have errors lets rollback the changes we made
//             await queryRunner.rollbackTransaction();
//         } finally {
//             // you need to release a queryRunner which was manually instantiated
//             await queryRunner.release();
//         }
//     }
//
// }
