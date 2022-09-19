import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entitites/Profile';
import { User } from 'src/entitites/User';
import { UserParams, UserProfileParams } from 'src/utils/types';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>
    ) { }

    createUser(userDetails: UserParams): User {
        const user = this.userRepository.create(userDetails)
        this.userRepository.save(user)
        return user
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findByUsername(username: string): Promise<User> {
        const user = this.userRepository.findOneBy({ username })
        return user
    }

    async createUserProfile(id: number, userProfileDetails: UserProfileParams): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException("Can't create profile. user not found.", HttpStatus.BAD_REQUEST)
        // find if profile exists
        if (user.profile !== null) throw new HttpException(`${user.username} already has a profile`, HttpStatus.CONFLICT)
        const newProfile = this.profileRepository.create(userProfileDetails)
        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile
        return this.userRepository.save(user)
    }

    // update user

    // update user profile
    async updateUserProfile(id: number, userProfileDetails: UserProfileParams): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException("Can't create profile. user not found.", HttpStatus.BAD_REQUEST)
        // find if profile exists
        if (user.profile === null) throw new HttpException(`${user.username} has no profile`, HttpStatus.BAD_REQUEST)
        await this.profileRepository.update({ id: user.profile.id }, { ...userProfileDetails })
        return user
    }

    // deleteUser
}
