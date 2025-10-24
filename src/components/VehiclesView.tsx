'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Download, Truck, Car, AlertTriangle, CheckCircle, Calendar, Fuel } from 'lucide-react'

export default function VehiclesView() {
  const [selectedMonth, setSelectedMonth] = useState('2024-11')
  
  const vehicleFleet = [
    { 
      vehicleId: 'AMB-KOL-001', 
      type: 'Ambulance',
      polyclinic: 'Polyclinic Kolkata',
      code: 'PC-KOL-001',
      status: 'Available', 
      odometer: 45620,
      monthlyKm: 1240,
      trips: 23,
      lastService: '2024-10-15',
      nextService: '2024-01-15',
      fuelEfficiency: 12.5,
      utilization: 'High'
    },
    { 
      vehicleId: 'AMB-MUM-001', 
      type: 'Ambulance',
      polyclinic: 'Polyclinic Mumbai Central',
      code: 'PC-MUM-002',
      status: 'Under Maintenance', 
      odometer: 38900,
      monthlyKm: 0,
      trips: 0,
      lastService: '2024-09-20',
      nextService: 'In Progress',
      fuelEfficiency: 11.8,
      utilization: 'None'
    },
    { 
      vehicleId: 'AMB-DEL-001', 
      type: 'Ambulance',
      polyclinic: 'Polyclinic Delhi South',
      code: 'PC-DEL-003',
      status: 'Available', 
      odometer: 52100,
      monthlyKm: 980,
      trips: 18,
      lastService: '2024-11-01',
      nextService: '2024-02-01',
      fuelEfficiency: 13.2,
      utilization: 'Medium'
    },
    { 
      vehicleId: 'VAN-CHN-001', 
      type: 'Mobile Clinic Van',
      polyclinic: 'Polyclinic Chennai North',
      code: 'PC-CHN-004',
      status: 'Available', 
      odometer: 28750,
      monthlyKm: 650,
      trips: 12,
      lastService: '2024-10-20',
      nextService: '2024-01-20',
      fuelEfficiency: 15.1,
      utilization: 'Low'
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Available</Badge>
      case 'Under Maintenance':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Maintenance</Badge>
      case 'Out of Service':
        return <Badge variant="secondary">Out of Service</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUtilizationBadge = (utilization) => {
    switch (utilization) {
      case 'High':
        return <Badge variant="destructive">High</Badge>
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>
      case 'Low':
        return <Badge variant="outline">Low</Badge>
      case 'None':
        return <Badge variant="secondary">None</Badge>
      default:
        return <Badge variant="outline">{utilization}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600 mt-1">Monitor fleet status, utilization, and maintenance schedules</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-10">October 2024</SelectItem>
              <SelectItem value="2024-09">September 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Fleet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-gray-600 mt-1">Vehicles across network</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">34</div>
            <p className="text-xs text-gray-600 mt-1">89% fleet available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28,450</div>
            <p className="text-xs text-gray-600 mt-1">KM covered this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Emergency Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">342</div>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Available</span>
                </div>
                <span className="font-bold text-green-600">34 vehicles</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium">Under Maintenance</span>
                </div>
                <span className="font-bold text-red-600">4 vehicles</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">AMB-KOL-001</div>
                  <div className="text-sm text-gray-500">Kolkata</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">1,240 KM</div>
                  <div className="text-sm text-gray-500">23 trips</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">AMB-DEL-001</div>
                  <div className="text-sm text-gray-500">Delhi South</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">980 KM</div>
                  <div className="text-sm text-gray-500">18 trips</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Details */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Details</CardTitle>
          <CardDescription>
            Individual vehicle performance and maintenance status for {selectedMonth}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Polyclinic</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Monthly KM</TableHead>
                <TableHead className="text-center">Trips</TableHead>
                <TableHead className="text-center">Fuel Efficiency</TableHead>
                <TableHead className="text-center">Utilization</TableHead>
                <TableHead className="text-center">Next Service</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleFleet.map((vehicle, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vehicle.vehicleId}</div>
                      <div className="text-sm text-gray-500">{vehicle.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vehicle.polyclinic}</div>
                      <div className="text-sm text-gray-500">{vehicle.code}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(vehicle.status)}
                  </TableCell>
                  <TableCell className="text-center">{vehicle.monthlyKm.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{vehicle.trips}</TableCell>
                  <TableCell className="text-center">{vehicle.fuelEfficiency} km/L</TableCell>
                  <TableCell className="text-center">
                    {getUtilizationBadge(vehicle.utilization)}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    <span className={vehicle.nextService === 'Overdue' ? 'text-red-600 font-medium' : ''}>
                      {vehicle.nextService}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Fuel className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}