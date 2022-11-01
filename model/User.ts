export type User = {
    id: string
    email: string
    password: string
    twoFA: boolean
    name?: string
    otpSecret?: string
}

export type UserResponse = {
    name?: string
    email: string
    twoFA: boolean
}
