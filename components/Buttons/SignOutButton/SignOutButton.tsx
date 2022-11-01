import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/router'
import { Button, useToasts } from '@geist-ui/core'
import { LogOut } from '@geist-ui/icons'

import { useAuth } from '~/lib/auth/auth-provider'
import config from '~/config/main.config'

const SignOutButton: React.FC = () => {
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const onSignOut = async () => {
        await axios.post(config.routes.backend.signout)

        await router.push(config.routes.frontend.root)
        setToast({ type: 'success', text: 'Successfully signed out' })
        setLocalAuthentication(false)
    }

    return (
        <Button
            width="100%"
            type="error-light"
            icon={<LogOut />}
            onClick={onSignOut}
        >
            Sign Out
        </Button>
    )
}

export { SignOutButton }
