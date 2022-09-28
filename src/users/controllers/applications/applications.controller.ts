import { Controller, Get, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ApplicationsService } from 'src/users/services/applications/applications.service';

@Controller('users/applications')
export class ApplicationsController {

    constructor(private applicationService: ApplicationsService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserApplications(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        return this.applicationService.userApplications(id)
    }
}
