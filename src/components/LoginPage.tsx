'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Building2, Eye, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, loginAsPublic } = useAuth()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 text-center">
          <div className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl">
            {/* <Shield className="h-16 w-16 text-white" /> */}
            <img src='/logo.png' className='h-16 w-16' />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-3">PMS Portal</h1>
            <p className="text-xl text-slate-600 max-w-md">
              Polyclinic Management System
            </p>
            <p className="text-sm text-slate-500 mt-2">
              ECHS Regional Centre Administrative Portal
            </p>
          </div>
        </div>

        {/* Right side - Login Forms */}
        <div className="space-y-6">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              {/* <Shield className="h-10 w-10 text-white" />
               */}
               <img src='/logo.png' className='h-10 w-10' />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">PMS Portal</h1>
            <p className="text-slate-600 mt-1">Polyclinic Management System</p>
          </div>

          {/* Admin/Polyclinic Login Card */}
          <Card className="border-2 border-slate-200 shadow-xl">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-900">Sign In</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your credentials to access the portal
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
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium"
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
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Demo Credentials
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      {/* <Shield className="h-4 w-4 text-slate-700" /> */}
                      <img src='/logo.png' className='h-4 w-4' />
                      <p className="text-xs font-semibold text-slate-700">Admin</p>
                    </div>
                    <p className="text-xs text-slate-600 font-mono">admin / admin123</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      {/* <Building2 className="h-4 w-4 text-slate-700" /> */}
                      <img src='/logo.png' className='h-4 w-4' />
                      <p className="text-xs font-semibold text-slate-700">Polyclinic</p>
                    </div>
                    <p className="text-xs text-slate-600 font-mono">polyclinic / poly123</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Public View Card */}
          <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Public View</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Access limited view with Orders and Support tickets only
                  </p>
                  <Button
                    onClick={handlePublicView}
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-medium"
                  >
                    Continue as Public User
                  </Button>
                </div>
              </div>
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

