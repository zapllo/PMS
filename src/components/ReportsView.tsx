'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Download, Calendar, FileText, AlertTriangle, CheckCircle, Clock, Filter, TrendingUp, TrendingDown } from 'lucide-react'

export default function ReportsView() {
  const [selectedMonth, setSelectedMonth] = useState('2024-11')
  
  const reportsData = [
    {
      polyclinic: 'PC-KOL-001',
      name: 'Polyclinic Kolkata',
      manpower: { status: 'Submitted', date: '2024-11-28', daysEarly: 2 },
      equipment: { status: 'Submitted', date: '2024-11-29', daysEarly: 1 },
      vehicles: { status: 'Pending', date: null, daysOverdue: 3 },
      claims: { status: 'Submitted', date: '2024-11-30', daysEarly: 0 },
      overall: 'Partial'
    },
    {
      polyclinic: 'PC-MUM-002',
      name: 'Polyclinic Mumbai Central',
      manpower: { status: 'Submitted', date: '2024-11-25', daysEarly: 5 },
      equipment: { status: 'Submitted', date: '2024-11-26', daysEarly: 4 },
      vehicles: { status: 'Submitted', date: '2024-11-27', daysEarly: 3 },
      claims: { status: 'Returned', date: '2024-11-20', revision: 'needed' },
      overall: 'Needs Attention'
    },
    {
      polyclinic: 'PC-DEL-003',
      name: 'Polyclinic Delhi South',
      manpower: { status: 'Submitted', date: '2024-11-30', daysEarly: 0 },
      equipment: { status: 'Submitted', date: '2024-11-30', daysEarly: 0 },
      vehicles: { status: 'Submitted', date: '2024-11-29', daysEarly: 1 },
      claims: { status: 'Submitted', date: '2024-11-28', daysEarly: 2 },
      overall: 'Complete'
    },
  ]

  const getStatusBadge = (status, additionalInfo = null) => {
    switch (status) {
      case 'Submitted':
        return (
          <div className="flex items-center gap-1">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Submitted
            </Badge>
            {additionalInfo?.daysEarly > 0 && (
              <span className="text-xs text-emerald-600">({additionalInfo.daysEarly}d early)</span>
            )}
          </div>
        )
      case 'Pending':
        return (
          <div className="flex items-center gap-1">
            <Badge className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Pending
            </Badge>
            {additionalInfo?.daysOverdue > 0 && (
              <span className="text-xs text-red-600">({additionalInfo.daysOverdue}d overdue)</span>
            )}
          </div>
        )
      case 'Returned':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Returned
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getOverallStatusColor = (status) => {
    switch (status) {
      case 'Complete':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Partial':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'Needs Attention':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Reports & Returns</h1>
          <p className="text-gray-600 mt-2">Monthly submission tracking and compliance monitoring</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-10">October 2024</SelectItem>
              <SelectItem value="2024-09">September 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Submissions</CardTitle>
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">67</div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Out of 76 expected</p>
                <div className="flex items-center gap-1 text-orange-600">
                  <TrendingDown className="h-3 w-3" />
                  <span className="text-xs font-medium">88%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">On Time</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600">52</div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">77% compliance rate</p>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
              <Clock className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">9</div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Require attention</p>
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Returned</CardTitle>
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">6</div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Need corrections</p>
                <div className="flex items-center gap-1 text-orange-600">
                  <TrendingDown className="h-3 w-3" />
                  <span className="text-xs font-medium">-1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Submission Status by Polyclinic</CardTitle>
              <CardDescription className="mt-1">
                Track monthly report submissions across all polyclinics for {selectedMonth}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">Polyclinic</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Manpower</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Equipment</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Vehicles</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Claims</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Overall Status</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportsData.map((row) => (
                  <TableRow key={row.polyclinic} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-4">
                      <div>
                        <div className="font-medium text-gray-900">{row.name}</div>
                        <div className="text-sm text-gray-500">{row.polyclinic}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="space-y-1">
                        {getStatusBadge(row.manpower.status, row.manpower)}
                        {row.manpower.date && (
                          <div className="text-xs text-gray-500">{row.manpower.date}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="space-y-1">
                        {getStatusBadge(row.equipment.status, row.equipment)}
                        {row.equipment.date && (
                          <div className="text-xs text-gray-500">{row.equipment.date}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="space-y-1">
                        {getStatusBadge(row.vehicles.status, row.vehicles)}
                        {row.vehicles.date && (
                          <div className="text-xs text-gray-500">{row.vehicles.date}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="space-y-1">
                        {getStatusBadge(row.claims.status, row.claims)}
                        {row.claims.date && (
                          <div className="text-xs text-gray-500">{row.claims.date}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className={getOverallStatusColor(row.overall)}>
                        {row.overall}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}