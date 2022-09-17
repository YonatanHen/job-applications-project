import * as dotenv from 'dotenv'
import { Injectable, ValidationPipe } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadParams } from 'src/utils/types';

dotenv.config({ path: process.cwd() + '/config/.env' })

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        })
    }

    async validate(payload: PayloadParams) {
        return { userId: payload.sub, username: payload.username }
    }
}