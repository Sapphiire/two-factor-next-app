import { validate as validateEmail } from 'isemail'
import type { NextApiRequest, NextApiResponse } from 'next'

import { otp } from '~/lib/otp'
import { UserRepository } from '~/lib/repo/user-repository'
import { AuthService } from '~/lib/auth/auth-service'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, otp: otpToken } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Invalid request' })
    }

    if (!otpToken) {
        return res.status(400).json({ message: 'Invalid request' })
    }

    const user = await UserRepository.findById(id)

    if (!user) {
        return res.status(400).json({ message: 'User are not exists' })
    }

    if (!user.twoFA) {
        return res.status(400).json({ message: 'Fail' })
    }

    const isOtpCorrect = otp.check(otpToken, user.otpSecret)

    if (!isOtpCorrect) {
        return res.status(401).json({ message: 'Otp incorrect' })
    }

    await UserRepository.update(user.id, { otpSecret: null })

    const jwtCookie = await AuthService.bakeJwt(user)

    return res
        .setHeader('Set-Cookie', jwtCookie)
        .status(200)
        .json({ message: 'Success' })
}

export default handler
