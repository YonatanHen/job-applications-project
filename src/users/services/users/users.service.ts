import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entitites/User';
import { UserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    // createUser
    createUser(userDetails: UserParams): User {
        const user = this.userRepository.create(userDetails)
        this.userRepository.save(user)
        return user
    }

    // findAll
    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }
    // findById
    // find by username
    // deleteUser
}
