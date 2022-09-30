import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/entitites/Application';
import { User } from 'src/entitites/User';
import { ApplicationParams } from 'src/utils/types';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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
    async updateApplication(username: string, applicationId: number, applicationDetails: ApplicationParams): Promise<UpdateResult> {
        const application = await this.applicationRepository.findOneBy({ id: applicationId })
        
        // Check if the application belongs to the user who sent the request
        if(application.user.username === username)
            return await this.applicationRepository.update({ id: applicationId }, { ...applicationDetails })
        else throw new HttpException("You are not allowed to update this application",HttpStatus.BAD_REQUEST)
    }

    // delete application
    async deleteApplication(username: string, applicationId: number, applicationDetails: ApplicationParams): Promise<DeleteResult> {
        const application = await this.applicationRepository.findOneBy({ id: applicationId })
        
        // Check if the application belongs to the user who sent the request
        if(application.user.username === username)
            return await this.applicationRepository.delete({ id: applicationId })
        else throw new HttpException("You are not allowed to delete this application",HttpStatus.BAD_REQUEST)
    }
}
