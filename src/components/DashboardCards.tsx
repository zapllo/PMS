import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Users, Settings2, Truck, Clock, HeadphonesIcon, TrendingUp, TrendingDown } from 'lucide-react'

export default function DashboardCards() {
  const stats = [
    {
      title: "Monthly Returns",
      value: "18",
      total: "20",
      percentage: 90,
      icon: FileText,
      trend: "+2",
      trendUp: true,
      status: "good",
      subtitle: "Submitted on time"
    },
    {
      title: "Personnel Gaps",
      value: "12",
      subtitle: "Vacant positions",
      icon: Users,
      trend: "-3",
      trendUp: false,
      status: "attention"
    },
    {
      title: "Equipment Issues",
      value: "5",
      subtitle: "Require attention",
      icon: Settings2,
      trend: "-2",
      trendUp: false,
      status: "warning"
    },
    {
      title: "Fleet Status",
      value: "18",
      total: "20",
      percentage: 90,
      icon: Truck,
      trend: "90%",
      status: "good",
      subtitle: "Operational"
    },
    {
      title: "Overdue Items",
      value: "3",
      subtitle: "Immediate action",
      icon: Clock,
      trend: "-1",
      trendUp: false,
      status: "critical"
    },
    {
      title: "Support Tickets",
      value: "4",
      subtitle: "Active cases",
      icon: HeadphonesIcon,
      trend: "New",
      status: "normal"
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      good: 'text-emerald-700',
      attention: 'text-amber-700',
      warning: 'text-orange-700',
      critical: 'text-red-700',
      normal: 'text-slate-700'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getIconBg = (status: string) => {
    const colors = {
      good: 'bg-emerald-100',
      attention: 'bg-amber-100',
      warning: 'bg-orange-100',
      critical: 'bg-red-100',
      normal: 'bg-slate-100'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getProgressBg = (status: string) => {
    const colors = {
      good: 'bg-emerald-600',
      attention: 'bg-amber-500',
      warning: 'bg-orange-500',
      critical: 'bg-red-600',
      normal: 'bg-slate-500'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getTrendColor = (trendUp: boolean, status: string) => {
    if (status === 'critical' || status === 'warning') {
      return trendUp ? 'text-red-600' : 'text-emerald-600'
    }
    return trendUp ? 'text-emerald-600' : 'text-red-600'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown
        
        return (
          <Card key={index} className="border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${getIconBg(stat.status)}`}>
                  <Icon className={`h-4 w-4 ${getStatusColor(stat.status)}`} />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1">
                    {stat.trendUp !== undefined && (
                      <TrendIcon className={`h-3 w-3 ${getTrendColor(stat.trendUp, stat.status)}`} />
                    )}
                    <span className={`text-xs font-semibold ${
                      stat.trendUp !== undefined 
                        ? getTrendColor(stat.trendUp, stat.status)
                        : 'text-slate-600'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                    {stat.total && (
                      <span className="text-sm font-medium text-slate-500">of {stat.total}</span>
                    )}
                  </div>
                  
                  {stat.percentage && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-semibold text-slate-700">{stat.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getProgressBg(stat.status)}`}
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
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}