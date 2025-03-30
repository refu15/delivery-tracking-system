import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, AlertCircle } from "lucide-react"
import { NotificationList } from "@/components/notification-list"
import { WeeklySchedule } from "@/components/weekly-schedule"

export default function DashboardPage() {
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(currentDate)

  const hour = currentDate.getHours()
  let greeting = "こんにちは"
  if (hour < 12) {
    greeting = "おはようございます"
  } else if (hour >= 18) {
    greeting = "こんばんは"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">山田さん、{greeting}！</h2>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日のシフト</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">出勤時間</span>
                <span className="font-bold">08:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">退勤時間</span>
                <span className="font-bold">17:00</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">休憩時間</span>
                <span className="font-bold">12:00 - 13:00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日の配送案件</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">案件数</span>
                <span className="font-bold">5件</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">配送先エリア</span>
                <span className="font-bold">新宿区、渋谷区</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">車両</span>
                <span className="font-bold">軽トラック A-123</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">重要なお知らせ</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-md bg-yellow-50 p-3 dark:bg-yellow-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">システムメンテナンス</h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>明日の深夜1時から3時までシステムメンテナンスを実施します。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>今週の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklySchedule />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>お知らせ</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

