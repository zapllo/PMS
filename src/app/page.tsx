'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Plus, ExternalLink, Filter, ArrowLeft } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import DashboardCards from '@/components/DashboardCards'
import PolyclinicGrid from '@/components/PolyclinicGrid'
import AnnouncementsView from '@/components/AnnouncementsView'
import TicketsView from '@/components/TicketsView'
import ReportsView from '@/components/ReportsView'
import PublicBenefitsPage from '@/components/PublicBenefitsPage'
import ManpowerView from '@/components/ManpowerView'
import EquipmentView from '@/components/EquipmentView'
import VehiclesView from '@/components/VehiclesView'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockPolyclinics } from '@/lib/mockData'

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedPolyclinic, setSelectedPolyclinic] = useState(null)

  // Special handling for public page
  if (currentView === 'public') {
    return <PublicBenefitsPage />
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold ">Dashboard</h1>
                <p className="dark:text-white -600 mt-2">Regional Centre Administrative Portal</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="bg-white shadow-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button
                  onClick={() => setCurrentView('announcements')}
                  className="bg-primary   hover:bg-blue-700 dark:text-black"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('/public', '_blank')}
                  className="bg-white shadow-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Public Portal
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <DashboardCards />

            {/* Polyclinics Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold dark:text-white">Polyclinics Overview</h2>
                  <p className="dark:text-white mt-1">Monitor all polyclinic operations</p>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search polyclinics..."
                      className="pl-10 w-full sm:w-64 bg-white"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="bg-white">
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
                <h1 className="text-3xl lg:text-4xl font-bold dark:text-white">Polyclinic Directory</h1>
                <p className="dark:text-white mt-2">Manage all polyclinic operations and details</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search polyclinics..."
                    className="pl-10 w-full sm:w-80 bg-white"
                  />
                </div>
                <Button variant="outline" className="bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter & Sort
                </Button>
                <Button variant="outline" className="bg-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
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
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} module is under development and will be available soon.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        {/* Mobile padding adjustment */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pt-16 lg:pt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

// Enhanced Polyclinic Detail Component
function PolyclinicDetail({ polyclinic, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'manpower', label: 'Personnel', icon: 'Users' },
    { id: 'equipment', label: 'Equipment', icon: 'Settings2' },
    { id: 'vehicles', label: 'Fleet', icon: 'Truck' },
    { id: 'reports', label: 'Reports', icon: 'FileText' },
    { id: 'activity', label: 'Activity Log', icon: 'Activity' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-fit bg-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Directory
        </Button>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold dark:text-white">{polyclinic.name}</h1>
              <div className="flex items-center gap-3">
                <span className="dark:text-white font-medium">{polyclinic.code}</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600">{polyclinic.city}</span>
                <Badge
                  variant={polyclinic.status === 'Active' ? 'default' : 'secondary'}
                  className={polyclinic.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                >
                  {polyclinic.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" className="bg-primary  hover:bg-blue-700">
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card className="p-1">
        <nav className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-primary  text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </Card>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && <OverviewTab polyclinic={polyclinic} />}
        {activeTab === 'manpower' && <ManpowerTab polyclinic={polyclinic} />}
        {activeTab === 'equipment' && <EquipmentTab polyclinic={polyclinic} />}
        {activeTab === 'vehicles' && <VehiclesTab polyclinic={polyclinic} />}
        {activeTab === 'reports' && <ReportsTab polyclinic={polyclinic} />}
        {activeTab === 'activity' && <ActivityTab polyclinic={polyclinic} />}
      </div>
    </div>
  )
}

// Clean Overview Tab
function OverviewTab({ polyclinic }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm font-medium min-w-20">Address</div>
              <div className="text-sm text-gray-900">{polyclinic.address}</div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm font-medium min-w-20">Phone</div>
              <div className="text-sm text-gray-900">{polyclinic.phone}</div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm font-medium min-w-20">Email</div>
              <div className="text-sm text-gray-900">{polyclinic.email}</div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm font-medium min-w-20">In-Charge</div>
              <div className="text-sm text-gray-900">{polyclinic.inCharge}</div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm font-medium min-w-20">Hours</div>
              <div className="text-sm text-gray-900">{polyclinic.timings}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 mb-1">{polyclinic.stats.totalStaff}</div>
              <div className="text-sm font-medium text-blue-600">Total Personnel</div>
            </div>

            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-700 mb-1">{polyclinic.stats.serviceableEquipment}</div>
              <div className="text-sm font-medium text-emerald-600">Equipment Active</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 mb-1">{polyclinic.stats.vehicles}</div>
              <div className="text-sm font-medium text-purple-600">Fleet Vehicles</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700 mb-1">{polyclinic.stats.reportsSubmitted}</div>
              <div className="text-sm font-medium text-orange-600">Reports This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ManpowerTab({ polyclinic }) {
  const manpowerData = [
    { role: 'Medical Officer', sanctioned: 5, posted: 4, vacancies: 1, status: 'understaffed' },
    { role: 'Staff Nurse', sanctioned: 10, posted: 8, vacancies: 2, status: 'understaffed' },
    { role: 'Pharmacist', sanctioned: 2, posted: 2, vacancies: 0, status: 'full' },
    { role: 'Lab Technician', sanctioned: 3, posted: 2, vacancies: 1, status: 'understaffed' },
    { role: 'Administrative Staff', sanctioned: 4, posted: 4, vacancies: 0, status: 'full' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Personnel Overview</CardTitle>
        <CardDescription>Current staffing status as of November 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-900">Position</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Sanctioned</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Posted</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Vacant</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {manpowerData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">{item.role}</td>
                  <td className="text-center py-3 px-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {item.sanctioned}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      {item.posted}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${item.vacancies > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {item.vacancies}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge
                      variant={item.status === 'full' ? 'default' : 'destructive'}
                      className={item.status === 'full' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                    >
                      {item.status === 'full' ? 'Adequate' : 'Understaffed'}
                    </Badge>
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

function EquipmentTab({ polyclinic }) {
  const equipmentData = [
    { name: 'ECG Machine', type: 'Diagnostic', quantity: 2, status: 'Serviceable', lastService: '2024-10-15' },
    { name: 'Blood Pressure Monitor', type: 'Diagnostic', quantity: 5, status: 'Serviceable', lastService: '2024-09-20' },
    { name: 'Glucometer', type: 'Diagnostic', quantity: 3, status: 'Under Repair', lastService: '2024-11-01' },
    { name: 'Nebulizer', type: 'Treatment', quantity: 2, status: 'Unserviceable', lastService: '2024-08-15' },
    { name: 'Autoclave', type: 'Sterilization', quantity: 1, status: 'Serviceable', lastService: '2024-10-30' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Serviceable': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Under Repair': 'bg-orange-100 text-orange-700 border-orange-200',
      'Unserviceable': 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Equipment Inventory</CardTitle>
        <CardDescription>Equipment status and maintenance tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-900">Equipment</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900">Type</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Quantity</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Last Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipmentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">{item.name}</td>
                  <td className="py-3 px-2 text-gray-600">{item.type}</td>
                  <td className="text-center py-3 px-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2 text-sm text-gray-600">{item.lastService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function VehiclesTab({ polyclinic }) {
  const vehicleData = [
    { id: 'AMB-001', type: 'Ambulance', status: 'Available', km: 45620, lastService: '2024-10-15', utilization: 'High' },
    { id: 'AMB-002', type: 'Ambulance', status: 'Under Maintenance', km: 38900, lastService: '2024-09-20', utilization: 'Medium' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Under Maintenance': 'bg-orange-100 text-orange-700 border-orange-200',
      'Out of Service': 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getUtilizationColor = (utilization) => {
    const colors = {
      'High': 'bg-red-100 text-red-700 border-red-200',
      'Medium': 'bg-orange-100 text-orange-700 border-orange-200',
      'Low': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    }
    return colors[utilization] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Fleet Management</CardTitle>
        <CardDescription>Vehicle fleet tracking and maintenance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-900">Vehicle ID</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-900">Type</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Odometer (KM)</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Last Service</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vehicleData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">{item.id}</td>
                  <td className="py-3 px-2 text-gray-600">{item.type}</td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2 font-mono text-sm">{item.km.toLocaleString()}</td>
                  <td className="text-center py-3 px-2 text-sm text-gray-600">{item.lastService}</td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getUtilizationColor(item.utilization)}>
                      {item.utilization}
                    </Badge>
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

function ReportsTab({ polyclinic }) {
  const reportsData = [
    { type: 'Monthly Personnel Return', month: 'Nov 2024', status: 'Submitted', dueDate: '2024-12-05', submittedDate: '2024-12-01' },
    { type: 'Equipment Status Report', month: 'Nov 2024', status: 'Pending', dueDate: '2024-12-05', submittedDate: null },
    { type: 'Vehicle Utilization Report', month: 'Oct 2024', status: 'Accepted', dueDate: '2024-11-05', submittedDate: '2024-11-03' },
    { type: 'Claims Summary', month: 'Oct 2024', status: 'Returned', dueDate: '2024-11-10', submittedDate: '2024-11-08' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Accepted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Submitted': 'bg-blue-100 text-blue-700 border-blue-200',
      'Returned': 'bg-red-100 text-red-700 border-red-200',
      'Pending': 'bg-orange-100 text-orange-700 border-orange-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Reports & Documentation</CardTitle>
        <CardDescription>Monthly submission status and tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-900">Report Type</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Period</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Due Date</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Submitted</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">{item.type}</td>
                  <td className="text-center py-3 px-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                      {item.month}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2 text-sm text-gray-600">{item.dueDate}</td>
                  <td className="text-center py-3 px-2 text-sm">
                    {item.submittedDate ? (
                      <span className="text-gray-600">{item.submittedDate}</span>
                    ) : (
                      <span className="text-red-600 font-medium">Not submitted</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-2">
                    <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50">
                      View Details
                    </Button>
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

function ActivityTab({ polyclinic }) {
  const activityData = [
    {
      date: '2024-12-01',
      time: '14:30',
      user: 'Dr. Priya Sharma',
      action: 'Personnel Update',
      details: 'Added new staff nurse to roster',
      type: 'update'
    },
    {
      date: '2024-11-28',
      time: '09:15',
      user: 'Raj Kumar',
      action: 'Equipment Maintenance',
      details: 'ECG machine serviced and calibrated',
      type: 'maintenance'
    },
    {
      date: '2024-11-25',
      time: '16:45',
      user: 'Dr. Priya Sharma',
      action: 'Report Submission',
      details: 'Monthly personnel return submitted',
      type: 'report'
    },
    {
      date: '2024-11-20',
      time: '10:00',
      user: 'System',
      action: 'Automated Alert',
      details: 'Equipment maintenance due date reminder sent',
      type: 'system'
    },
    {
      date: '2024-11-18',
      time: '13:20',
      user: 'Admin Officer',
      action: 'Status Update',
      details: 'Updated facility operational status',
      type: 'update'
    },
    {
      date: '2024-11-15',
      time: '11:30',
      user: 'Fleet Manager',
      action: 'Vehicle Service',
      details: 'Ambulance AMB-001 scheduled for maintenance',
      type: 'maintenance'
    }
  ]

  const getActivityIcon = (type) => {
    const icons = {
      update: '📝',
      maintenance: '🔧',
      report: '📊',
      system: '🤖'
    }
    return icons[type] || '📝'
  }

  const getActivityColor = (type) => {
    const colors = {
      update: 'bg-blue-50 border-blue-200',
      maintenance: 'bg-orange-50 border-orange-200',
      report: 'bg-emerald-50 border-emerald-200',
      system: 'bg-purple-50 border-purple-200'
    }
    return colors[type] || 'bg-gray-50 border-gray-200'
  }

  const getTypeColor = (type) => {
    const colors = {
      update: 'text-blue-700',
      maintenance: 'text-orange-700',
      report: 'text-emerald-700',
      system: 'text-purple-700'
    }
    return colors[type] || 'text-gray-700'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Activity Log</CardTitle>
        <CardDescription>Recent facility activities and system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityData.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 border rounded-lg transition-all hover:shadow-sm ${getActivityColor(item.type)}`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                <span className="text-lg">{getActivityIcon(item.type)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.user}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-white border ${getTypeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.date} at {item.time}
                  </div>
                </div>
                <div className="font-medium text-gray-900 mb-1">{item.action}</div>
                <div className="text-sm text-gray-600">{item.details}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="bg-white">
            Load More Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}