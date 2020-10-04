import { Controller, Get, Request, Post, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from './users/auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import {Roles} from "./auth/roles.decorator";
import {RolesGuard} from "./auth/roles.guard";

@Controller()
export class AppController {
  //
  // constructor(private authService: AuthService) {}
  //
  @Get()
  getHello(): string {
    return "hello guys !";
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  //
  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // @Roles('admin')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
  //
  // @Get('hello')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // async create() {
  //   return "It works !";
  // }

}
