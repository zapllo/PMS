'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Hospital, Users } from 'lucide-react'
import { useState } from 'react'

interface RoleSelectionPageProps {
  onRoleSelect: (role: 'admin' | 'polyclinic' | 'public') => void
}

export default function RoleSelectionPage({ onRoleSelect }: RoleSelectionPageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const roles = [
    {
      id: 'admin',
      title: 'Regional Center',
      subtitle: 'Admin Login',
      description: 'Access command dashboard and manage all ECHS polyclinics',
      icon: Building2,
      theme: {
        bg: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-100',
        border: 'border-blue-200',
        hoverBorder: 'hover:border-blue-400',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        titleColor: 'text-blue-900',
        descColor: 'text-blue-700',
        shadow: 'hover:shadow-blue-200'
      }
    },
    {
      id: 'polyclinic',
      title: 'Polyclinic',
      subtitle: 'Polyclinic Login',
      description: 'Manage your polyclinic operations, staff, and resources',
      icon: Hospital,
      theme: {
        bg: 'bg-emerald-50',
        hoverBg: 'hover:bg-emerald-100',
        border: 'border-emerald-200',
        hoverBorder: 'hover:border-emerald-400',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        titleColor: 'text-emerald-900',
        descColor: 'text-emerald-700',
        shadow: 'hover:shadow-emerald-200'
      }
    },
    {
      id: 'public',
      title: 'Beneficiary',
      subtitle: 'Public View',
      description: 'View official orders, announcements, and public information',
      icon: Users,
      theme: {
        bg: 'bg-purple-50',
        hoverBg: 'hover:bg-purple-100',
        border: 'border-purple-200',
        hoverBorder: 'hover:border-purple-400',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        titleColor: 'text-purple-900',
        descColor: 'text-purple-700',
        shadow: 'hover:shadow-purple-200'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16  rounded-2xl shadow-lg flex items-center justify-center border-2 border-slate-200">
              {/* <Building2 className="h-8 w-8 text-slate-700" /> */}
              <img src='/logo.png' className='h-8 w-8' />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            ECHS Polyclinic Management System
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ex-Servicemen Contributory Health Scheme
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Select your access type to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            const isHovered = hoveredCard === role.id

            return (
              <Card
                key={role.id}
                className={`
                  cursor-pointer transition-all duration-300 border-2
                  ${role.theme.bg} ${role.theme.border} ${role.theme.hoverBg} ${role.theme.hoverBorder}
                  ${isHovered ? `shadow-2xl ${role.theme.shadow} scale-105` : 'shadow-md'}
                `}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onRoleSelect(role.id as 'admin' | 'polyclinic' | 'public')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`
                      w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
                      ${role.theme.iconBg}
                      ${isHovered ? 'scale-110 rotate-3' : ''}
                    `}>
                      <Icon className={`h-10 w-10 ${role.theme.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className={`text-2xl font-bold mb-2 ${role.theme.titleColor}`}>
                    {role.title}
                  </CardTitle>
                  <CardDescription className={`text-sm font-semibold uppercase tracking-wide ${role.theme.descColor}`}>
                    {role.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className={`text-sm leading-relaxed ${role.theme.descColor}`}>
                    {role.description}
                  </p>
                  <div className="mt-6">
                    <div className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                      ${role.theme.iconBg} ${role.theme.iconColor}
                      transition-all duration-300
                      ${isHovered ? 'gap-3' : ''}
                    `}>
                      <span>Continue</span>
                      <span className={`transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}>→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Serving those who served the nation
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span>Ministry of Defence</span>
            <span>•</span>
            <span>Government of India</span>
          </div>
        </div>
      </div>
    </div>
  )
}

