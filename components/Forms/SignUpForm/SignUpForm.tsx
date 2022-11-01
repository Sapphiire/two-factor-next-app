import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Input, Spacer, useToasts } from '@geist-ui/core'
import { Mail, Lock, UserPlus } from '@geist-ui/icons'

import config from '~/config/main.config'

const SignUpForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setToast } = useToasts()

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: async (values) => {
            setLoading(true)

            try {
                await axios.post(
                    config.routes.backend.signup,
                    values,
                    config.axios.simple
                )

                setToast({ type: 'success', text: 'Successfully signed up' })
            } catch (err) {
                setToast({
                    type: 'error',
                    text: 'Something went wrong on the server',
                })
            }

            setLoading(false)
        },
    })

    return (
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
                loading={loading}
                icon={<UserPlus />}
            >
                Sign Up
            </Button>
        </form>
    )
}

export { SignUpForm }
