"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, AlertCircle, Users, Truck, Calendar } from "lucide-react"
import { NotificationList } from "@/components/notification-list"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { useUser } from "@/context/user-context"
import { EditableBreakTime } from "@/components/editable-break-time"

export default function DashboardPage() {
  const { isAdmin } = useUser()
  
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

  // 管理者向けダッシュボード
  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">管理者さん、{greeting}！</h2>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本日の配達員</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8名</div>
              <p className="text-xs text-muted-foreground">出勤予定：10名</p>
              <div className="mt-4 h-1 w-full rounded-full bg-muted">
                <div className="h-1 w-4/5 rounded-full bg-primary"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">稼働中車両</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5台</div>
              <p className="text-xs text-muted-foreground">空き車両：2台</p>
              <div className="mt-4 h-1 w-full rounded-full bg-muted">
                <div className="h-1 w-3/4 rounded-full bg-primary"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">配送案件</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15件</div>
              <p className="text-xs text-muted-foreground">完了：6件 / 未完了：9件</p>
              <div className="mt-4 h-1 w-full rounded-full bg-muted">
                <div className="h-1 w-2/5 rounded-full bg-green-500"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今週のシフト登録率</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90%</div>
              <p className="text-xs text-muted-foreground">未登録：2名</p>
              <div className="mt-4 h-1 w-full rounded-full bg-muted">
                <div className="h-1 w-[90%] rounded-full bg-primary"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>今日の勤務状況</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>山田 太郎</span>
                  </div>
                  <span className="text-sm text-muted-foreground">08:00 - 17:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>佐藤 一郎</span>
                  </div>
                  <span className="text-sm text-muted-foreground">08:30 - 17:30</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span>鈴木 次郎</span>
                  </div>
                  <span className="text-sm text-muted-foreground">遅刻：09:15 -</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                    <span>高橋 三郎</span>
                  </div>
                  <span className="text-sm text-muted-foreground">未出勤（予定：10:00）</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>重要なお知らせ</CardTitle>
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
                <Button variant="outline" className="w-full" asChild>
                  <a href="/dashboard/notifications">すべてのお知らせを見る</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>今週の配送スケジュール</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklySchedule />
          </CardContent>
        </Card>
      </div>
    )
  }

  // 配達員向けダッシュボード
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
                <EditableBreakTime defaultStartTime="12:00" defaultEndTime="13:00" isEditable={false} />
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

