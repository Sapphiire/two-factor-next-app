import '~/styles/global.css'
import Head from 'next/head'
import { CssBaseline, GeistProvider } from '@geist-ui/core'

import { Layout } from '~/components/Layout'
import { AuthProvider } from '~/lib/auth/auth-provider'

const App = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>2Factor Auth App</title>
        </Head>
        <GeistProvider themeType="dark">
            <CssBaseline />
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </GeistProvider>
    </>
)

export default App
