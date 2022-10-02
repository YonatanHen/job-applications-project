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
    async createApplication(username: string, applicationDetails: ApplicationParams): Promise<Application | void> {
        const user = await this.userRepository.findOneBy({ username })
        if (!user) throw new HttpException("Can't create the application. user not found.", HttpStatus.BAD_REQUEST)

        const newApplication = this.applicationRepository.create({ ...applicationDetails, user })
        return await this.applicationRepository.save(newApplication)
            .catch(err => {
                console.log(err)
                switch (err.errno) {
                    case 1292:
                        throw new HttpException("Date value is incorrect, the format is: yyyy-mm-dd", HttpStatus.BAD_REQUEST)
                    case 1265:
                        throw new HttpException("Status value is incorrect, the status field must be empty or Unknown/Ignored/Accepted.", HttpStatus.BAD_REQUEST)
                    default:
                        throw new HttpException("Internal server Error", HttpStatus.INTERNAL_SERVER_ERROR)
                }
            })
    }

    // update application
    async updateApplication(username: string, applicationId: number, applicationDetails: ApplicationParams): Promise<UpdateResult | void> {
        const application = await this.applicationRepository.findOneBy({ id: applicationId })

        // Check if the application belongs to the user who sent the request
        if (application.user.username === username) {
            return await this.applicationRepository.update({ id: applicationId }, { ...applicationDetails })
                .catch(err => {
                    console.log(err)
                    switch (err.errno) {
                        case 1292:
                            throw new HttpException("Date value is incorrect, the format is: yyyy-mm-dd", HttpStatus.BAD_REQUEST)
                        case 1265:
                            throw new HttpException("Status value is incorrect, the status field must be empty or Unknown/Ignored/Accepted.", HttpStatus.BAD_REQUEST)
                            default:
                        throw new HttpException("Internal server Error", HttpStatus.INTERNAL_SERVER_ERROR)
                    }
                })
        }
        else throw new HttpException("You are not allowed to update this application", HttpStatus.BAD_REQUEST)
    }

    // delete application
    async deleteApplication(username: string, applicationId: number): Promise<DeleteResult> {
        const application = await this.applicationRepository.findOneBy({ id: applicationId })
        if(!application) throw new HttpException("Job application not found.", HttpStatus.NOT_FOUND)

        // Check if the application belongs to the user who sent the request
        if (application.user.username === username)
            return await this.applicationRepository.delete({ id: applicationId })
        else throw new HttpException("You are not allowed to delete this application", HttpStatus.BAD_REQUEST)
    }
}
