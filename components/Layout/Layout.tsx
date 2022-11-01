import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tabs, Grid, useTabs } from '@geist-ui/core'

import styles from './styles.module.css'

type TabType = {
    label: string
    href: string
}

const TABS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Account',
        href: '/user',
    },
] as TabType[]

interface ILayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const router = useRouter()
    const { state: activeTab, setState: setActiveTab } = useTabs(
        router.pathname
    )

    const onChange = useCallback(
        async (href: string) => {
            router.push(href)
        },
        [router]
    )

    useEffect(() => {
        setActiveTab(router.pathname)
    }, [router, setActiveTab])

    return (
        <Grid.Container className={styles.container} justify="center">
            <Grid className={styles.tabs}>
                <Tabs hideDivider onChange={onChange} value={activeTab}>
                    {TABS.map((tab) => (
                        <Tabs.Item
                            key={tab.href}
                            label={tab.label}
                            value={tab.href}
                        />
                    ))}
                </Tabs>
            </Grid>

            <Grid className={styles.body}>{children}</Grid>
        </Grid.Container>
    )
}

export { Layout }
