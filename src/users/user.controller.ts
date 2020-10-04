import {Controller, Delete, Get, Param, Put, Query, Request, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../database/repository/user.repository";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {GoogleService} from "./auth/google.service";
import {AppGateway} from "../app.gateway";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {RolesEnum} from "../database/enums/roles.enum";
import {RoleRepository} from "../database/repository/role.repository";
import {User} from "../database/entity/user.entity";
import {EncrDecrService} from "./service/EncDecrService";
import {Roles} from "../auth/roles.decorator";

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class UserController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        private jwtService: JwtService,
        private encrDecrService: EncrDecrService,
        private readonly googleService: GoogleService,
        private appGateway: AppGateway
    ) {
    }

    @Get('users')
    getUsers() {
        return this.userRepository.find();
    }

    // @Put('users/:id')
    // putUser(@Request() req, @Param('id') id : string) {
    //     console.log(id)
    //     return 'yo';
    //     // return this.userRepository.find();
    // }

    @Put('user/change-role/:id')
    @ApiQuery({name: 'role', enum: RolesEnum})
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    async changeRole(@Request() req, @Param('id') id: string, @Query('role') role: RolesEnum) {
        const user = await this.userRepository.findOne(id);
        user.roles = [await this.roleRepository.findOne({where: {label: role}})];
        await this.userRepository.save(user);
        return '{success:true}';
    }

    @Get('user/profile')
    @UseGuards(JwtAuthGuard)
    // @Roles('admin')
    getProfile(@Request() req) {
        return {user: req.user};
    }

    @Get('generate-admin')
    async generateAdmin():Promise<User> {
        const user = await this.userRepository.findOne({username:process.env.user});

        if(user){
            return user;
        }

        const roleAdmin = await this.roleRepository.findOne({where:{label:RolesEnum.ADMIN}});
        return this.userRepository.save({
            username : process.env.user,
            password : this.encrDecrService.encrypt(process.env.salt,process.env.password),
            email : process.env.email,
            roles : [roleAdmin]
        });
    }

    @Delete('users/:id')
    remove(@Param('id') id: string) {
        return this.userRepository.delete(id);
    }
}
