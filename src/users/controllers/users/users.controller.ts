import { Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { User } from 'src/entitites/User';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto.dto';
import { CRUDUserProfileDto } from 'src/users/dtos/CRUDUserProfileDto.dto';
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
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/profile')
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() CreateUserProfileDto: CRUDUserProfileDto, @Res() res: Response, @Req() req: Request) {
        const user = await this.userService.createUserProfile(id, CreateUserProfileDto)
        if(user) res.status(HttpStatus.CREATED).send(`Created profile for ${user.username}.`)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update-profile')
    async updateUserProfile(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserProfileDto: CRUDUserProfileDto, @Res() res: Response, @Req() req: Request) {
        const user = await this.userService.updateUserProfile(id, UpdateUserProfileDto)
        if(user) res.status(HttpStatus.CREATED).send(`Update ${user.username} profile.`)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':username')
    async deleteUser(@Param('username') username: string, @Res() res: Response, @Req() req: Request) {
        await this.userService.deleteUser(username)
        res.status(HttpStatus.ACCEPTED).send(`${username} deleted successfully.`)
    }
}
