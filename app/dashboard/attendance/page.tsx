"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { AttendanceLog } from "@/components/attendance-log"
import { LocationTracker } from "@/components/location-tracker"
import { MapPin, Clock } from "lucide-react"

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">勤怠管理</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>本日の勤怠</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">出勤時間</span>
                    </div>
                    <span className="font-bold">08:05</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">退勤時間</span>
                    </div>
                    <span className="font-bold">--:--</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">出勤場所</span>
                    </div>
                    <span className="text-sm">東京都新宿区</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">退勤場所</span>
                    </div>
                    <span className="text-sm">--</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <Button className="flex-1" disabled>
                  出勤
                </Button>
                <Button className="flex-1" variant="outline">
                  退勤
                </Button>
                <Button className="flex-1" variant="outline">
                  直行申請
                </Button>
                <Button className="flex-1" variant="outline">
                  直帰申請
                </Button>
              </div>
            </CardContent>
          </Card>

          <LocationTracker showMap={true} />

          <Card>
            <CardHeader>
              <CardTitle>勤怠ログ</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceLog date={date} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>カレンダー</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

