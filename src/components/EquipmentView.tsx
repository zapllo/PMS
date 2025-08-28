'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Download, Wrench, AlertTriangle, CheckCircle, Clock, Filter, Calendar, Settings } from 'lucide-react'

export default function EquipmentView() {
  const [statusFilter, setStatusFilter] = useState('all')
  
  const equipmentSummary = [
    { category: 'Diagnostic Equipment', total: 156, serviceable: 132, unserviceable: 18, underRepair: 6, rate: 85 },
    { category: 'Treatment Equipment', total: 98, serviceable: 89, unserviceable: 5, underRepair: 4, rate: 91 },
    { category: 'Laboratory Equipment', total: 74, serviceable: 68, unserviceable: 4, underRepair: 2, rate: 92 },
    { category: 'Sterilization Equipment', total: 45, serviceable: 41, unserviceable: 2, underRepair: 2, rate: 91 },
    { category: 'Support Equipment', total: 89, serviceable: 82, unserviceable: 4, underRepair: 3, rate: 92 },
  ]

  const equipmentDetails = [
    { 
      name: 'ECG Machine', 
      polyclinic: 'Polyclinic Kolkata', 
      code: 'PC-KOL-001',
      type: 'Diagnostic', 
      quantity: 2, 
      serviceable: 2, 
      status: 'Serviceable', 
      lastService: '2024-10-15',
      nextService: '2025-01-15',
      vendor: 'Philips Healthcare',
      warrantyStatus: 'Active',
      priority: 'normal'
    },
    { 
      name: 'Blood Pressure Monitor', 
      polyclinic: 'Polyclinic Mumbai Central', 
      code: 'PC-MUM-002',
      type: 'Diagnostic', 
      quantity: 5, 
      serviceable: 5, 
      status: 'Serviceable', 
      lastService: '2024-09-20',
      nextService: '2024-12-20',
      vendor: 'Omron Healthcare',
      warrantyStatus: 'Active',
      priority: 'normal'
    },
    { 
      name: 'Nebulizer', 
      polyclinic: 'Polyclinic Chennai North', 
      code: 'PC-CHN-004',
      type: 'Treatment', 
      quantity: 3, 
      serviceable: 1, 
      status: 'Under Repair', 
      lastService: '2024-11-01',
      nextService: 'Pending',
      vendor: 'Philips Respironics',
      warrantyStatus: 'Expired',
      priority: 'high'
    },
    { 
      name: 'Autoclave', 
      polyclinic: 'Polyclinic Bangalore East', 
      code: 'PC-BLR-005',
      type: 'Sterilization', 
      quantity: 1, 
      serviceable: 0, 
      status: 'Unserviceable', 
      lastService: '2024-08-15',
      nextService: 'Overdue',
      vendor: 'Tuttnauer',
      warrantyStatus: 'Expired',
      priority: 'high'
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Serviceable':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Serviceable
          </Badge>
        )
      case 'Under Repair':
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Under Repair
          </Badge>
        )
      case 'Unserviceable':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Unserviceable
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getWarrantyBadge = (warrantyStatus) => {
    return (
      <Badge className={warrantyStatus === 'Active' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'}>
        {warrantyStatus}
      </Badge>
    )
  }

  const filteredEquipment = statusFilter === 'all' 
    ? equipmentDetails 
    : equipmentDetails.filter(item => item.status.toLowerCase().replace(' ', '-') === statusFilter)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Equipment Management</h1>
          <p className="text-gray-600 mt-2">Monitor equipment status and maintenance across all polyclinics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search equipment..." 
              className="pl-10 w-full sm:w-64 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Equipment</SelectItem>
              <SelectItem value="serviceable">Serviceable</SelectItem>
              <SelectItem value="under-repair">Under Repair</SelectItem>
              <SelectItem value="unserviceable">Unserviceable</SelectItem>
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
              <CardTitle className="text-sm font-medium text-gray-600">Total Equipment</CardTitle>
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">462</div>
              <p className="text-sm text-gray-600">Across all polyclinics</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Serviceable</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600">412</div>
              <p className="text-sm text-gray-600">89% operational</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Under Repair</CardTitle>
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">17</div>
              <p className="text-sm text-gray-600">Being serviced</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Critical Issues</CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">33</div>
              <p className="text-sm text-gray-600">Need immediate attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category-wise Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Equipment Summary by Category</CardTitle>
          <CardDescription>
            Equipment status distribution across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">Category</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Total</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Serviceable</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Under Repair</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Unserviceable</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Operational Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentSummary.map((item, index) => (
                  <TableRow key={index} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-4">
                      <div className="font-medium text-gray-900">{item.category}</div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {item.total}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        {item.serviceable}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                        {item.underRepair}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        {item.unserviceable}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className={item.rate >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : item.rate >= 80 ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-red-50 text-red-700 border-red-200'}>
                        {item.rate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Details */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Equipment Details</CardTitle>
          <CardDescription>
            Individual equipment status and maintenance information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">Equipment</TableHead>
                  <TableHead className="font-semibold text-gray-900">Polyclinic</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Quantity</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Last Service</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Next Service</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Warranty</TableHead>
                  <TableHead className="text-center font-semibold text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item, index) => (
                  <TableRow key={index} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-4">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {item.name}
                          {item.priority === 'high' && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{item.type}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div>
                        <div className="font-medium text-gray-700">{item.polyclinic}</div>
                        <div className="text-sm text-gray-500">{item.code}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-semibold text-emerald-600">{item.serviceable}</span>
                        <span className="text-gray-400">/</span>
                        <span className="font-semibold text-gray-600">{item.quantity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span>{item.lastService}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4 text-sm">
                      <span className={item.nextService === 'Overdue' || item.nextService === 'Pending' ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {item.nextService}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      {getWarrantyBadge(item.warrantyStatus)}
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="flex justify-center gap-1">
                        <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                          <Wrench className="h-3 w-3" />
                        </Button>
                      </div>
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