import * as jose from 'jose'

import { JWT_SECRET } from '~/lib/env'

type JwtPayload = {
    id: string
}

class JwtServiceClass {
    private secret: string

    constructor(secret: string) {
        this.secret = secret
    }

    public async signJwt(id: string) {
        return await new jose.SignJWT({ id } as JwtPayload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d')
            .sign(new TextEncoder().encode(JWT_SECRET))
    }

    public async verifyJwt(jwt: string): Promise<JwtPayload> {
        const { payload: jwtData } = await jose.jwtVerify(
            jwt,
            new TextEncoder().encode(JWT_SECRET)
        )

        return jwtData as JwtPayload
    }
}

const JwtService = new JwtServiceClass(JWT_SECRET)

export { JwtService }
