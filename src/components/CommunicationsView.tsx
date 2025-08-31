'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    MessageSquare,
    Mail,
    Phone,
    Search,
    Filter,
    Send,
    Plus,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    MapPin,
    Calendar,
    User,
    Activity,
    FileText,
    Heart,
    Shield,
    Eye
} from 'lucide-react'
import { mockWarVeterans, getVeteranActivityLogs, getVeteranMedicalHistory, getVeteranVisitHistory } from '@/lib/mockVeteranData'
import { FaWhatsapp } from "react-icons/fa";

const ITEMS_PER_PAGE = 15

export default function CommunicationsView() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedVeterans, setSelectedVeterans] = useState<string[]>([])
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [selectedVeteran, setSelectedVeteran] = useState(null)
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterPolyclinic, setFilterPolyclinic] = useState('all')

    // Filter veterans based on search and filters
    const filteredVeterans = mockWarVeterans.filter(veteran => {
        const matchesSearch = !searchTerm ||
            veteran.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            veteran.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            veteran.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            veteran.location.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === 'all' || veteran.status === filterStatus
        const matchesPolyclinic = filterPolyclinic === 'all' || veteran.lastVisitedPolyclinic === filterPolyclinic

        return matchesSearch && matchesStatus && matchesPolyclinic
    })

    // Pagination
    const totalPages = Math.ceil(filteredVeterans.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedVeterans = filteredVeterans.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleSelectVeteran = (veteranId: string) => {
        setSelectedVeterans(prev =>
            prev.includes(veteranId)
                ? prev.filter(id => id !== veteranId)
                : [...prev, veteranId]
        )
    }

    const handleSelectAll = () => {
        if (selectedVeterans.length === paginatedVeterans.length) {
            setSelectedVeterans([])
        } else {
            setSelectedVeterans(paginatedVeterans.map(v => v.id))
        }
    }

    const getStatusColor = (status: string) => {
        const colors = {
            'Active': 'bg-emerald-100 text-emerald-800 border-emerald-300',
            'Inactive': 'bg-slate-100 text-slate-700 border-slate-300',
            'Critical': 'bg-red-100 text-red-800 border-red-300'
        }
        return colors[status] || colors['Active']
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    if (selectedVeteran) {
        return <VeteranProfile veteran={selectedVeteran} onBack={() => setSelectedVeteran(null)} />
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">War Veterans Directory</h1>
                    <p className="text-slate-600 mt-2">Connect with Ex-Servicemen and their families</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Broadcast to All
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">Compose Message</DialogTitle>
                                <DialogDescription>
                                    Send message to selected veterans via WhatsApp or Email
                                </DialogDescription>
                            </DialogHeader>
                            <ComposeMessageDialog
                                selectedVeterans={selectedVeterans}
                                onClose={() => setIsComposeOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Search and Filters */}
            <Card className="border border-slate-200">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search veterans by name, service number, unit..."
                                className="pl-10 bg-white border-slate-300"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-300">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterPolyclinic} onValueChange={setFilterPolyclinic}>
                            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-300">
                                <SelectValue placeholder="Filter by polyclinic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Polyclinics</SelectItem>
                                <SelectItem value="PC-KOL-006">Kolkata</SelectItem>
                                <SelectItem value="PC-BAR-001">Barrackpore</SelectItem>
                                <SelectItem value="PC-SAL-007">Salt Lake</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Selection Actions */}
            {selectedVeterans.length > 0 && (
                <Card className="border border-blue-200 bg-blue-50">
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-blue-900">
                                    {selectedVeterans.length} veteran{selectedVeterans.length > 1 ? 's' : ''} selected
                                </span>
                                <Button variant="outline" size="sm" onClick={() => setSelectedVeterans([])}>
                                    Clear Selection
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                    <FaWhatsapp className="h-4 w-4 mr-2" />
                                    WhatsApp All
                                </Button>
                                <Button size="sm" variant="outline" className="border-slate-300">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email All
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Veterans Table */}
            <Card className="border border-slate-200">
                <CardHeader className="border-b border-slate-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-lg font-semibold text-slate-900">War Veterans Directory</CardTitle>
                            <CardDescription className="text-slate-600">
                                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredVeterans.length)} of {filteredVeterans.length} veterans
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={selectedVeterans.length === paginatedVeterans.length && paginatedVeterans.length > 0}
                                onCheckedChange={handleSelectAll}
                            />
                            <Label className="text-sm text-slate-600">Select All</Label>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {paginatedVeterans.length === 0 ? (
                        <div className="text-center py-12">
                            <Shield className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Veterans Found</h3>
                            <p className="text-slate-600">
                                {searchTerm ? `No veterans match "${searchTerm}"` : 'No veterans available'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-2 font-semibold text-slate-900">Select</th>
                                        <th className="text-left py-3 px-2 font-semibold text-slate-900">Veteran</th>
                                        <th className="text-left py-3 px-2 font-semibold text-slate-900">Service Details</th>
                                        <th className="text-left py-3 px-2 font-semibold text-slate-900">Contact</th>
                                        <th className="text-left py-3 px-2 font-semibold text-slate-900">Medical Condition</th>
                                        <th className="text-center py-3 px-2 font-semibold text-slate-900">Status</th>
                                        <th className="text-center py-3 px-2 font-semibold text-slate-900">Last Visit</th>
                                        <th className="text-center py-3 px-2 font-semibold text-slate-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedVeterans.map((veteran) => (
                                        <tr
                                            key={veteran.id}
                                            className="hover:bg-slate-50 cursor-pointer group"
                                            onClick={() => setSelectedVeteran(veteran)}
                                        >
                                            <td className="py-4 px-2">
                                                <Checkbox
                                                    checked={selectedVeterans.includes(veteran.id)}
                                                    onCheckedChange={() => handleSelectVeteran(veteran.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-3">
                                                    {/* <Avatar className="h-10 w-10">
                            <AvatarImage src={veteran.avatar} />
                            <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold text-sm">
                              {getInitials(veteran.name)}
                            </AvatarFallback>
                          </Avatar> */}
                                                    <div>
                                                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                            {veteran.name}
                                                        </div>
                                                        <div className="text-sm text-slate-600 font-mono">{veteran.echsCardNumber}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div>
                                                    <div className="font-medium text-slate-900">{veteran.rank}</div>
                                                    <div className="text-sm text-slate-600">{veteran.unit}</div>
                                                    <div className="text-xs text-slate-500 font-mono">SVC: {veteran.serviceNumber}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div>
                                                    <div className="text-sm text-slate-900 font-mono">{veteran.phone}</div>
                                                    <div className="text-sm text-slate-600">{veteran.location}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="text-sm text-slate-700">{veteran.medicalCondition}</div>
                                            </td>
                                            <td className="text-center py-4 px-2">
                                                <Badge className={getStatusColor(veteran.status)}>
                                                    {veteran.status}
                                                </Badge>
                                            </td>
                                            <td className="text-center py-4 px-2">
                                                <div className="text-sm text-slate-700">{veteran.lastVisit}</div>
                                                <div className="text-xs text-slate-500">{veteran.lastVisitedPolyclinicName.replace('ECHS Polyclinic ', '')}</div>
                                            </td>
                                            <td className="text-center py-4 px-2">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            window.open(`https://wa.me/${veteran.phone.replace(/[^0-9]/g, '')}`, '_blank')
                                                        }}
                                                        title="WhatsApp"
                                                    >
                                                        <FaWhatsapp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            window.open(`mailto:${veteran.email}`, '_blank')
                                                        }}
                                                        title="Email"
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-slate-600 hover:bg-slate-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedVeteran(veteran)
                                                        }}
                                                        title="View Profile"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <Card className="border border-slate-200">
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-600">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="border-slate-300"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const page = i + Math.max(1, currentPage - 2)
                                    if (page > totalPages) return null

                                    return (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className={currentPage === page ? "bg-slate-900" : "border-slate-300"}
                                        >
                                            {page}
                                        </Button>
                                    )
                                })}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="border-slate-300"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

