import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Button, Input, Modal, Spacer, useToasts } from '@geist-ui/core'
import { LogIn, Mail, Lock } from '@geist-ui/icons'

import { useAuth } from '~/lib/auth/auth-provider'
import config from '~/config/main.config'

import { VerifyForm } from '../VerifyForm'

const SignInForm: React.FC = () => {
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const [loading, setLoading] = useState<boolean>(false)

    const [verifyState, setIsVerifyState] = useState({
        isVerify: false,
        userId: null,
    })
    const onVerifyStart = (userId: string) =>
        setIsVerifyState({ isVerify: true, userId })

    const onVerifyCancel = () =>
        setIsVerifyState({ isVerify: false, userId: null })

    const signIn = async (values: any) => {
        const { data } = await axios.post(
            config.routes.backend.signin,
            values,
            config.axios.simple
        )

        return data
    }

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: async (values) => {
            setLoading(true)

            try {
                const { data } = await axios.post(
                    config.routes.backend.signin,
                    values,
                    config.axios.simple
                )

                if (data.twoFA) {
                    setLoading(false)
                    return onVerifyStart(data.id)
                }

                setLocalAuthentication(true)
                router.push(config.routes.frontend.user)
                setToast({ text: 'Successfully signed in' })
            } catch (error) {
                setLocalAuthentication(false)
                setToast({
                    type: 'error',
                    text: error.message || 'Something went wrong',
                })
                setLoading(false)
            }
        },
    })

    return (
        <>
            <Modal visible={verifyState.isVerify} onClose={onVerifyCancel}>
                <Modal.Title>Verify OTP</Modal.Title>
                <Modal.Content>
                    <VerifyForm
                        userId={verifyState.userId}
                        onSubmit={onVerifyCancel}
                        onCancel={onVerifyCancel}
                    />
                </Modal.Content>
            </Modal>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    id="email"
                    width="100%"
                    placeholder="Input your email"
                    icon={<Mail />}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                >
                    Email
                </Input>
                <Spacer h={1} />
                <Input.Password
                    id="password"
                    width="100%"
                    placeholder="Input your password"
                    icon={<Lock />}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                >
                    Password
                </Input.Password>
                <Spacer h={1.5} />
                <Button
                    htmlType="submit"
                    width="100%"
                    scale={1.5}
                    icon={<LogIn />}
                    loading={loading}
                >
                    Sign In
                </Button>
            </form>
        </>
    )
}

export { SignInForm }
