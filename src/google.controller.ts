import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GoogleService} from "./users/auth/google.service";
import {AppGateway} from "./app.gateway";

@Controller('google')
export class GoogleController {
    constructor(private readonly googleService: GoogleService, private appGateway: AppGateway) {}

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {

        /**
         * regarde du côté de
         * var socket = io("http://localhost", {
              extraHeaders: {
                Authorization: "Bearer authorization_token_here"
              }
            });
         */
        this.appGateway.server.emit('google',{user : "toto"});
        // io.in(req.session.socketId).emit(args[0].provider, user);
        // res.end();
        return this.googleService.googleLogin(req)
    }
}
