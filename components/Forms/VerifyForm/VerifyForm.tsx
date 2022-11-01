import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Button, Grid, Input, Spacer, useToasts } from '@geist-ui/core'
import { LogIn, Code, Mail } from '@geist-ui/icons'

import { useAuth } from '~/lib/auth/auth-provider'
import config from '~/config/main.config'

interface IVerifyFormProps {
    userId: string
    onSubmit?: () => void
    onCancel?: () => void
}

const VerifyForm: React.FC<IVerifyFormProps> = ({ userId, onSubmit }) => {
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: { otp: '' },
        onSubmit: async ({ otp }) => {
            setLoading(true)

            try {
                await axios.post(
                    config.routes.backend.verify,
                    {
                        otp,
                        id: userId,
                    },
                    config.axios.simple
                )

                setLocalAuthentication(true)
                setToast({ text: 'Successfully signed in' })
                router.push(config.routes.frontend.user)
                onSubmit()
            } catch (error) {
                setLocalAuthentication(false)
                setToast({
                    type: 'error',
                    text: error.message || 'Something went wrong',
                })
            }

            setLoading(false)
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input
                id="otp"
                width="100%"
                placeholder="Input otp"
                icon={<Code />}
                value={formik.values.otp}
                onChange={formik.handleChange}
            />
            <Spacer h={1} />
            <Button
                htmlType="submit"
                type="success-light"
                width="100%"
                icon={<LogIn />}
                loading={loading}
            >
                Sign In
            </Button>
        </form>
    )
}

export { VerifyForm }
export type { IVerifyFormProps }