// Compose Message Dialog Component
function ComposeMessageDialog({ selectedVeterans, onClose }) {
    const [messageType, setMessageType] = useState('whatsapp')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="type">Message Type</Label>
                    <Select value={messageType} onValueChange={setMessageType}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="both">Both WhatsApp & Email</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {(messageType === 'email' || messageType === 'both') && (
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Enter email subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        placeholder="Enter your message"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">
                        <strong>Recipients:</strong> {selectedVeterans.length} veteran{selectedVeterans.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-slate-500">
                        Message will be sent via {messageType === 'both' ? 'WhatsApp and Email' : messageType === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </p>
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-slate-800"
                    disabled={!message.trim()}
                >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                </Button>
            </DialogFooter>
        </div>
    )
}

// Veteran Profile Component
function VeteranProfile({ veteran, onBack }) {
    const [activeTab, setActiveTab] = useState('overview')
    const activityLogs = getVeteranActivityLogs(veteran.id)
    const medicalHistory = getVeteranMedicalHistory(veteran.id)
    const visitHistory = getVeteranVisitHistory(veteran.id)

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'medical', label: 'Medical History', icon: Heart },
        { id: 'visits', label: 'Polyclinic Visits', icon: FileText },
        { id: 'activity', label: 'Activity Log', icon: Activity }
    ]

    const getStatusColor = (status: string) => {
        const colors = {
            'Active': 'bg-emerald-100 text-emerald-800 border-emerald-300',
            'Inactive': 'bg-slate-100 text-slate-700 border-slate-300',
            'Critical': 'bg-red-100 text-red-800 border-red-300'
        }
        return colors[status] || colors['Active']
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={onBack} className="bg-white border-slate-300">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Directory
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-4">
                        {/* <Avatar className="h-16 w-16">
                            <AvatarImage src={veteran.avatar} />
                            <AvatarFallback className="bg-slate-100 text-slate-700 text-xl font-bold">
                                {veteran.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar> */}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{veteran.name}</h1>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="font-mono text-slate-600">{veteran.serviceNumber}</span>
                                <Badge className={getStatusColor(veteran.status)}>
                                    {veteran.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <FaWhatsapp className="h-4 w-4 mr-2" />
                        WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-300">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                    </Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <Card className="border border-slate-200">
                <CardContent className="p-2">
                    <nav className="flex gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-slate-900 text-white'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </nav>
                </CardContent>
            </Card>

            {/* Tab Content */}
            <div>
                {activeTab === 'overview' && <VeteranOverview veteran={veteran} />}
                {activeTab === 'medical' && <VeteranMedicalHistory veteran={veteran} medicalHistory={medicalHistory} />}
                {activeTab === 'visits' && <VeteranVisits veteran={veteran} visitHistory={visitHistory} />}
                {activeTab === 'activity' && <VeteranActivityLog veteran={veteran} activityLogs={activityLogs} />}
            </div>
        </div>
    )
}

// Veteran Overview Tab (same as before)
function VeteranOverview({ veteran }) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card className="border border-slate-200">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-semibold text-slate-900">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid gap-3">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Full Name</span>
                            <span className="text-sm text-slate-900">{veteran.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Service Number</span>
                            <span className="text-sm font-mono text-slate-900">{veteran.serviceNumber}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Rank</span>
                            <span className="text-sm text-slate-900">{veteran.rank}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Unit</span>
                            <span className="text-sm text-slate-900">{veteran.unit}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Age</span>
                            <span className="text-sm text-slate-900">{veteran.age} years</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Location</span>
                            <span className="text-sm text-slate-900">{veteran.location}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm font-medium text-slate-600">Phone</span>
                            <span className="text-sm font-mono text-slate-900">{veteran.phone}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-slate-200">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-semibold text-slate-900">ECHS Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid gap-3">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">ECHS Card Number</span>
                            <span className="text-sm font-mono text-slate-900">{veteran.echsCardNumber}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Last Visited Polyclinic</span>
                            <span className="text-sm text-slate-900">{veteran.lastVisitedPolyclinicName}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Last Visit Date</span>
                            <span className="text-sm text-slate-900">{veteran.lastVisit}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Medical Condition</span>
                            <span className="text-sm text-slate-900">{veteran.medicalCondition}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">War Service</span>
                            <span className="text-sm text-slate-900">{veteran.warService}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">Dependents</span>
                            <span className="text-sm text-slate-900">{veteran.dependents}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-sm font-medium text-slate-600">Status</span>
                            <Badge className={getStatusColor(veteran.status)}>
                                {veteran.status}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Updated Medical History Tab with data
function VeteranMedicalHistory({ veteran, medicalHistory }) {
    return (
        <Card className="border border-slate-200">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-slate-900">Medical History</CardTitle>
                <CardDescription className="text-slate-600">Complete medical records and treatment history</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Date</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Condition/Diagnosis</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Treatment</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Prescribed By</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Polyclinic</th>
                                <th className="text-center py-3 px-2 font-semibold text-slate-900">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {medicalHistory.map((record, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                    <td className="py-3 px-2 text-sm font-mono text-slate-700">{record.date}</td>
                                    <td className="py-3 px-2">
                                        <div className="font-medium text-slate-900">{record.condition}</div>
                                        {record.details && (
                                            <div className="text-sm text-slate-600">{record.details}</div>
                                        )}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-slate-700">{record.treatment}</td>
                                    <td className="py-3 px-2 text-sm text-slate-700">{record.doctor}</td>
                                    <td className="py-3 px-2 text-sm text-slate-700">{record.polyclinic}</td>
                                    <td className="text-center py-3 px-2">
                                        <Badge variant={record.status === 'Ongoing' ? 'destructive' : 'default'}>
                                            {record.status}
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

// Updated Visits Tab with data
function VeteranVisits({ veteran, visitHistory }) {
    return (
        <Card className="border border-slate-200">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-slate-900">Polyclinic Visits</CardTitle>
                <CardDescription className="text-slate-600">Complete visit history across all ECHS polyclinics</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Date & Time</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Polyclinic</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Purpose</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Attended By</th>
                                <th className="text-left py-3 px-2 font-semibold text-slate-900">Outcome</th>
                                <th className="text-center py-3 px-2 font-semibold text-slate-900">Visit Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {visitHistory.map((visit, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                    <td className="py-3 px-2">
                                        <div className="font-mono text-sm text-slate-900">{visit.date}</div>
                                        <div className="text-xs text-slate-600">{visit.time}</div>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="font-medium text-slate-900">{visit.polyclinic}</div>
                                        <div className="text-sm text-slate-600">{visit.location}</div>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="font-medium text-slate-900">{visit.purpose}</div>
                                        {visit.symptoms && (
                                            <div className="text-sm text-slate-600">{visit.symptoms}</div>
                                        )}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-slate-700">{visit.attendedBy}</td>
                                    <td className="py-3 px-2 text-sm text-slate-700">{visit.outcome}</td>
                                    <td className="text-center py-3 px-2">
                                        <Badge variant={visit.visitType === 'Emergency' ? 'destructive' : 'outline'}>
                                            {visit.visitType}
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

// Updated Activity Log with data
function VeteranActivityLog({ veteran, activityLogs }) {
    const getActivityIcon = (type) => {
        const icons = {
            visit: '🏥',
            treatment: '⚕️',
            medication: '💊',
            appointment: '📅',
            referral: '📋'
        }
        return icons[type] || '📄'
    }

    const getActivityColor = (type) => {
        const colors = {
            visit: 'bg-blue-50 border-blue-200',
            treatment: 'bg-emerald-50 border-emerald-200',
            medication: 'bg-purple-50 border-purple-200',
            appointment: 'bg-orange-50 border-orange-200',
            referral: 'bg-slate-50 border-slate-200'
        }
        return colors[type] || 'bg-slate-50 border-slate-200'
    }

    return (
        <Card className="border border-slate-200">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-slate-900">Activity Log</CardTitle>
                <CardDescription className="text-slate-600">Recent medical and administrative activities</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {activityLogs.map((activity, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 p-4 border rounded-lg ${getActivityColor(activity.type)}`}
                        >
                            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-slate-900">{activity.polyclinic}</span>
                                        <Badge variant="outline" className="text-xs">
                                            {activity.type}
                                        </Badge>
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">
                                        {activity.date} • {activity.time}
                                    </div>
                                </div>
                                <div className="font-medium text-slate-900 mb-1">{activity.title}</div>
                                <div className="text-sm text-slate-700">{activity.description}</div>
                                {activity.doctor && (
                                    <div className="text-xs text-slate-600 mt-1">
                                        <span className="font-medium">Attended by:</span> {activity.doctor}
                                    </div>
                                )}
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

// Helper function for status colors
function getStatusColor(status: string) {
    const colors = {
        'Active': 'bg-emerald-100 text-emerald-800 border-emerald-300',
        'Inactive': 'bg-slate-100 text-slate-700 border-slate-300',
        'Critical': 'bg-red-100 text-red-800 border-red-300'
    }
    return colors[status] || colors['Active']
}