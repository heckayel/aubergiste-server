import {EntityRepository, Repository} from 'typeorm';
import {User} from "../entity/user.entity";
import {UserRegisterDto} from "../dto/user-register.dto";
import {JwtService} from "@nestjs/jwt";
import {UserUpdateDto} from "../dto/user-update.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(private jwtService: JwtService) {
        super();
    }

    isEmailAccountExists = async (email: string) => {
        return await this.findOne({where: {email}}) !== undefined;
    };

    createUser = async (userRegisterDto: UserRegisterDto) => {
        return await this.save(userRegisterDto);
    };

    updateUser = async (id: string, userUpdateDto: UserUpdateDto) => {
        return this.save({ ...userUpdateDto, id: String(id) });
    };

    //
    // findOneDog = async (id: string) => {
    //     return this.findOneOrFail(id);
    // };
    //
    //
    // removeDog = async (id: string) => {
    //     await this.findOneOrFail(id);
    //     return this.delete(id);
    // };
}
