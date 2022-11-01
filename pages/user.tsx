import axios from 'axios'
import React, { useEffect } from 'react'
import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { LogIn, User as UserIcon } from '@geist-ui/icons'
import { Text, Grid, Spacer, Button, Collapse } from '@geist-ui/core'

import config from '~/config/main.config'
import { useAuth } from '~/lib/auth/auth-provider'
import { UserActions } from '~/components/UserActions'
import { UserInfo } from '~/components/UserInfo'
import type { UserResponse } from '~/model/User'

import styles from '~/styles/.module.css'

interface IUserPageProps {
    auth: boolean
}

const UserPage: NextPage<IUserPageProps> = () => {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication, setUser } = useAuth()

    useEffect(() => {
        async function resolve() {
            try {
                const response = await axios.get(config.routes.backend.user)
                console.log(response.data)
                setUser(response.data as UserResponse)
            } catch (error) {}
        }

        isAuthenticated && resolve()
    }, [])

    if (!isAuthenticated) {
        return (
            <Grid className={styles.no_user}>
                <UserIcon size={100} />
                <Spacer h={0.5} />
                <Text h5>You are not Signed In</Text>
                <Spacer h={0.5} />
                <Button
                    width="100%"
                    icon={<LogIn />}
                    onClick={() => router.push('/')}
                >
                    Sign In
                </Button>
            </Grid>
        )
    }

    return (
        <Collapse.Group className={styles.container} accordion={true}>
            <Collapse shadow title="User" subtitle="email & name & 2-factor">
                <UserInfo />
            </Collapse>
            <Collapse shadow title="Actions" subtitle="edit user & sign out">
                <UserActions />
            </Collapse>
        </Collapse.Group>
    )
}

export default UserPage
