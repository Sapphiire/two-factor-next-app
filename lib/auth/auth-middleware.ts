import type { NextApiRequest, NextApiResponse } from 'next'

import { JwtService } from '~/lib/jwt'

import { COOKIE_NAME } from './constants'

const authMiddleware = async (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = req

    if (!cookies) res.status(401).json({ message: 'Unauthorized' })

    const jwt = cookies[COOKIE_NAME]

    if (!jwt) res.status(401).json({ message: 'Unauthorized' })

    return await JwtService.verifyJwt(jwt)
}

export { authMiddleware }
