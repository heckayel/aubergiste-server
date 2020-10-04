import {Module} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthController} from "./auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/entity/user.entity";
import {UserRepository} from "../database/repository/user.repository";
import {Role} from "../database/entity/role.entity";
import {LocalStrategy} from "./auth/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./auth/jwt.strategy";
import {GoogleStrategy} from "./auth/google.strategy";
import {GoogleService} from "./auth/google.service";
import {AppGateway} from "../app.gateway";
import {UserController} from "./user.controller";
import {RolesController} from "./roles.controller";
import {RoleRepository} from "../database/repository/role.repository";
import {EncrDecrService} from "./service/EncDecrService";

@Module({
    providers: [LocalStrategy, JwtStrategy, GoogleStrategy, UsersService, GoogleService, AppGateway, EncrDecrService],
    imports: [
        TypeOrmModule.forFeature([User, UserRepository, Role, RoleRepository]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_KEY_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRES_IN || '600s'},
        }),
    ],
    exports: [UsersService, EncrDecrService],
    controllers: [AuthController, UserController, RolesController]
})
export class UsersModule {
}
