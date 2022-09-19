import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entitites/Profile';
import { User } from 'src/entitites/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule { }
