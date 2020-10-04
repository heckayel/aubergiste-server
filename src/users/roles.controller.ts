import {Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ApiTags} from "@nestjs/swagger";
import {RoleRegisterDto} from "../database/dto/role-register.dto";
import {RoleRepository} from "../database/repository/role.repository";
import {User} from "../database/entity/user.entity";
import {RolesEnum} from "../database/enums/roles.enum";
import {Role} from "../database/entity/role.entity";

@ApiTags('Roles')
@Controller()
export class RolesController {

    constructor(
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
    ) {
    }

    @Get('roles')
    getRoles() {
        return this.roleRepository.find();
    }

    @Post('roles')
    async postRole(@Request() req, @Body() roleRegisterDto: RoleRegisterDto) {
        const role =  await this.roleRepository.findOne({where: {label : roleRegisterDto.label}});
        if(role){
            return {success: false, message: 'This role already exists'};
        }
        return await this.roleRepository.createRole(roleRegisterDto);
    }

    @Get('generate-roles')
    async generateRoles():Promise<Role[]> {
        const roles = Object.values(RolesEnum);
        for(const role of roles){
            if(!await this.roleRepository.findOne({where:{label:role}})){
                await this.roleRepository.save({label:role});
            }
        }
        return await this.roleRepository.find();
    }
}
