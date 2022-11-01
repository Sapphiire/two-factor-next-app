export default {
    defaultLocale: 'en',
    theme: {
        defaultTheme: 'dark',
        lightBackground: '#F0F0F0',
        darkBackground: '#040404',
    },
    routes: {
        frontend: {
            root: '/',
            user: '/user',
        },
        backend: {
            user: '/api/users/user',
            update: '/api/users/update',
            signin: '/api/users/signin',
            signout: '/api/users/signout',
            signup: '/api/users/signup',
            verify: '/api/users/verify',
        },
    },
    axios: {
        simple: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    },
} as const
