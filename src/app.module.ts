import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './entitites/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { Profile } from './entitites/Profile';
import { ApplicationsModule } from './services/applications/applications.module';
import { ApplicationsModule } from './applications/applications.module';
import { ApplicationsService } from './services/applications/applications/applications.service';
import { ApplicationsService } from './user/services/applications/applications.service';

dotenv.config({ path: process.cwd() + '/config/.env' })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: 'applications_app',
      entities: [User, Profile],
      synchronize: true
    }), UsersModule, AuthModule, ApplicationsModule],
  controllers: [AppController],
  providers: [AppService, ApplicationsService],
})
export class AppModule {}
