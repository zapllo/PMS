'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'admin' | 'polyclinic' | 'public' | null

interface User {
  username: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  loginAsPublic: () => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple credential check (no JWT, just basic authentication)
const CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin' as UserRole },
  polyclinic: { username: 'polyclinic', password: 'poly123', role: 'polyclinic' as UserRole },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (username: string, password: string): boolean => {
    // Check admin credentials
    if (username === CREDENTIALS.admin.username && password === CREDENTIALS.admin.password) {
      setUser({ username: CREDENTIALS.admin.username, role: CREDENTIALS.admin.role })
      return true
    }
    
    // Check polyclinic credentials
    if (username === CREDENTIALS.polyclinic.username && password === CREDENTIALS.polyclinic.password) {
      setUser({ username: CREDENTIALS.polyclinic.username, role: CREDENTIALS.polyclinic.role })
      return true
    }
    
    return false
  }

  const loginAsPublic = () => {
    setUser({ username: 'Public User', role: 'public' })
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, loginAsPublic, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

