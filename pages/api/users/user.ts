import type { NextApiRequest, NextApiResponse } from 'next'

import { UserRepository } from '~/lib/repo/user-repository'
import { AuthService } from '~/lib/auth/auth-service'
import { authMiddleware } from '~/lib/auth/auth-middleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const decoded = await authMiddleware(req, res)

    const user = await UserRepository.findById(decoded.id)

    if (!user) {
        return res.status(401).json({ message: 'Something went wrong' })
    }

    return res.status(200).json(AuthService.makeUserResponse(user))
}

export default handler
