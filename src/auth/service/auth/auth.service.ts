import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { UserParams } from 'src/utils/types';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username)

        if (user && bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user 

            return result
        }
        
        return null
    }

    async login(user: UserParams & { id: number | string }) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
