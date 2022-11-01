import type { NextPage, NextPageContext } from 'next'
import { Collapse } from '@geist-ui/core'

import { SignInForm } from '~/components/Forms/SignInForm'
import { SignUpForm } from '~/components/Forms/SignUpForm'

import styles from '~/styles/.module.css'

const HomePage: NextPage = () => (
    <Collapse.Group className={styles.container} accordion={true}>
        <Collapse shadow title="Sign In" subtitle="with Email & Password">
            <SignInForm />
        </Collapse>
        <Collapse shadow title="Sign Up" subtitle="with Email & Password">
            <SignUpForm />
        </Collapse>
    </Collapse.Group>
)

export default HomePage
