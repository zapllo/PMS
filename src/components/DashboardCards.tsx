import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Users, Settings2, Truck, Clock, HeadphonesIcon, TrendingUp, TrendingDown } from 'lucide-react'

export default function DashboardCards() {
  const stats = [
    {
      title: "Reports Submitted",
      value: "142",
      total: "152",
      percentage: 93,
      icon: FileText,
      trend: "+12%",
      trendUp: true,
      status: "success"
    },
    {
      title: "Personnel Vacancies",
      value: "47",
      subtitle: "Open positions",
      icon: Users,
      trend: "+7",
      trendUp: true,
      status: "warning"
    },
    {
      title: "Equipment Issues",
      value: "23",
      subtitle: "Maintenance required",
      icon: Settings2,
      trend: "-5",
      trendUp: false,
      status: "attention"
    },
    {
      title: "Fleet Availability",
      value: "34",
      total: "38",
      percentage: 89,
      icon: Truck,
      trend: "89%",
      status: "good"
    },
    {
      title: "Overdue Items",
      value: "8",
      subtitle: "Immediate action",
      icon: Clock,
      trend: "+3",
      trendUp: true,
      status: "critical"
    },
    {
      title: "Support Requests",
      value: "12",
      subtitle: "Active tickets",
      icon: HeadphonesIcon,
      trend: "-2",
      trendUp: false,
      status: "normal"
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      success: 'text-emerald-600 dark:text-emerald-400',
      warning: 'text-amber-600 dark:text-amber-400',
      attention: 'text-orange-600 dark:text-orange-400',
      good: 'text-blue-600 dark:text-blue-400',
      critical: 'text-red-600 dark:text-red-400',
      normal: 'text-gray-600 dark:text-gray-400'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getIconBg = (status: string) => {
    const colors = {
      success: 'bg-emerald-50 dark:bg-emerald-900/20',
      warning: 'bg-amber-50 dark:bg-amber-900/20',
      attention: 'bg-orange-50 dark:bg-orange-900/20',
      good: 'bg-blue-50 dark:bg-blue-900/20',
      critical: 'bg-red-50 dark:bg-red-900/20',
      normal: 'bg-gray-50 dark:bg-gray-800'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getProgressBg = (status: string) => {
    const colors = {
      success: 'bg-emerald-600 dark:bg-emerald-400',
      warning: 'bg-amber-600 dark:bg-amber-400',
      attention: 'bg-orange-600 dark:bg-orange-400',
      good: 'bg-blue-600 dark:bg-blue-400',
      critical: 'bg-red-600 dark:bg-red-400',
      normal: 'bg-gray-600 dark:bg-gray-400'
    }
    return colors[status as keyof typeof colors] || colors.normal
  }

  const getTrendColor = (trendUp: boolean, status: string) => {
    if (status === 'critical' || status === 'warning') {
      return trendUp ? 'text-red-500 dark:text-red-400' : 'text-emerald-500 dark:text-emerald-400'
    }
    return trendUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown
        
        return (
          <Card key={index} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card dark:bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${getIconBg(stat.status)}`}>
                  <Icon className={`h-5 w-5 ${getStatusColor(stat.status)}`} />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`h-3 w-3 ${getTrendColor(stat.trendUp!, stat.status)}`} />
                    <span className={`text-xs font-medium ${getTrendColor(stat.trendUp!, stat.status)}`}>
                      {stat.trend}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    {stat.total && (
                      <span className="text-sm font-medium text-muted-foreground">of {stat.total}</span>
                    )}
                  </div>
                  
                  {stat.percentage && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{stat.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getProgressBg(stat.status)}`}
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground text-sm leading-tight">{stat.title}</h3>
                  {stat.subtitle && (
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.subtitle}</p>
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