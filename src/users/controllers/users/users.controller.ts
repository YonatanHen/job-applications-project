import { Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { User } from 'src/entitites/User';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfileDto.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}


    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Post('create')
    async createUser(@Body() CreateUserDto: CreateUserDto, @Res() res: Response, @Req() req: Request) {
        const user = this.userService.createUser(CreateUserDto)
        if(user) res.status(HttpStatus.CREATED).send(`Created user ${user.username}.`)
        else throw new HttpException('Failed to create the user', HttpStatus.BAD_REQUEST)
    }

    @UseGuards(JwtAuthGuard)
    @Get('check')
    check() {
        return 'check if passport is working'
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/profile')
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() CreateUserProfileDto: CreateUserProfileDto, @Res() res: Response, @Req() req: Request) {
        const user = await this.userService.createUserProfile(id, CreateUserProfileDto)
        if(user) res.status(HttpStatus.CREATED).send(`Created profile for ${user.username}.`)
        else throw new HttpException('Failed to create the profile', HttpStatus.BAD_REQUEST)
    }
}
