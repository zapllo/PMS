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
  AlertCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Activity,
  User,
  Zap,
  Moon,
  Sun
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const menuSections = [
  {
    title: 'Operations',
    items: [
      { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null, priority: false, description: 'System Overview' },
      { id: 'polyclinics', label: 'Medical Facilities', icon: Building2, badge: null, priority: false, description: 'Facility Management' },
    ]
  },
  {
    title: 'Resources',
    items: [
      { id: 'manpower', label: 'Personnel', icon: Users, badge: '47', priority: true, description: 'Staff Management' },
      { id: 'equipment', label: 'Equipment', icon: Settings2, badge: '23', priority: true, description: 'Asset Management' },
      { id: 'vehicles', label: 'Fleet', icon: Truck, badge: null, priority: false, description: 'Vehicle Operations' },
    ]
  },
  {
    title: 'Administration',
    items: [
      { id: 'reports', label: 'Reports', icon: FileText, badge: '8', priority: true, description: 'Documentation' },
      { id: 'announcements', label: 'Announcements', icon: Bell, badge: null, priority: false, description: 'Official Communications' },
      { id: 'communications', label: 'Messages', icon: MessageSquare, badge: null, priority: false, description: 'Internal Communications' },
    ]
  },
  {
    title: 'System',
    items: [
      { id: 'tickets', label: 'Support', icon: HeadphonesIcon, badge: '12', priority: true, description: 'Technical Support' },
      { id: 'settings', label: 'Settings', icon: Settings, badge: null, priority: false, description: 'System Configuration' },
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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getTotalPriorityItems = () => {
    return menuSections
      .flatMap(section => section.items)
      .filter(item => item.badge)
      .reduce((total, item) => total + parseInt(item.badge || '0'), 0)
  }

  const handleViewChange = (view: string) => {
    onViewChange(view)
    setIsMobileOpen(false) // Close mobile menu when item is selected
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* Mobile Menu Button - Only show when sidebar is closed */}
      {!isMobileOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileOpen(true)}
            className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out shadow-xl lg:shadow-none",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-20" : "w-80 lg:w-72"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "lg:justify-center" : "justify-between"
          )}>
            <div className={cn("flex items-center gap-3", isCollapsed && "lg:justify-center")}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                {getTotalPriorityItems() > 0 && !isCollapsed && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">{getTotalPriorityItems()}</span>
                  </div>
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">PMS</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Polyclinic Management System</p>
                </div>
              )}
            </div>
            
            {/* Close button for mobile - Always visible on mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Indicator */}
          {!isCollapsed && (
            <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">System Active</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
          <div className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                {!isCollapsed && (
                  <div className="px-2 mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                            "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative",
                            isActive
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                            isCollapsed && "lg:justify-center lg:px-2"
                          )}
                          title={isCollapsed ? item.label : undefined}
                        >
                          <div className="relative">
                            <Icon className="h-5 w-5" />
                            {item.priority && item.badge && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
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
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 invisible group-hover:visible z-50 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-xs rounded whitespace-nowrap shadow-lg">
                            {item.label}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Priority Alert */}
          {!isCollapsed && getTotalPriorityItems() > 0 && (
            <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-2">Attention Required</p>
                  <div className="space-y-1 text-xs text-orange-700 dark:text-orange-300">
                    <div className="flex justify-between">
                      <span>Personnel Issues</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment Alerts</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Reports</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* User Profile & Controls */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        

          {/* User Profile */}
          <div className={cn(
            "flex items-center gap-3 mb-4 p-2 rounded-lg",
            isCollapsed && "lg:justify-center"
          )}>
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin Officer</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Regional Command</p>
              </div>
            )}
          </div>
          
          {/* Control Buttons */}
          <div className="flex gap-2">
            {/* Theme toggle for collapsed state */}
           
            
            <Button 
              variant="outline" 
              size="sm" 
              className={cn("flex-1", isCollapsed && "lg:w-auto")}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {!isCollapsed && <span className="ml-1 hidden sm:inline">Minimize</span>}
            </Button>
            
            {!isCollapsed && (
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Exit</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}