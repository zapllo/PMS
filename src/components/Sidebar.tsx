'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings2,
  Truck,
  FileText,
  MessageSquare,
  Bell,
  HeadphonesIcon,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  MessageSquareMore,
  Star
} from 'lucide-react'
import { useState } from 'react'
import { useAuth, UserRole } from '@/contexts/AuthContext'

const menuSections = [
  {
    title: 'Command',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null, priority: false, description: 'Overview', roles: ['admin', 'polyclinic'] },
      { id: 'polyclinics', label: 'Polyclinics', icon: Building2, badge: null, priority: false, description: 'ECHS Facilities', roles: ['admin', 'polyclinic'] },
    ]
  },
  {
    title: 'Operations',
    items: [
      { id: 'manpower', label: 'Personnel', icon: Users, badge: '12', priority: true, description: 'Staff Management', roles: ['admin', 'polyclinic'] },
      { id: 'equipment', label: 'Equipment', icon: Settings2, badge: '5', priority: true, description: 'Asset Management', roles: ['admin', 'polyclinic'] },
      { id: 'vehicles', label: 'Fleet', icon: Truck, badge: null, priority: false, description: 'Vehicle Status', roles: ['admin', 'polyclinic'] },
    ]
  },
  {
    title: 'Administration',
    items: [
      { id: 'reports', label: 'Returns', icon: FileText, badge: '3', priority: true, description: 'Monthly Returns', roles: ['admin', 'polyclinic'] },
      { id: 'announcements', label: 'Orders', icon: Bell, badge: null, priority: false, description: 'Official Orders', roles: ['admin', 'polyclinic', 'public'] },
      { id: 'communications', label: 'Veterans', icon: MessageSquareMore, badge: null, priority: false, description: 'War Veterans', roles: ['admin', 'polyclinic'] },
    ]
  },
  {
    title: 'Support',
    items: [
      { id: 'tickets', label: 'Support', icon: HeadphonesIcon, badge: '4', priority: false, description: 'Technical Support', roles: ['admin', 'polyclinic', 'public'] },
      { id: 'feedback', label: 'Feedback', icon: Star, badge: null, priority: false, description: 'Polyclinic Feedback', roles: ['public'] },
      { id: 'settings', label: 'Settings', icon: Settings, badge: null, priority: false, description: 'System Settings', roles: ['admin', 'polyclinic'] },
    ]
  }
]

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, logout } = useAuth()

  // Filter menu sections based on user role
  const getFilteredMenuSections = () => {
    if (!user?.role) return []
    
    return menuSections
      .map(section => ({
        ...section,
        items: section.items.filter(item => item.roles.includes(user.role as string))
      }))
      .filter(section => section.items.length > 0)
  }

  const filteredMenuSections = getFilteredMenuSections()

  const getTotalPriorityItems = () => {
    return filteredMenuSections
      .flatMap(section => section.items)
      .filter(item => item.badge)
      .reduce((total, item) => total + parseInt(item.badge || '0'), 0)
  }

  const handleViewChange = (view: string) => {
    onViewChange(view)
    setIsMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMobileOpen && (
        <div className="lg:hidden fixed top-6 left-6 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileOpen(true)}
            className="bg-white border-slate-300 shadow-sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-all duration-300",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-20" : "w-80 lg:w-72"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "lg:justify-center" : "justify-between"
          )}>
            <div className={cn("flex items-center gap-3", isCollapsed && "lg:justify-center")}>
              {/* <div className="relative">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                {getTotalPriorityItems() > 0 && !isCollapsed && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{getTotalPriorityItems()}</span>
                  </div>
                )}
              </div> */}

              {!isCollapsed && (
                <div className=" flex justify-center gap-4 w-full items-center">
                  <img src='/logo.png' className='h-16 ' />
                  <div>
                    <h1 className='text-2xl font-bold'>PMS Portal</h1>
                    <p className='text-xs'>Polyclinic Management System</p>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            {filteredMenuSections.map((section) => (
              <div key={section.title}>
                {!isCollapsed && (
                  <div className="px-2 mb-3">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = currentView === item.id

                    return (
                      <div key={item.id} className="relative group">
                        <button
                          onClick={() => handleViewChange(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                            isCollapsed && "lg:justify-center lg:px-2"
                          )}
                          title={isCollapsed ? item.label : undefined}
                        >
                          <div className="relative">
                            <Icon className="h-5 w-5" />
                            {item.priority && item.badge && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
                            )}
                          </div>

                          {!isCollapsed && (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <div className="text-left flex-1 min-w-0">
                                <div className="font-medium truncate">{item.label}</div>
                                <div className="text-xs opacity-75 truncate">{item.description}</div>
                              </div>
                              {item.badge && (
                                <Badge
                                  variant={item.priority ? "destructive" : "secondary"}
                                  className="h-5 px-2 text-xs ml-2 flex-shrink-0"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          )}
                        </button>

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 invisible group-hover:visible z-50 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-slate-300 text-xs">{item.description}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile & Controls */}
        <div className="p-4 border-t border-slate-100">
          {/* User Profile */}
          <div className={cn(
            "flex items-center gap-3 mb-4 p-2 rounded-lg",
            isCollapsed && "lg:justify-center"
          )}>
            <div className="relative">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user?.role === 'admin' ? 'Admin PMS' : user?.role === 'polyclinic' ? 'Polyclinic User' : 'Public User'}
                </p>
                <p className="text-xs text-slate-600 truncate">
                  {user?.role === 'admin' ? 'Regional Centre' : user?.role === 'polyclinic' ? 'Polyclinic Centre' : 'Public View'}
                </p>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn("flex-1 border-slate-300", isCollapsed && "lg:w-auto")}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {!isCollapsed && <span className="ml-1 hidden sm:inline">Collapse</span>}
            </Button>

            {!isCollapsed && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-700 border-red-300 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}