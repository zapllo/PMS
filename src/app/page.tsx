'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Plus, ExternalLink, Filter, ArrowLeft } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import DashboardCards from '@/components/DashboardCards'
import PolyclinicDashboardCards from '@/components/PolyclinicDashboardCards'
import PolyclinicGrid from '@/components/PolyclinicGrid'
import AnnouncementsView from '@/components/AnnouncementsView'
import TicketsView from '@/components/TicketsView'
import ReportsView from '@/components/ReportsView'
import ManpowerView from '@/components/ManpowerView'
import EquipmentView from '@/components/EquipmentView'
import VehiclesView from '@/components/VehiclesView'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPolyclinicActivity, getPolyclinicEquipment, getPolyclinicPersonnel, getPolyclinicReports, getPolyclinicVehicles, mockPolyclinics } from '@/lib/mockData'
import CommunicationsView from '@/components/CommunicationsView'
import LoginPage from '@/components/LoginPage'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedPolyclinic, setSelectedPolyclinic] = useState(null)
  const { isAuthenticated, user } = useAuth()

  // Reset view when user logs in or role changes
  useEffect(() => {
    if (isAuthenticated && user?.role === 'public') {
      // Public users start at announcements (Orders)
      setCurrentView('announcements')
    } else if (isAuthenticated) {
      // Admin and Polyclinic users start at dashboard
      setCurrentView('dashboard')
    }
  }, [isAuthenticated, user?.role])

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        // Render different dashboards based on user role
        if (user?.role === 'polyclinic') {
          return (
            <div className="space-y-8">
              {/* Polyclinic Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Polyclinic Dashboard</h1>
                  <p className="text-slate-600 mt-2">ECHS Polyclinic Operations & Management</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="bg-white border-slate-300">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button
                    onClick={() => setCurrentView('reports')}
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Return
                  </Button>
                </div>
              </div>

              {/* Polyclinic Stats Cards */}
              <PolyclinicDashboardCards />

              {/* Quick Actions Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-slate-200">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
                    <CardDescription>Common tasks and operations</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col items-center gap-2 bg-white"
                        onClick={() => setCurrentView('manpower')}
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <span className="text-xl">👥</span>
                        </div>
                        <span className="text-sm font-medium">Personnel</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col items-center gap-2 bg-white"
                        onClick={() => setCurrentView('equipment')}
                      >
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <span className="text-xl">⚕️</span>
                        </div>
                        <span className="text-sm font-medium">Equipment</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col items-center gap-2 bg-white"
                        onClick={() => setCurrentView('vehicles')}
                      >
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <span className="text-xl">🚗</span>
                        </div>
                        <span className="text-sm font-medium">Fleet</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 flex flex-col items-center gap-2 bg-white"
                        onClick={() => setCurrentView('reports')}
                      >
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <span className="text-xl">📋</span>
                        </div>
                        <span className="text-sm font-medium">Returns</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-semibold text-slate-900">Recent Activities</CardTitle>
                    <CardDescription>Latest updates and changes</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">✓</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">Equipment maintenance completed</p>
                          <p className="text-xs text-slate-600">X-ray machine - 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">👤</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">New staff member joined</p>
                          <p className="text-xs text-slate-600">Nursing Assistant - Today</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">📄</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">Monthly return submitted</p>
                          <p className="text-xs text-slate-600">October report - Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        }
        
        // Admin Dashboard (default)
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Command Dashboard</h1>
                <p className="text-slate-600 mt-2">ECHS Regional Centre Administrative Portal</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="bg-white border-slate-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button
                  onClick={() => setCurrentView('announcements')}
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <DashboardCards />

            {/* Polyclinics Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">ECHS Polyclinics</h2>
                  <p className="text-slate-600 mt-1">Monitor all polyclinic operations under Regional Centre</p>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search polyclinics..."
                      className="pl-10 w-full sm:w-64 bg-white border-slate-300"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="bg-white border-slate-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <PolyclinicGrid
                polyclinics={mockPolyclinics}
                onSelect={(polyclinic) => {
                  setSelectedPolyclinic(polyclinic)
                  setCurrentView('polyclinic-detail')
                }}
              />
            </div>
          </div>
        )
      case 'polyclinics':
        return (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">ECHS Polyclinics Directory</h1>
                <p className="text-slate-600 mt-2">Complete listing of all ECHS polyclinics under Regional Centre</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search polyclinics..."
                    className="pl-10 w-full sm:w-80 bg-white border-slate-300"
                  />
                </div>
                <Button variant="outline" className="bg-white border-slate-300">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter & Sort
                </Button>
                <Button variant="outline" className="bg-white border-slate-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
              </div>
            </div>
            <PolyclinicGrid
              polyclinics={mockPolyclinics}
              onSelect={(polyclinic) => {
                setSelectedPolyclinic(polyclinic)
                setCurrentView('polyclinic-detail')
              }}
            />
          </div>
        )
      case 'polyclinic-detail':
        if (selectedPolyclinic) {
          return <PolyclinicDetail polyclinic={selectedPolyclinic} onBack={() => setCurrentView('polyclinics')} />
        }
        return null
      case 'announcements':
        return <AnnouncementsView />
      case 'tickets':
        return <TicketsView />
      case 'reports':
        return <ReportsView />
      case 'manpower':
        return <ManpowerView />
      case 'equipment':
        return <EquipmentView />
      case 'vehicles':
        return <VehiclesView />
      case 'communications':
        return <CommunicationsView />
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-slate-300 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">Module Under Development</h2>
              <p className="text-slate-600 max-w-md mx-auto">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} module is being developed and will be available soon.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 mx-auto pt-20 lg:pt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

// Enhanced Polyclinic Detail Component with Military styling
function PolyclinicDetail({ polyclinic, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'personnel', label: 'Personnel' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'vehicles', label: 'Fleet' },
    { id: 'reports', label: 'Returns' },
    { id: 'activity', label: 'Activity Log' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-fit bg-white border-slate-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Directory
        </Button>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-slate-900">{polyclinic.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-900 font-mono font-semibold">{polyclinic.code}</span>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span className="text-slate-600 font-medium">{polyclinic.city}</span>
                <Badge
                  variant={polyclinic.status === 'Active' ? 'default' : 'secondary'}
                  className={polyclinic.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : ''}
                >
                  {polyclinic.status}
                </Badge>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-medium">OIC:</span> {polyclinic.inCharge}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white border-slate-300">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card className="border border-slate-200">
        <CardContent className="p-2">
          <nav className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && <OverviewTab polyclinic={polyclinic} />}
        {activeTab === 'personnel' && <PersonnelTab polyclinic={polyclinic} />}
        {activeTab === 'equipment' && <EquipmentTab polyclinic={polyclinic} />}
        {activeTab === 'vehicles' && <VehiclesTab polyclinic={polyclinic} />}
        {activeTab === 'reports' && <ReportsTab polyclinic={polyclinic} />}
        {activeTab === 'activity' && <ActivityTab polyclinic={polyclinic} />}
      </div>
    </div>
  )
}

// Clean Overview Tab with military data structure
function OverviewTab({ polyclinic }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Contact Information */}
      <Card className="border border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Address</div>
              <div className="text-sm text-slate-900">{polyclinic.address}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Phone</div>
                <div className="text-sm text-slate-900">{polyclinic.phone}</div>
              </div>

              {polyclinic.military && (
                <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
                  <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Military</div>
                  <div className="text-sm text-slate-900 font-mono">{polyclinic.military}</div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Mobile</div>
              <div className="text-sm text-slate-900">{polyclinic.mobile}</div>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
              <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Email</div>
              <div className="text-sm text-slate-900">{polyclinic.email}</div>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-800 text-xs font-semibold uppercase tracking-wide">Officer In Charge</div>
              <div className="text-sm text-blue-900 font-semibold">{polyclinic.inCharge}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card className="border border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">Operational Status</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-900 mb-1">{polyclinic.stats.totalStaff}</div>
              <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Personnel</div>
            </div>

            <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-900 mb-1">{polyclinic.stats.serviceableEquipment}</div>
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Equipment</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-900 mb-1">{polyclinic.stats.vehicles}</div>
              <div className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Fleet</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-900 mb-1">{polyclinic.stats.reportsSubmitted}</div>
              <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Returns</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Last Updated</span>
              <span className="text-sm text-slate-600">{polyclinic.lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Updated Personnel Tab with real data
function PersonnelTab({ polyclinic }) {
  const personnelData = getPolyclinicPersonnel(polyclinic.id);

  const getStatusColor = (status) => {
    return status === 'full'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
      : 'bg-red-100 text-red-800 border-red-300';
  }

  const getTotalStats = () => {
    return personnelData.reduce((acc, item) => ({
      sanctioned: acc.sanctioned + item.sanctioned,
      posted: acc.posted + item.posted,
      vacancy: acc.vacancy + item.vacancy
    }), { sanctioned: 0, posted: 0, vacancy: 0 });
  }

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="border border-slate-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{stats.sanctioned}</div>
              <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Sanctioned</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-900">{stats.posted}</div>
              <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Posted</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-900">{stats.vacancy}</div>
              <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Vacant</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personnel Details Table */}
      <Card className="border border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">Personnel Details</CardTitle>
          <CardDescription className="text-slate-600">Current establishment and deployment status</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 font-semibold text-slate-900">Rank/Category</th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900">Name/Position</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Sanctioned</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Posted</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Vacant</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {personnelData.map((person, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="py-3 px-2">
                      <span className="font-mono font-semibold text-slate-900">{person.rank}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div>
                        <div className="font-medium text-slate-900">{person.name}</div>
                        <div className="text-sm text-slate-600">{person.position}</div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {person.sanctioned}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">
                        {person.posted}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${person.vacancy > 0 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {person.vacancy}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <Badge className={getStatusColor(person.status)}>
                        {person.status === 'full' ? 'Adequate' : 'Understaffed'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// Updated Equipment Tab with real data
function EquipmentTab({ polyclinic }) {
  const equipmentData = getPolyclinicEquipment(polyclinic.id);

  const getStatusColor = (status) => {
    const colors = {
      'Serviceable': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Under Repair': 'bg-orange-100 text-orange-800 border-orange-300',
      'Unserviceable': 'bg-red-100 text-red-800 border-red-300'
    }
    return colors[status] || 'bg-slate-100 text-slate-800 border-slate-300';
  }

  const getWarrantyColor = (warranty) => {
    return warranty === 'Active'
      ? 'bg-blue-100 text-blue-800 border-blue-300'
      : 'bg-slate-100 text-slate-700 border-slate-300';
  }

  const getStats = () => {
    return equipmentData.reduce((acc, item) => ({
      total: acc.total + item.quantity,
      serviceable: acc.serviceable + item.serviceable,
      underRepair: acc.underRepair + (item.status === 'Under Repair' ? item.quantity - item.serviceable : 0),
      unserviceable: acc.unserviceable + (item.status === 'Unserviceable' ? item.quantity - item.serviceable : 0)
    }), { total: 0, serviceable: 0, underRepair: 0, unserviceable: 0 });
  }

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border border-slate-200">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-900">{stats.serviceable}</div>
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Serviceable</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-900">{stats.underRepair}</div>
              <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Under Repair</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-900">{stats.unserviceable}</div>
              <div className="text-xs font-semibold text-red-700 uppercase tracking-wide">Unserviceable</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Details Table */}
      <Card className="border border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-900">Equipment Inventory</CardTitle>
          <CardDescription className="text-slate-600">Medical equipment status and maintenance tracking</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 font-semibold text-slate-900">Equipment</th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900">Model</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Qty</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Serviceable</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Status</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Last Service</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-900">Warranty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {equipmentData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="py-3 px-2">
                      <div>
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-600">{item.type}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-slate-700 font-mono">{item.model}</td>
                    <td className="text-center py-3 px-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 text-slate-800 rounded-full text-sm font-bold">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold text-emerald-700">{item.serviceable}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-600">{item.quantity}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="text-center py-3 px-2 text-sm text-slate-600">{item.lastService}</td>
                    <td className="text-center py-3 px-2">
                      <Badge className={getWarrantyColor(item.warranty)}>
                        {item.warranty}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Updated Vehicles Tab with real data
function VehiclesTab({ polyclinic }) {
  const vehicleData = getPolyclinicVehicles(polyclinic.id);

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Under Maintenance': 'bg-orange-100 text-orange-800 border-orange-300',
      'Out of Service': 'bg-red-100 text-red-800 border-red-300'
    }
    return colors[status] || 'bg-slate-100 text-slate-800 border-slate-300';
  }

  const getUtilizationColor = (utilization) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 border-red-300',
      'Medium': 'bg-orange-100 text-orange-800 border-orange-300',
      'Low': 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
    return colors[utilization] || 'bg-slate-100 text-slate-800 border-slate-300';
  }

  return (
    <Card className="border border-slate-200">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">Fleet Management</CardTitle>
        <CardDescription className="text-slate-600">Vehicle fleet status and maintenance tracking</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 font-semibold text-slate-900">Vehicle ID</th>
                <th className="text-left py-3 px-2 font-semibold text-slate-900">Make & Model</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Year</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Status</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Odometer (KM)</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Utilization</th>
                <th className="text-left py-3 px-2 font-semibold text-slate-900">Driver</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Next Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicleData.map((vehicle, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="py-3 px-2">
                    <div className="font-mono font-semibold text-slate-900">{vehicle.id}</div>
                    <div className="text-sm text-slate-600">{vehicle.type}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-medium text-slate-900">{vehicle.make}</div>
                  </td>
                  <td className="text-center py-3 px-2 font-mono text-slate-700">{vehicle.year}</td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2 font-mono text-sm">{vehicle.odometer.toLocaleString()}</td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getUtilizationColor(vehicle.utilization)}>
                      {vehicle.utilization}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <span className="font-mono text-slate-900">{vehicle.driver}</span>
                  </td>
                  <td className="text-center py-3 px-2 text-sm">
                    <span className={vehicle.nextService === 'In Progress' ? 'text-orange-700 font-medium' : 'text-slate-600'}>
                      {vehicle.nextService}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Updated Reports Tab with real data
function ReportsTab({ polyclinic }) {
  const reportsData = getPolyclinicReports(polyclinic.id);

  const getStatusColor = (status) => {
    const colors = {
      'Accepted': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Submitted': 'bg-blue-100 text-blue-800 border-blue-300',
      'Returned': 'bg-red-100 text-red-800 border-red-300',
      'Pending': 'bg-orange-100 text-orange-800 border-orange-300'
    }
    return colors[status] || 'bg-slate-100 text-slate-800 border-slate-300';
  }

  return (
    <Card className="border border-slate-200">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">Monthly Returns & Reports</CardTitle>
        <CardDescription className="text-slate-600">Submission status and tracking of mandatory returns</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 font-semibold text-slate-900">Report Type</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Period</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Status</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Due Date</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-900">Submitted</th>
                <th className="text-left py-3 px-2 font-semibold text-slate-900">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportsData.map((report, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="py-3 px-2 font-medium text-slate-900">{report.type}</td>
                  <td className="text-center py-3 px-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm font-mono">
                      {report.period}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2 text-sm font-mono text-slate-600">{report.dueDate}</td>
                  <td className="text-center py-3 px-2 text-sm">
                    {report.submittedDate ? (
                      <span className="font-mono text-slate-600">{report.submittedDate}</span>
                    ) : (
                      <span className="text-red-700 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-sm text-slate-600">{report.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Updated Activity Tab with real data
function ActivityTab({ polyclinic }) {
  const activityData = getPolyclinicActivity(polyclinic.id);

  const getActivityIcon = (type) => {
    const icons = {
      personnel: '👥',
      equipment: '⚕️',
      administrative: '📋',
      vehicle: '🚗',
      medical: '🏥'
    }
    return icons[type] || '📄';
  }

  const getActivityColor = (type) => {
    const colors = {
      personnel: 'bg-blue-50 border-blue-200',
      equipment: 'bg-emerald-50 border-emerald-200',
      administrative: 'bg-purple-50 border-purple-200',
      vehicle: 'bg-orange-50 border-orange-200',
      medical: 'bg-red-50 border-red-200'
    }
    return colors[type] || 'bg-slate-50 border-slate-200';
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-700 bg-red-100',
      medium: 'text-orange-700 bg-orange-100',
      normal: 'text-slate-700 bg-slate-100',
      low: 'text-slate-600 bg-slate-50'
    }
    return colors[priority] || colors.normal;
  }

  return (
    <Card className="border border-slate-200">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900">Activity Log</CardTitle>
        <CardDescription className="text-slate-600">Recent activities and operational events</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {activityData.map((activity, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 border rounded-lg transition-all hover:shadow-sm ${getActivityColor(activity.type)}`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{activity.user}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getPriorityColor(activity.priority)}`}>
                      {activity.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {activity.date} • {activity.time} hrs
                  </div>
                </div>
                <div className="font-medium text-slate-900 mb-1">{activity.action}</div>
                <div className="text-sm text-slate-700">{activity.details}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="bg-white border-slate-300">
            Load More Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}