import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entitites/Profile';
import { User } from 'src/entitites/User';
import { UserParams, UserProfileParams } from 'src/utils/types';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config({ path: process.cwd() + '/config/.env' })

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>
    ) { }

    async createUser(userDetails: UserParams): Promise<User | void> {
        const hashedPassword: string = await bcrypt.hash(userDetails.password, parseInt(process.env.SALT_OR_ROUNDS))
        userDetails = { ...userDetails, password: hashedPassword }
        const user = this.userRepository.create(userDetails)

        const savedUser = this.userRepository.save(user)
            .catch(err => {
                if(err.code === 'ER_DUP_ENTRY') 
                    throw new HttpException(`Username ${userDetails.username} already exists. try another one.`,
                                            HttpStatus.NOT_IMPLEMENTED)
            })
        return savedUser
    }

    // update user
    async updateUser(username: string, userDetails: UserParams): Promise<UpdateResult> {
        const userId = (await this.userRepository.findOneBy({ username })).id
        if (!userId) throw new HttpException("Can't update user details. user not found.", HttpStatus.BAD_REQUEST)

        return this.userRepository.update({ id: userId }, { ...userDetails })
    }

    async deleteUser(username: string): Promise<DeleteResult> {
        const profileId = (await this.userRepository.findOneBy({ username })).profile.id
        this.userRepository.delete({ username })
        return this.deleteUserProfile(profileId)

        // Exceptions aren't handled because in case that the desired row isn't found, nothing will be deleted
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

    // update user profile
    async updateUserProfile(id: number, userProfileDetails: UserProfileParams): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException("Can't update profile. user not found.", HttpStatus.BAD_REQUEST)
        // find if profile exists
        if (user.profile === null) throw new HttpException(`${user.username} has no profile`, HttpStatus.BAD_REQUEST)
        await this.profileRepository.update({ id: user.profile.id }, { ...userProfileDetails })
        return user
    }

    deleteUserProfile(id: number | null): Promise<DeleteResult> {
        return this.profileRepository.delete(id)
    }

}
