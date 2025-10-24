'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Building2, Eye, AlertCircle, Hospital, Users, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface LoginPageProps {
  selectedRole?: 'admin' | 'polyclinic' | 'public'
  onBack?: () => void
}

export default function LoginPage({ selectedRole, onBack }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, loginAsPublic } = useAuth()

  // Get role-specific configuration
  const getRoleConfig = () => {
    switch (selectedRole) {
      case 'admin':
        return {
          icon: Building2,
          title: 'Regional Center',
          subtitle: 'Admin Login',
          description: 'Sign in to access command dashboard',
          theme: 'blue',
          bgColor: 'bg-blue-900',
          borderColor: 'border-blue-200',
          gradientFrom: 'from-blue-50',
          credentials: 'admin / admin123'
        }
      case 'polyclinic':
        return {
          icon: Hospital,
          title: 'Polyclinic',
          subtitle: 'Polyclinic Login',
          description: 'Sign in to manage your polyclinic',
          theme: 'emerald',
          bgColor: 'bg-emerald-700',
          borderColor: 'border-emerald-200',
          gradientFrom: 'from-emerald-50',
          credentials: 'polyclinic / poly123'
        }
      case 'public':
        return {
          icon: Users,
          title: 'Beneficiary',
          subtitle: 'Public View',
          description: 'Access public information',
          theme: 'purple',
          bgColor: 'bg-purple-700',
          borderColor: 'border-purple-200',
          gradientFrom: 'from-purple-50',
          credentials: null
        }
      default:
        return {
          icon: Shield,
          title: 'PMS Portal',
          subtitle: 'Sign In',
          description: 'Enter your credentials',
          theme: 'slate',
          bgColor: 'bg-slate-900',
          borderColor: 'border-slate-200',
          gradientFrom: 'from-slate-50',
          credentials: null
        }
    }
  }

  const roleConfig = getRoleConfig()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = login(username, password)
      
      if (!success) {
        setError('Invalid credentials. Please try again.')
      }
      
      setIsLoading(false)
    }, 500)
  }

  const handlePublicView = () => {
    loginAsPublic()
  }

  const RoleIcon = roleConfig.icon

  // If public role is selected, directly login
  if (selectedRole === 'public') {
    handlePublicView()
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 text-center">
          <div className={`w-32 h-32 ${roleConfig.bgColor} rounded-2xl flex items-center justify-center shadow-2xl`}>
            <RoleIcon className="h-16 w-16 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-3">{roleConfig.title}</h1>
            <p className="text-xl text-slate-600 max-w-md">
              {roleConfig.subtitle}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              ECHS Polyclinic Management System
            </p>
          </div>
        </div>

        {/* Right side - Login Forms */}
        <div className="space-y-6">
          {/* Back button */}
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to selection
            </Button>
          )}

          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className={`w-20 h-20 ${roleConfig.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
              <RoleIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{roleConfig.title}</h1>
            <p className="text-slate-600 mt-1">{roleConfig.subtitle}</p>
          </div>

          {/* Admin/Polyclinic Login Card */}
          <Card className={`border-2 ${roleConfig.borderColor} shadow-xl`}>
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-900">Sign In</CardTitle>
              <CardDescription className="text-slate-600">
                {roleConfig.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-700 font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 border-slate-300 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-slate-300 bg-white"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full h-11 ${roleConfig.bgColor} hover:opacity-90 text-white font-medium`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Credential hints */}
              {roleConfig.credentials && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Demo Credentials
                  </p>
                  <div className={`p-3 ${roleConfig.gradientFrom} to-white rounded-lg border ${roleConfig.borderColor}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <RoleIcon className="h-4 w-4 text-slate-700" />
                      <p className="text-xs font-semibold text-slate-700">{roleConfig.title}</p>
                    </div>
                    <p className="text-xs text-slate-600 font-mono">{roleConfig.credentials}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-center text-slate-500">
            © 2025 ECHS Regional Centre. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

