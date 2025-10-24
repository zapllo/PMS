'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { 
  Clock, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  Info, 
  MessageSquare, 
  Send, 
  Shield, 
  Heart, 
  Activity, 
  Users, 
  CheckCircle, 
  ExternalLink,
  Ambulance,
  Mail,
  MessageCircle,
  Calendar,
  FileText,
  Pill,
  Search,
  Building2,
  Stethoscope,
  Plus,
  Zap,
  TrendingUp,
  UserCheck
} from 'lucide-react'

export default function PublicBenefitsPage() {
  const announcements = [
    {
      id: 1,
      title: "Medical Center Kolkata - Temporary Closure",
      message: "Medical Center Kolkata will remain closed for 3 days (Dec 2-4, 2024) due to equipment maintenance and upgrades.",
      type: "Service Disruption",
      polyclinic: "Medical Center Kolkata",
      date: "2024-12-01",
      expiry: "2024-12-04",
      urgent: true
    },
    {
      id: 2,
      title: "Extended Hours - Mumbai Central",
      message: "Medical Center Mumbai Central will have extended hours (7 AM - 10 PM) starting December 5th to serve more patients.",
      type: "Service Enhancement",
      polyclinic: "Medical Center Mumbai Central",
      date: "2024-12-01",
      expiry: "2024-12-31",
      urgent: false
    },
    {
      id: 3,
      title: "New Lab Services Available",
      message: "Advanced blood testing and diagnostic services now available at all medical centers in Delhi region.",
      type: "New Service",
      polyclinic: "All Delhi Medical Centers",
      date: "2024-11-30",
      expiry: "2024-12-31",
      urgent: false
    }
  ]

  const getAnnouncementStyle = (urgent: boolean) => {
    return urgent 
      ? 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700/70' 
      : 'bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700/70'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50 sticky top-0 z-10">
        <div className=" mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-blue-600/20">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                  Regional Centre Health Services
                </h1>
                <p className="text-muted-foreground mt-1 font-medium">Public Information & Services Portal</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center lg:items-end space-y-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-red-700 dark:text-red-300">24/7 Emergency Helpline</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">1800-XXX-XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Important Notices */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-border/50">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">Important Notices</CardTitle>
                    <CardDescription className="text-base mt-1">Latest updates and service announcements</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${getAnnouncementStyle(announcement.urgent)}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-lg font-semibold text-foreground leading-tight">{announcement.title}</h3>
                      <div className="flex gap-2 flex-shrink-0">
                        {announcement.urgent && (
                          <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/50">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-border/50">
                          {announcement.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{announcement.message}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {announcement.polyclinic}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Valid until {announcement.expiry}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit Complaint */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-border/50">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">Submit Complaint or Feedback</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Help us improve our services by sharing your experience and concerns
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                   <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      className="bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      placeholder="+91-XXXXX-XXXXX" 
                      className="bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="polyclinic" className="text-sm font-semibold text-foreground">Medical Center</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select the medical center you visited" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MC-KOL-001">Medical Center Kolkata</SelectItem>
                      <SelectItem value="MC-MUM-002">Medical Center Mumbai Central</SelectItem>
                      <SelectItem value="MC-DEL-003">Medical Center Delhi South</SelectItem>
                      <SelectItem value="MC-CHN-004">Medical Center Chennai North</SelectItem>
                      <SelectItem value="MC-BLR-005">Medical Center Bangalore East</SelectItem>
                      <SelectItem value="other">Other / General Query</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold text-foreground">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select complaint category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service-quality">Service Quality</SelectItem>
                      <SelectItem value="staff-behavior">Staff Behavior</SelectItem>
                      <SelectItem value="waiting-time">Waiting Time</SelectItem>
                      <SelectItem value="equipment-issue">Equipment Issue</SelectItem>
                      <SelectItem value="cleanliness">Cleanliness & Hygiene</SelectItem>
                      <SelectItem value="appointment">Appointment Issues</SelectItem>
                      <SelectItem value="billing">Billing & Payment</SelectItem>
                      <SelectItem value="feedback">General Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-foreground">Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please describe your complaint, feedback, or concern in detail. Include dates, times, and any other relevant information..."
                    rows={5}
                    className="bg-background/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0" 
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      I consent to the processing of my personal data for complaint resolution purposes and understand that my information will be handled according to privacy guidelines.
                    </label>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-blue-600/20">
                  <Send className="h-5 w-5 mr-2" />
                  Submit Complaint
                </Button>

                <div className="text-center p-4 bg-muted/50 rounded-xl border border-border/30">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Confirmation Notification</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You will receive a <strong>ticket number</strong> via SMS/Email for tracking your complaint status
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Status */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  Service Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Currently Operational</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">16</span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">out of 19 medical centers</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-xl border border-orange-200/50 dark:border-orange-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-orange-900 dark:text-orange-100">Temporary Closures</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">3</span>
                    <span className="text-sm text-orange-600 dark:text-orange-400">centers under maintenance</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Avg. Wait</span>
                    </div>
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-300">15-20m</p>
                  </div>

                  <div className="p-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg border border-purple-200/50 dark:border-purple-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Today</span>
                    </div>
                    <p className="text-lg font-bold text-purple-700 dark:text-purple-300">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-xl border-2 border-red-200/50 dark:border-red-800/30 hover:border-red-300/70 dark:hover:border-red-700/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Ambulance className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="font-bold text-red-800 dark:text-red-200">Medical Emergency</h3>
                  </div>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">108</p>
                  <p className="text-xs text-red-600/80 dark:text-red-400/80">National Ambulance Service</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border-2 border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300/70 dark:hover:border-blue-700/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-blue-800 dark:text-blue-200">RC Health Helpdesk</h3>
                  </div>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">1800-XXX-XXXX</p>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">24/7 Support Available</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-muted rounded-md">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">General Inquiry</p>
                        <p className="text-xs text-muted-foreground truncate">info@rchealth.gov.in</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50/30 dark:bg-green-900/10 rounded-lg border border-green-200/30 dark:border-green-800/20 hover:bg-green-50/50 dark:hover:bg-green-900/15 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-md">
                        <MessageCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">WhatsApp Support</p>
                        <p className="text-xs text-muted-foreground">+91-XXXXX-XXXXX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'New Lab Services Available', time: '2 days ago', icon: Plus, color: 'blue' },
                  { title: 'Extended Hours - Mumbai Central', time: '1 week ago', icon: Clock, color: 'green' },
                  { title: 'Equipment Upgrades Complete', time: '2 weeks ago', icon: Zap, color: 'orange' },
                  { title: 'Flu Vaccination Drive', time: '3 weeks ago', icon: Shield, color: 'purple' }
                ].map((update, index) => {
                  const IconComponent = update.icon
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border border-border/20">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        update.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        update.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                        update.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        <IconComponent className={`w-3 h-3 ${
                          update.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          update.color === 'green' ? 'text-green-600 dark:text-green-400' :
                          update.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">{update.title}</div>
                        <div className="text-xs text-muted-foreground">{update.time}</div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: MapPin, text: "Find Nearest Medical Center" },
                  { icon: Calendar, text: "Appointment Guidelines" },
                  { icon: FileText, text: "Required Documents" },
                  { icon: Pill, text: "Medicine Availability" },
                  { icon: Search, text: "Track Your Complaint" }
                ].map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="w-full justify-start bg-background/50 hover:bg-muted/50 border-border/50 hover:border-border transition-all duration-200"
                    >
                      <IconComponent className="h-4 w-4 mr-3 text-muted-foreground" />
                      {link.text}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-border/50">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 Regional Centre Health Services. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              This portal is maintained for the benefit of defense personnel and their families.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}