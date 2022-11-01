import React, { useState } from 'react'
import { Grid, Modal, Button, Loading } from '@geist-ui/core'
import { Edit } from '@geist-ui/icons'

import { useAuth } from '~/lib/auth/auth-provider'
import { SignOutButton } from '~/components/Buttons/SignOutButton'
import { EditUserForm } from '~/components/Forms/EditUserForm'

const UserActions: React.FC = () => {
    const { user } = useAuth()

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const onEditStart = () => setIsEditing(true)
    const onEditCancel = () => setIsEditing(false)

    if (!user) {
        return (
            <Grid.Container gap={1}>
                <Loading />
            </Grid.Container>
        )
    }

    return (
        <>
            <Modal keyboard visible={isEditing} onClose={onEditCancel}>
                <Modal.Title>Edit</Modal.Title>
                <Modal.Subtitle>
                    You can edit email & name & 2-factor
                </Modal.Subtitle>
                <Modal.Content>
                    <EditUserForm
                        onSubmit={onEditCancel}
                        onCancel={onEditCancel}
                    />
                </Modal.Content>
            </Modal>

            <Grid.Container gap={1}>
                <Grid xs={24} md={12}>
                    <Button width="100%" icon={<Edit />} onClick={onEditStart}>
                        Edit
                    </Button>
                </Grid>
                <Grid xs={24} md={12}>
                    <SignOutButton />
                </Grid>
            </Grid.Container>
        </>
    )
}

export { UserActions }
