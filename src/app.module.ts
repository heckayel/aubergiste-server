import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ConfigModule} from '@nestjs/config';
import {AppGateway} from './app.gateway';
import {UsersModule} from "./users/users.module";
import {AppController} from "./app/controller/app.controller";
import {UserRepository} from "./users/core/repository/user.repository";
import {User} from "./users/core/entity/user.entity";
import {Role} from "./users/core/entity/role.entity";
import {SocialLocal} from "./users/core/entity/social-local.entity";
import {RoleRepository} from "./users/core/repository/role.repository";
import {SocialLocalRepository} from "./users/core/repository/social-local.repository";
import { BotModule } from './bot/bot.module';
import {DiscordModule} from "./discord/discord.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
            entities: [
                "dist/**/entity/**/*.js"
            ],
            migrations: [
                "dist/migration/**/*.js"
            ],
            subscribers: [
                "dist/subscriber/**/*.js"
            ],
            synchronize: true,
            logging: false,
            autoLoadEntities: true
        }),

        TypeOrmModule.forFeature([
            User, UserRepository,
            Role, RoleRepository,
            SocialLocal, SocialLocalRepository
        ]),
        DiscordModule,
        UsersModule,
        BotModule,
    ],
    controllers: [AppController],
    providers: [AppGateway],
})
export class AppModule {
    constructor(private connection: Connection) {
    }
}
