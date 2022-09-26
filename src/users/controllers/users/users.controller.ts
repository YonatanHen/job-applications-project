import { Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Body, Controller, HttpStatus, Post, Req, Res, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CRUDUserDto } from 'src/users/dtos/CRUDUserDto.dto';
import { CRUDUserProfileDto } from 'src/users/dtos/CRUDUserProfileDto.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}


    // @Get()
    // findAll(): Promise<User[]> {
    //     return this.userService.findAll()
    // }

    @UseGuards(JwtAuthGuard)
    @Get(':username')
    findUser(@Param('username') username: string) {
        return this.userService.findByUsername(username)
    }

    @Post('create')
    async createUser(@Body() CreateUserDto: CRUDUserDto, @Res() res: Response) {
        const user = this.userService.createUser(CreateUserDto)
        if(user) res.status(HttpStatus.CREATED).send(`Created user ${user.username}.`)
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/profile')
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() CreateUserProfileDto: CRUDUserProfileDto, @Res() res: Response) {
        const user = await this.userService.createUserProfile(id, CreateUserProfileDto)
        if(user) res.status(HttpStatus.CREATED).send(`Created profile for ${user.username}.`)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update-profile')
    async updateUserProfile(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserProfileDto: CRUDUserProfileDto, @Res() res: Response) {
        const user = await this.userService.updateUserProfile(id, UpdateUserProfileDto)
        if(user) res.status(HttpStatus.CREATED).send(`Update ${user.username} profile.`)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':username')
    async deleteUser(@Param('username') username: string, @Res() res: Response) {
        await this.userService.deleteUser(username)
        res.status(HttpStatus.ACCEPTED).send(`${username} deleted successfully.`)
    }

    // update user
    @UseGuards(JwtAuthGuard)
    @Put(':username')
    async updateUser(@Param('username') username: string, @Body() UpdateUserProfileDto: CRUDUserDto, @Res() res: Response) {
        const user = await this.userService.updateUser(username, UpdateUserProfileDto)
        res.status(HttpStatus.ACCEPTED).send(`User updated successfully.`)
    }
}

