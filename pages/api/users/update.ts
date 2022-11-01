import type { NextApiRequest, NextApiResponse } from 'next'

import { UserRepository } from '~/lib/repo/user-repository'
import { AuthService } from '~/lib/auth/auth-service'
import { authMiddleware } from '~/lib/auth/auth-middleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Nothing to update' })
    }

    const decoded = await authMiddleware(req, res)

    const user = await UserRepository.findById(decoded.id)

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const updatedUser = await UserRepository.update(decoded.id, req.body)

    return res.status(200).json(AuthService.makeUserResponse(updatedUser))
}

export default handler
