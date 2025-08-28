'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Download, Users, AlertTriangle, TrendingUp, TrendingDown, UserPlus, UserCheck, UserX } from 'lucide-react'

export default function ManpowerView() {
  const [selectedMonth, setSelectedMonth] = useState('2024-11')
  
  const manpowerSummary = [
    { category: 'Medical Officers', sanctioned: 95, posted: 76, vacancies: 19, percentage: 80, trend: 'down' },
    { category: 'Staff Nurses', sanctioned: 190, posted: 156, vacancies: 34, percentage: 82, trend: 'up' },
    { category: 'Pharmacists', sanctioned: 38, posted: 35, vacancies: 3, percentage: 92, trend: 'stable' },
    { category: 'Lab Technicians', sanctioned: 57, posted: 48, vacancies: 9, percentage: 84, trend: 'down' },
    { category: 'Administrative Staff', sanctioned: 76, posted: 71, vacancies: 5, percentage: 93, trend: 'up' },
  ]

  const polyclinicManpower = [
    { 
      name: 'Medical Center Kolkata', 
      code: 'MC-KOL-001', 
      totalSanctioned: 24, 
      totalPosted: 20, 
      vacancies: 4, 
      percentage: 83,
      trend: 'up',
      criticalVacancies: ['Medical Officer', 'Staff Nurse'],
      lastUpdated: '2024-12-01'
    },
    { 
      name: 'Medical Center Mumbai', 
      code: 'MC-MUM-002', 
      totalSanctioned: 32, 
      totalPosted: 28, 
      vacancies: 4, 
      percentage: 88,
      trend: 'stable',
      criticalVacancies: ['Lab Technician'],
      lastUpdated: '2024-11-30'
    },
    { 
      name: 'Medical Center Delhi', 
      code: 'MC-DEL-003', 
      totalSanctioned: 28, 
      totalPosted: 25, 
      vacancies: 3, 
      percentage: 89,
      trend: 'up',
      criticalVacancies: [],
      lastUpdated: '2024-12-01'
    },
  ]

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-emerald-600'
    if (percentage >= 80) return 'text-amber-600'
    return 'text-red-600'
  }

  const getStatusBadge = (percentage) => {
    if (percentage >= 90) return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (percentage >= 80) return 'bg-amber-100 text-amber-700 border-amber-200'
    return 'bg-red-100 text-red-700 border-red-200'
  }

  const getStatusText = (percentage) => {
    if (percentage >= 90) return 'Optimal'
    if (percentage >= 80) return 'Adequate'
    return 'Critical'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-emerald-500" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-400"></div>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personnel Management</h1>
          <p className="text-gray-600 mt-2">Staff allocation and vacancy tracking across medical facilities</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search positions..." 
              className="pl-10 w-full sm:w-64 bg-white"
            />
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full sm:w-48 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-10">October 2024</SelectItem>
              <SelectItem value="2024-09">September 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">456</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total Sanctioned</p>
                <p className="text-xs text-gray-600">All positions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <UserCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">84.6%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-emerald-600">386</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Personnel Posted</p>
                <p className="text-xs text-gray-600">Currently assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-50 rounded-lg">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">+5</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-red-600">70</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Open Positions</p>
                <p className="text-xs text-gray-600">15.4% vacancy rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-amber-600">8</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Critical Shortages</p>
                <p className="text-xs text-gray-600">Facilities understaffed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Personnel by Category</CardTitle>
          <CardDescription>
            Staff allocation across roles for {selectedMonth}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-gray-900">Category</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Sanctioned</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Posted</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Vacant</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Fill Rate</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Trend</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {manpowerSummary.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{item.category}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {item.sanctioned}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        {item.posted}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                        item.vacancies > 10 ? 'bg-red-100 text-red-700' : 
                        item.vacancies > 5 ? 'bg-amber-100 text-amber-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.vacancies}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-semibold ${getPercentageColor(item.percentage)}`}>
                        {item.percentage}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getTrendIcon(item.trend)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusBadge(item.percentage)}>
                        {getStatusText(item.percentage)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Facility Details */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Facility Personnel Status</CardTitle>
          <CardDescription>
            Individual facility staffing levels and critical gaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {polyclinicManpower.map((facility, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{facility.code}</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>Updated {facility.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${getPercentageColor(facility.percentage)}`}>
                      {facility.percentage}%
                    </div>
                    <div className="flex items-center justify-end gap-1 text-sm text-gray-600">
                      {getTrendIcon(facility.trend)}
                      <span>Fill Rate</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">{facility.totalSanctioned}</div>
                    <div className="text-xs text-blue-600">Sanctioned</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-lg font-bold text-emerald-700">{facility.totalPosted}</div>
                    <div className="text-xs text-emerald-600">Posted</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-700">{facility.vacancies}</div>
                    <div className="text-xs text-red-600">Vacant</div>
                  </div>
                </div>

                {facility.criticalVacancies.length > 0 ? (
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-amber-900">Critical vacancies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {facility.criticalVacancies.map((vacancy, idx) => (
                          <Badge key={idx} variant="destructive" className="text-xs">
                            {vacancy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-sm font-medium text-emerald-900">All critical positions filled</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}