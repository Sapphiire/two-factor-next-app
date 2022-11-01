import React from 'react'
import { capitalize } from 'underscore.string'
import { Grid, Input, Loading } from '@geist-ui/core'
import { Mail, Hash, User as UserIcon } from '@geist-ui/icons'

import { useAuth } from '~/lib/auth/auth-provider'

const ICON_BY_FIELD = {
    name: <UserIcon />,
    email: <Mail />,
    twoFA: <Hash />,
}

const UserInfo: React.FC = () => {
    const { user } = useAuth()

    if (!user) {
        return <Loading />
    }

    return (
        <Grid.Container gap={1}>
            {Object.entries(user).map(([key, value]) => (
                <Grid xs={24}>
                    <Input
                        icon={ICON_BY_FIELD[key]}
                        readOnly={true}
                        value={String(value)}
                        width="100%"
                    >
                        {capitalize(key)}
                    </Input>
                </Grid>
            ))}
        </Grid.Container>
    )
}

export { UserInfo }
