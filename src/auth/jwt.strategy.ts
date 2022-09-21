import * as dotenv from 'dotenv'
import { HttpException, HttpStatus, Injectable, ValidationPipe } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadParams } from 'src/utils/types';
import { Request } from 'express';

dotenv.config({ path: process.cwd() + '/config/.env' })

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
            passReqToCallback: true
        })
    }

    async validate(req: Request, payload: PayloadParams) {
        if (req.params && (payload.sub === parseInt(req.params.id)
            || payload.username === req.params.username))
            return { userId: payload.sub, username: payload.username }
        else throw new HttpException('You are not allowed to do this operation', HttpStatus.UNAUTHORIZED)
    }
}