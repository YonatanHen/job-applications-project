import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entitites/Profile';
import { User } from 'src/entitites/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Application } from 'src/entitites/Application';
import { ApplicationsService } from './services/applications/applications.service';
import { ApplicationsController } from './controllers/applications/applications.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile, Application])],
    controllers: [UsersController, ApplicationsController],
    providers: [UsersService, ApplicationsService],
    exports: [UsersService, ApplicationsService]
})

export class UsersModule { }
