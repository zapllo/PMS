'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Eye, MessageSquare, Clock, User, Phone, Filter, Download, Search, AlertCircle, CheckCircle } from 'lucide-react'
import { mockTickets } from '@/lib/mockData'

export default function TicketsView() {
  const [tickets, setTickets] = useState(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsDetailOpen(true)
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'in progress':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'medium':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'low':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <AlertCircle className="h-3 w-3" />
      case 'in progress':
        return <Clock className="h-3 w-3" />
      case 'resolved':
        return <CheckCircle className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const filteredTickets = statusFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status.toLowerCase().replace(' ', '-') === statusFilter)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-2">Manage beneficiary complaints and service requests</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search tickets..." 
              className="pl-10 w-full sm:w-64 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{tickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-3xl font-bold text-red-600">
                  {tickets.filter(t => t.status === 'Open').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">
                  {tickets.filter(t => t.status === 'In Progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {tickets.filter(t => t.status === 'Resolved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="group hover:shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <CardTitle className="text-lg font-semibold text-gray-900">{ticket.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(ticket.status)} flex items-center gap-1`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">
                    <span className="font-medium">#{ticket.id}</span> • {ticket.category} • {ticket.polyclinic}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewTicket(ticket)}
                  className="bg-white/80 hover:bg-gray-50 flex-shrink-0"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-2">{ticket.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="flex items-center gap-1 text-gray-600">
                    <User className="h-4 w-4" />
                    {ticket.createdBy}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Phone className="h-4 w-4" />
                    {ticket.contactPhone}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    {ticket.createdDate}
                  </span>
                </div>
                <span className="text-gray-500 font-medium">
                  Assigned to: <span className="text-gray-700">{ticket.assignedTo}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <DialogTitle className="text-2xl font-semibold">{selectedTicket.title}</DialogTitle>
                    <DialogDescription className="mt-2 text-base">
                      Ticket <span className="font-semibold">#{selectedTicket.id}</span> • Created on {selectedTicket.createdDate}
                    </DialogDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getStatusColor(selectedTicket.status)} flex items-center gap-1`}>
                      {getStatusIcon(selectedTicket.status)}
                      {selectedTicket.status}
                    </Badge>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* Ticket Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">Category</Label>
                      <p className="text-gray-700 mt-1">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">Polyclinic</Label>
                      <p className="text-gray-700 mt-1">{selectedTicket.polyclinic}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">Created By</Label>
                      <p className="text-gray-700 mt-1">{selectedTicket.createdBy}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">Contact Phone</Label>
                      <p className="text-gray-700 mt-1">{selectedTicket.contactPhone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">Assigned To</Label>
                      <p className="text-gray-700 mt-1">{selectedTicket.assignedTo}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">Update Status</Label>
                      <Select defaultValue={selectedTicket.status.toLowerCase().replace(' ', '-')}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm font-semibold text-gray-900">Issue Description</Label>
                  <div className="mt-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-gray-700 leading-relaxed">{selectedTicket.description}</p>
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <Label className="text-sm font-semibold text-gray-900">Internal Notes</Label>
                  <div className="mt-3 space-y-3">
                    {selectedTicket.internalNotes.map((note, index) => (
                      <div key={index} className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 border-l-4 border-l-yellow-400">
                        <p className="text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Note */}
                <div>
                  <Label htmlFor="new-note" className="text-sm font-semibold text-gray-900">Add Internal Note</Label>
                  <Textarea 
                    id="new-note" 
                    placeholder="Add internal note for team reference..." 
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter className="gap-3 pt-6 border-t">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Beneficiary
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}