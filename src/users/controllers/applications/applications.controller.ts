import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { application, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CRUDApplicationDto } from 'src/users/dtos/CRUDApplicationDTO';
import { ApplicationsService } from 'src/users/services/applications/applications.service';

@Controller('users/applications')
export class ApplicationsController {

    constructor(private applicationService: ApplicationsService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(':username')
    async getUserApplications(@Param('username') username: string, @Res() res: Response) {
        const applications = await this.applicationService.userApplications(username)
        
        if(applications.length) res.status(HttpStatus.ACCEPTED).send(applications)
        else res.status(HttpStatus.NO_CONTENT).send(`No applications found for ${username}.`)
    }

    
    @UseGuards(JwtAuthGuard)
    @Post(':username')
    async createApplication(@Param('username') username: string, @Body() createApplicationDto: CRUDApplicationDto, @Res() res: Response) {
        await this.applicationService.createApplication(username, createApplicationDto)
        res.status(HttpStatus.ACCEPTED).send("Application created successfully.")
        //QueryFailedError: Column 'status' cannot be null
    }
}
