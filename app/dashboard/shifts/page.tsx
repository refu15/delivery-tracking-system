"use client"

import { useState } from "react"
import { ShiftCalendar } from "@/components/shift-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ShiftsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="container p-4 pb-16 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">シフト管理</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
        {/* メインのカレンダーコンポーネント */}
        <Card className="overflow-hidden bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800">
          <CardContent className="p-0 sm:p-4">
            <ShiftCalendar 
              date={date}
              view={view}
              onDateChange={setDate}
              onViewChange={setView}
            />
          </CardContent>
        </Card>

        {/* サイドバー - 運転手情報 */}
        <div className="space-y-4">
          {/* シフト概要 */}
          <Card className="bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">今月のシフト概要</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">勤務予定日数</span>
                  <span className="font-medium">18日</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">勤務時間</span>
                  <span className="font-medium">144時間</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">時間外</span>
                  <span className="font-medium text-amber-500">2時間</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 配達予定ドライバー */}
          <Card className="bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">今日の配達担当</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['田中太郎', '鈴木一郎', '佐藤健太'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-medium">{name}</div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-800">
                      配達中
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* シフト申請 */}
          {!isMobile && (
            <Card className="bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">シフト申請</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">シフト希望を提出</Button>
                <Button variant="outline" className="w-full">休暇申請</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* モバイル専用シフト申請ボタン */}
      {isMobile && (
        <div className="fixed bottom-16 right-4">
          <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </Button>
        </div>
      )}
    </div>
  )
}

