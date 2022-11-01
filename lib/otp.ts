import { authenticator, totp } from 'otplib'

const generateSecret = () => authenticator.generateSecret(10)

const makeOtp = () => {
    const otp = totp.clone()
    otp.resetOptions()
    otp.options = {
        step: 120,
        window: 3,
    }
    return otp
}

const otp: typeof totp = makeOtp()

export { generateSecret, otp }
