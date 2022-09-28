import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/entitites/Application';
import { User } from 'src/entitites/User';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationsService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>
    ) {}

    // get user applications
    async userApplications(id: number): Promise<Application[]> {
        const user = await this.userRepository.findOneBy({ id })
        return this.applicationRepository.findBy({ user: user })
    }

    // add application

    // update application

    // delete application
}
