import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/entitites/Application';
import { User } from 'src/entitites/User';
import { ApplicationParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationsService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>
    ) { }

    // get user applications
    async userApplications(username: string): Promise<Application[]> {
        const user = await this.userRepository.findOneBy({ username })
        console.log(user)
        return this.applicationRepository.findBy({ user: user })
    }

    // add application
    async createApplication(username: string, applicationDetails: ApplicationParams): Promise<Application> {
        const user = await this.userRepository.findOneBy({ username })
        if (!user) throw new HttpException("Can't create the application. user not found.", HttpStatus.BAD_REQUEST)

        const newApplication = this.applicationRepository.create({ ...applicationDetails, user })
        return await this.applicationRepository.save(newApplication)
    }

    // update application

    // delete application
}
