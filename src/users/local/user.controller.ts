import {Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../core/repository/user.repository";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {RolesEnum} from "../core/enum/roles.enum";
import {RoleRepository} from "../core/repository/role.repository";
import {Roles} from "../auth/roles.decorator";
import {PreferencesDto} from "../core/dto/preferences.dto";
import {EncrDecrService} from "./enc-decr.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {UsersService} from "./users.service";
import {Like} from "typeorm";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        private userService: UsersService,
        private jwtService: JwtService,
        private encrDecrService: EncrDecrService
    ) {
    }

    @Get('')
    getUsers() {
        return this.userRepository.find();
    }

    @Put('/change-role/:id')
    @ApiQuery({name: 'role', enum: RolesEnum})
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    async changeRole(@Request() req, @Param('id') id: string, @Query('role') role: RolesEnum) {
        const user = await this.userRepository.findOne(id);
        user.roles = [await this.roleRepository.findOne({where: {label: role}})];
        await this.userRepository.save(user);
        return '{success:true}';
    }

    @Post('/find')
    async find(@Request() req,@Query('username') username:string) {
        const users = await this.userRepository.find({
            where:{
                username : Like(username + '%')
            }
        });

        return users.map(u => ({
            id: u.id,
            username: u.username,
            avatar: u.avatar
        }));
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        if (!req.user) {
            return false;
        }
        return this.userService.generateToken(req.user);
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    // @Roles('admin')
    async getProfile(@Request() req) {
        const user = await this.userRepository.findOne({where: {id: req.user.id}});
        return {user: {...user, roles: user.roles.map(r => r.label)}};
    }

    @Put('/update-preferences')
    @UseGuards(JwtAuthGuard)
    async update(@Request() req, @Body() preferences: PreferencesDto) {
        return this.userRepository.save({id: req.user.id, preferences});
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.userRepository.delete(id);
    }
}
