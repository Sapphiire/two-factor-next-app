import { compare } from 'bcryptjs'

import { validate as validateEmail } from 'isemail'
import type { NextApiRequest, NextApiResponse } from 'next'

import mailer from '~/lib/mailjet'
import { generateSecret, otp } from '~/lib/otp'
import { UserRepository } from '~/lib/repo/user-repository'
import { AuthService } from '~/lib/auth/auth-service'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid request' })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid request' })
        }

        const user = await UserRepository.findBy(email, 'email')

        if (!user) {
            return res.status(404).json({ message: 'User are not exists' })
        }

        const isPasswordCorrect = await compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: 'Password is not correct' })
        }

        if (user.twoFA) {
            const otpSecret = generateSecret()

            await UserRepository.update(user.id, { otpSecret })

            const otpToken = otp.generate(otpSecret)

            mailer.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: 'zakharovvadzim@gmail.com',
                            Name: 'Two-Factor Next App',
                        },
                        To: [
                            {
                                Email: user.email,
                            },
                        ],
                        Subject: 'OTP',
                        TextPart: `OTP: ${otpToken}`,
                        HTMLPart: `<div>OTP: </div><code>${otpToken}</code>`,
                    },
                ],
            })

            return res.status(201).json({
                id: user.id,
                twoFA: true,
                message: 'Otp is sent to email',
            })
        }

        const jwtCookie = await AuthService.bakeJwt(user)

        return res
            .setHeader('Set-Cookie', jwtCookie)
            .status(200)
            .json({ message: 'Success' })
    } catch (err) {
        return res.status(500).json({ err })
    }
}

export default handler
