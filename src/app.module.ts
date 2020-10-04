import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ConfigModule} from '@nestjs/config';
import {AppGateway} from './app.gateway';
import {AppController} from "./app.controller";
import {UsersModule} from "./users/users.module";
import {BotModule} from './bot/bot.module';

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
                "dist/entity/**/*.js"
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
        UsersModule,
        BotModule
    ],
    controllers: [AppController],
    providers: [AppGateway],
})
export class AppModule {
    constructor(private connection: Connection) {
    }
}
