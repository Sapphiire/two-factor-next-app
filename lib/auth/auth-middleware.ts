import type { NextApiRequest, NextApiResponse } from 'next'

import { JwtService } from '~/lib/jwt'

const authMiddleware = async (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = req

    if (!cookies) res.status(401).json({ message: 'Unauthorized' })

    const jwt = cookies.AJWT

    if (!jwt) res.status(401).json({ message: 'Unauthorized' })

    return await JwtService.verifyJwt(jwt)
}

export { authMiddleware }
