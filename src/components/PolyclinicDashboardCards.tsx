import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Settings2, Truck, FileText, AlertCircle, CheckCircle2, Calendar, Activity } from 'lucide-react'

export default function PolyclinicDashboardCards() {
  const stats = [
    {
      title: "Personnel Status",
      value: "24",
      total: "28",
      percentage: 86,
      icon: Users,
      status: "attention",
      subtitle: "4 vacant positions",
      detail: "Staff strength"
    },
    {
      title: "Equipment Status",
      value: "42",
      total: "48",
      percentage: 88,
      icon: Settings2,
      status: "good",
      subtitle: "6 under maintenance",
      detail: "Medical equipment"
    },
    {
      title: "Fleet Status",
      value: "5",
      total: "6",
      percentage: 83,
      icon: Truck,
      status: "good",
      subtitle: "1 in maintenance",
      detail: "Vehicles operational"
    },
    {
      title: "Pending Returns",
      value: "2",
      subtitle: "Due this week",
      icon: FileText,
      status: "warning",
      detail: "Monthly reports"
    },
    {
      title: "Patient Load",
      value: "156",
      subtitle: "This month",
      icon: Activity,
      trend: "+12%",
      status: "normal",
      detail: "Total consultations"
    },
    {
      title: "Compliance",
      value: "94%",
      subtitle: "All parameters",
      icon: CheckCircle2,
      status: "good",
      detail: "Overall score"
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      good: 'text-emerald-700',
      attention: 'text-amber-700',
      warning: 'text-orange-700',
      critical: 'text-red-700',
      normal: 'text-blue-700'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getIconBg = (status: string) => {
    const colors = {
      good: 'bg-emerald-100',
      attention: 'bg-amber-100',
      warning: 'bg-orange-100',
      critical: 'bg-red-100',
      normal: 'bg-blue-100'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getProgressBg = (status: string) => {
    const colors = {
      good: 'bg-emerald-600',
      attention: 'bg-amber-500',
      warning: 'bg-orange-500',
      critical: 'bg-red-600',
      normal: 'bg-blue-500'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getBadgeBg = (status: string) => {
    const colors = {
      good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      attention: 'bg-amber-50 text-amber-700 border-amber-200',
      warning: 'bg-orange-50 text-orange-700 border-orange-200',
      critical: 'bg-red-50 text-red-700 border-red-200',
      normal: 'bg-blue-50 text-blue-700 border-blue-200'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <Card key={index} className="border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${getIconBg(stat.status)}`}>
                  <Icon className={`h-4 w-4 ${getStatusColor(stat.status)}`} />
                </div>
                <Badge className={`${getBadgeBg(stat.status)} border text-xs px-2 py-0.5`}>
                  {stat.status === 'good' ? 'Good' : 
                   stat.status === 'attention' ? 'Attention' :
                   stat.status === 'warning' ? 'Warning' :
                   stat.status === 'critical' ? 'Critical' : 'Normal'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                    {stat.total && (
                      <span className="text-sm font-medium text-slate-500">/ {stat.total}</span>
                    )}
                    {stat.trend && (
                      <span className="text-xs font-semibold text-emerald-600">{stat.trend}</span>
                    )}
                  </div>
                  
                  {stat.percentage && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Strength</span>
                        <span className="font-semibold text-slate-700">{stat.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getProgressBg(stat.status)} transition-all duration-300`}
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{stat.title}</h3>
                  {stat.subtitle && (
                    <p className="text-xs text-slate-600">{stat.subtitle}</p>
                  )}
                  {stat.detail && (
                    <p className="text-xs text-slate-500 mt-1">{stat.detail}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

