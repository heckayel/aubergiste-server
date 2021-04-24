import {ApiProperty} from "@nestjs/swagger";

export class DirectMessageBotDto {
    @ApiProperty()
    readonly content: string;

    @ApiProperty()
    readonly channelId: string;
}
