import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, User, Clock, AlertTriangle, CheckCircle2, ArrowRight, Users, Settings2, Truck } from 'lucide-react'

interface Polyclinic {
  id: string
  name: string
  code: string
  city: string
  phone: string
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

interface StatusConfig {
  badge: { variant: 'destructive' | 'default' | 'secondary', text: string }
  indicator: { color: string, icon: React.ComponentType<{ className?: string }>, iconColor: string }
  status: string
}

export default function PolyclinicGrid({ polyclinics, onSelect }: PolyclinicGridProps) {
  const getStatusConfig = (polyclinic: Polyclinic): StatusConfig => {
    if (polyclinic.hasIssues) {
      return {
        badge: { variant: 'destructive' as const, text: 'Issues Detected' },
        indicator: { color: 'bg-red-500', icon: AlertTriangle, iconColor: 'text-red-600 dark:text-red-400' },
        status: 'Requires Attention'
      }
    }
    
    if (polyclinic.status === 'Active') {
      return {
        badge: { variant: 'default' as const, text: 'Operational' },
        indicator: { color: 'bg-emerald-500', icon: CheckCircle2, iconColor: 'text-emerald-600 dark:text-emerald-400' },
        status: 'All Systems Normal'
      }
    }
    
    return {
      badge: { variant: 'secondary' as const, text: 'Inactive' },
      indicator: { color: 'bg-gray-400', icon: Clock, iconColor: 'text-gray-600 dark:text-gray-400' },
      status: 'Offline'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {polyclinics.map((polyclinic) => {
        const statusConfig = getStatusConfig(polyclinic)
        const StatusIcon = statusConfig.indicator.icon

        return (
          <Card 
            key={polyclinic.id} 
            className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-card dark:bg-card"
            onClick={() => onSelect(polyclinic)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-lg truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {polyclinic.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-muted-foreground">{polyclinic.code}</span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{polyclinic.city}</span>
                  </div>
                </div>
                <Badge variant={statusConfig.badge.variant} className="shrink-0">
                  {statusConfig.badge.text}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Details */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                  <span className="text-foreground">{polyclinic.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 text-muted-foreground mr-3" />
                  <span className="text-foreground truncate">{polyclinic.inCharge}</span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between p-3 bg-muted dark:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusConfig.indicator.color}`}></div>
                  <span className="text-sm font-medium text-foreground">{statusConfig.status}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {polyclinic.lastUpdated}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center py-2">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-foreground">{polyclinic.stats.totalStaff}</div>
                  <div className="text-xs text-muted-foreground">Staff</div>
                </div>
                
                <div className="text-center py-2">
                  <div className="flex items-center justify-center mb-1">
                    <Settings2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div className="text-lg font-bold text-foreground">{polyclinic.stats.serviceableEquipment}</div>
                  <div className="text-xs text-muted-foreground">Equipment</div>
                </div>
                
                <div className="text-center py-2">
                  <div className="flex items-center justify-center mb-1">
                    <Truck className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-foreground">{polyclinic.stats.vehicles}</div>
                  <div className="text-xs text-muted-foreground">Vehicles</div>
                </div>
              </div>

              {/* Action Area */}
              <div className="pt-2 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-0 h-8"
                >
                  <span className="font-medium">View Details</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>

            {/* Hover Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Card>
        )
      })}
    </div>
  )
}