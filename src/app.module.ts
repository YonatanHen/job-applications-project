import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entitites/User';
import { UsersModule } from './users/users.module';


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
      entities: [User],
      synchronize: true
    }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
