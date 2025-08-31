import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, User, Clock, AlertTriangle, CheckCircle2, ArrowRight, Users, Settings2, Truck, Shield } from 'lucide-react'

interface Polyclinic {
  id: string
  name: string
  code: string
  city: string
  phone: string
  military: string
  mobile: string
  inCharge: string
  status: string
  hasIssues: boolean
  lastUpdated: string
  stats: {
    totalStaff: number
    serviceableEquipment: number
    vehicles: number
  }
}

interface PolyclinicGridProps {
  polyclinics: Polyclinic[]
  onSelect: (polyclinic: Polyclinic) => void
}

export default function PolyclinicGrid({ polyclinics, onSelect }: PolyclinicGridProps) {
  const getStatusConfig = (polyclinic: Polyclinic) => {
    if (polyclinic.hasIssues) {
      return {
        badge: { variant: 'destructive' as const, text: 'Attention Required' },
        indicator: 'bg-amber-500',
        status: 'Issues Detected'
      }
    }
    
    if (polyclinic.status === 'Active') {
      return {
        badge: { variant: 'default' as const, text: 'Operational' },
        indicator: 'bg-emerald-500',
        status: 'All Systems Normal'
      }
    }
    
    return {
      badge: { variant: 'secondary' as const, text: 'Offline' },
      indicator: 'bg-slate-400',
      status: 'Not Operational'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {polyclinics.map((polyclinic) => {
        const statusConfig = getStatusConfig(polyclinic)

        return (
          <Card 
            key={polyclinic.id} 
            className="group relative overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => onSelect(polyclinic)}
          >
            <CardHeader className="pb-4 border-b border-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    <h3 className="font-semibold text-slate-900 text-sm group-hover:text-slate-700 transition-colors line-clamp-1">
                      {polyclinic.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                    <span className="font-mono font-medium">{polyclinic.code}</span>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <span>{polyclinic.city}</span>
                  </div>
                </div>
                <Badge variant={statusConfig.badge.variant} className="text-xs">
                  {statusConfig.badge.text}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4 space-y-4">
              {/* OIC Details */}
              <div className="space-y-2">
                <div className="flex items-center text-xs">
                  <User className="h-3 w-3 text-slate-500 mr-2 flex-shrink-0" />
                  <span className="font-medium text-slate-900 truncate">{polyclinic.inCharge}</span>
                </div>
                <div className="flex items-center text-xs">
                  <Phone className="h-3 w-3 text-slate-500 mr-2 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-700">{polyclinic.phone}</span>
                    {polyclinic.military && (
                      <span className="text-slate-600">Mil: {polyclinic.military}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusConfig.indicator}`}></div>
                  <span className="text-xs font-medium text-slate-900">{statusConfig.status}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {polyclinic.lastUpdated}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center py-2 bg-blue-50 rounded-lg">
                  <Users className="h-3 w-3 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-blue-900">{polyclinic.stats.totalStaff}</div>
                  <div className="text-xs text-blue-700">Staff</div>
                </div>
                
                <div className="text-center py-2 bg-emerald-50 rounded-lg">
                  <Settings2 className="h-3 w-3 text-emerald-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-emerald-900">{polyclinic.stats.serviceableEquipment}</div>
                  <div className="text-xs text-emerald-700">Equipment</div>
                </div>
                
                <div className="text-center py-2 bg-purple-50 rounded-lg">
                  <Truck className="h-3 w-3 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-purple-900">{polyclinic.stats.vehicles}</div>
                  <div className="text-xs text-purple-700">Vehicles</div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-8 text-xs font-medium"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>

            {/* Subtle hover accent */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </Card>
        )
      })}
    </div>
  )
}