import axios from 'axios'
import { equals } from 'rambda'
import React, { useMemo, useState } from 'react'
import { useFormik } from 'formik'
import {
    Text,
    Button,
    Grid,
    Input,
    Spacer,
    Toggle,
    useToasts,
} from '@geist-ui/core'
import { Mail, Lock, User as UserIcon } from '@geist-ui/icons'

import { useAuth } from '~/lib/auth/auth-provider'
import config from '~/config/main.config'

interface IEditUserForm {
    onSubmit?: () => void
    onCancel?: () => void
}

const EditUserForm: React.FC<IEditUserForm> = ({ onSubmit, onCancel }) => {
    const { setToast } = useToasts()
    const { setUser, user } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const [isTwoFa, setIsTwoFa] = useState<boolean>(user.twoFA)

    const initialValues = useMemo(
        () => ({ name: '', password: '', ...user }),
        [user]
    )

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if (equals(initialValues, values) && user.twoFA === isTwoFa) {
                return onSubmit()
            }

            setLoading(true)

            try {
                const { data } = await axios.post(
                    config.routes.backend.update,
                    { ...values, twoFA: isTwoFa },
                    config.axios.simple
                )

                setUser(data)
                setToast({ text: 'Successfully edited user information' })
                setLoading(false)
                onSubmit()
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
        <form onSubmit={handleSubmit}>
            <Input
                id="name"
                width="100%"
                placeholder="Input your name..."
                icon={<UserIcon />}
                value={values.name}
                onChange={handleChange}
            >
                Name
            </Input>
            <Spacer h={1} />
            <Input
                id="email"
                width="100%"
                placeholder="Input your email..."
                icon={<Mail />}
                value={values.email}
                onChange={handleChange}
            >
                Email
            </Input>
            <Spacer h={1} />
            <Input.Password
                id="password"
                width="100%"
                placeholder="Input your password..."
                icon={<Lock />}
                value={values.password}
                onChange={handleChange}
            >
                Password
            </Input.Password>

            <Spacer h={1.5} />

            <Grid.Container alignItems="center" justify="space-between">
                <Text
                    font="14px"
                    onClick={() => setIsTwoFa(!isTwoFa)}
                    style={{ cursor: 'pointer' }}
                >
                    Two-Factor Authorization
                </Text>
                <Toggle
                    scale={1.5}
                    id="twoFA"
                    checked={isTwoFa}
                    onChange={() => setIsTwoFa(!isTwoFa)}
                />
            </Grid.Container>

            <Spacer h={2} />

            <Grid.Container justify="space-between">
                <Button type="default" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="success-light"
                    disabled={loading}
                    htmlType="submit"
                >
                    Edit
                </Button>
            </Grid.Container>
        </form>
    )
}

export { EditUserForm }
