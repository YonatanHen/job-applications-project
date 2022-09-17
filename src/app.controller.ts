import { Get } from '@nestjs/common';
import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth/local-auth.guard';
import { AuthService } from './auth/service/auth/auth.service';

@Controller()
export class AppController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req: Request & { user: any }) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request & { user: any }) {
        return req.user
    }
}