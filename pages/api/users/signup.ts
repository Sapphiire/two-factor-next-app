import type { NextApiRequest, NextApiResponse } from 'next'
import { genSalt, hash } from 'bcryptjs'
import { validate as validateEmail } from 'isemail'

import { UserRepository } from '~/lib/repo/user-repository'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid request' })
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid request' })
    }

    const candidate = await UserRepository.findBy(email, 'email')

    if (candidate) {
        return res
            .status(400)
            .json({ message: 'User with the same email already exists' })
    }

    const user = await UserRepository.create(req.body)

    return res.status(200).json({ user })
}

export default handler
