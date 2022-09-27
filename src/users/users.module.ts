import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entitites/Profile';
import { User } from 'src/entitites/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Application } from 'src/entitites/Application';
import { ApplicationsService } from './services/applications/applications.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile, Application])],
    controllers: [UsersController],
    providers: [UsersService, ApplicationsService],
    exports: [UsersService]
})

export class UsersModule { }
