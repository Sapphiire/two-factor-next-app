import { serialize } from 'cookie'

import { JwtService } from '~/lib/jwt'
import { NODE_ENV } from '~/lib/env'
import type { User } from '~/model/User'

import { COOKIE_NAME } from './constants'

class AuthServiceClass {
    public async bakeJwt(
        user: User,
        sameSite: boolean | 'lax' | 'strict' | 'none' = 'strict'
    ) {
        const token = await JwtService.signJwt(String(user.id))
        return serialize(COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            sameSite,
            path: '/',
        })
    }

    public makeUserResponse(user: User) {
        return {
            name: user.name,
            email: user.email,
            twoFA: user.twoFA,
        }
    }
}

const AuthService = new AuthServiceClass()

export { AuthService }
