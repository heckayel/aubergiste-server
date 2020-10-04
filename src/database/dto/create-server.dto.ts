export class CreateServerDto {
    readonly discordId: string;
    name !: string;
    prefix: string = "!";
}
