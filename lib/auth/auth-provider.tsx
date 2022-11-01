import {
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react'

import { UserResponse } from '~/model/User'

type AuthProviderType = {
    user: UserResponse
    setUser: (val: UserResponse) => void
    isAuthenticated: boolean
    setLocalAuthentication?: (val: boolean) => void
}

const AuthContext = createContext<AuthProviderType>(null)

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const authentication = window.localStorage.getItem('authentication')
            setAuthenticated(authentication === 'true' ? true : false)
        }
    }, [])

    const setLocalAuthentication = useCallback((authentication) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('authentication', authentication)
            setAuthenticated(authentication)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setLocalAuthentication,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error('Hooks must be used within a provider.')

    return context
}

const useIsAuthenticated = () => {
    const context = useAuth()
    return context.isAuthenticated
}

export { useAuth, useIsAuthenticated, AuthProvider }
