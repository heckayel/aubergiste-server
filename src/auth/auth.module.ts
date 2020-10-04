import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../users/auth/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../users/auth/jwt.strategy';
import {GoogleStrategy} from "../users/auth/google.strategy";
import {GoogleService} from "../users/auth/google.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
        UsersModule,
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, GoogleService],
    exports: [AuthService, GoogleService]
})
export class AuthModule {}
