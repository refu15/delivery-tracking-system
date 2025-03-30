"use client"

import React from "react"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

type ShiftEvent = {
  id: number
  title: string
  start: string
  end: string
  type: "shift" | "delivery"
  color: string
}

type ShiftCalendarProps = {
  date: Date
  view: "day" | "week" | "month"
}

// モックデータ
const generateMockEvents = (baseDate: Date): ShiftEvent[] => {
  const events: ShiftEvent[] = []
  const currentDate = new Date(baseDate)

  // 週の始まりの日を取得（日曜日）
  currentDate.setDate(currentDate.getDate() - currentDate.getDay())

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(currentDate)
    dayDate.setDate(currentDate.getDate() + i)

    // 土日はスキップ
    if (dayDate.getDay() === 0 || dayDate.getDay() === 6) {
      continue
    }

    const dateStr = dayDate.toISOString().split("T")[0]

    // シフト
    events.push({
      id: i * 10 + 1,
      title: "シフト",
      start: `${dateStr}T08:00:00`,
      end: `${dateStr}T17:00:00`,
      type: "shift",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    })

    // 配送案件
    events.push({
      id: i * 10 + 2,
      title: "新宿区配送",
      start: `${dateStr}T09:00:00`,
      end: `${dateStr}T11:30:00`,
      type: "delivery",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    })

    events.push({
      id: i * 10 + 3,
      title: "渋谷区配送",
      start: `${dateStr}T13:00:00`,
      end: `${dateStr}T16:00:00`,
      type: "delivery",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    })
  }

  return events
}

export function ShiftCalendar({ date, view }: ShiftCalendarProps) {
  const [events, setEvents] = useState<ShiftEvent[]>([])

  useEffect(() => {
    // 実際のアプリではAPIからデータを取得
    setEvents(generateMockEvents(date))
  }, [date])

  if (view === "day") {
    return <DayView date={date} events={events} />
  } else if (view === "week") {
    return <WeekView date={date} events={events} />
  } else {
    return <MonthView date={date} events={events} />
  }
}

function DayView({ date, events }: { date: Date; events: ShiftEvent[] }) {
  const dateStr = date.toISOString().split("T")[0]
  const dayEvents = events.filter((event) => event.start.startsWith(dateStr))
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8時から19時まで

  return (
    <div className="space-y-1">
      {hours.map((hour) => {
        const hourStr = `${dateStr}T${hour.toString().padStart(2, "0")}:00:00`
        const hourEvents = dayEvents.filter((event) => event.start <= hourStr && event.end > hourStr)

        return (
          <div key={hour} className="grid grid-cols-[60px_1fr] gap-2">
            <div className="text-right text-sm text-muted-foreground">{hour}:00</div>
            <div className="rounded-md border p-2 min-h-[60px]">
              {hourEvents.map((event) => (
                <div key={event.id} className={`rounded-sm px-2 py-1 text-xs ${event.color}`}>
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WeekView({ date, events }: { date: Date; events: ShiftEvent[] }) {
  // 週の始まりの日を取得（日曜日）
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())

  // 週の日付を生成
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    return day
  })

  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8時から19時まで

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1">
          <div className="text-sm text-muted-foreground"></div>
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`text-center font-medium ${
                day.toDateString() === new Date().toDateString() ? "bg-primary/10 rounded-md" : ""
              }`}
            >
              <div>{["日", "月", "火", "水", "木", "金", "土"][day.getDay()]}</div>
              <div className="text-sm text-muted-foreground">{day.getDate()}</div>
            </div>
          ))}

          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-right text-sm text-muted-foreground pt-2">{hour}:00</div>
              {weekDays.map((day, dayIndex) => {
                const dayStr = day.toISOString().split("T")[0]
                const hourStr = `${dayStr}T${hour.toString().padStart(2, "0")}:00:00`
                const hourEvents = events.filter(
                  (event) => event.start <= hourStr && event.end > hourStr && event.start.startsWith(dayStr),
                )

                return (
                  <div
                    key={dayIndex}
                    className={`border min-h-[60px] p-1 ${
                      day.toDateString() === new Date().toDateString() ? "bg-primary/5" : ""
                    }`}
                  >
                    {hourEvents.map((event) => (
                      <div key={event.id} className={`rounded-sm px-2 py-1 text-xs mb-1 truncate ${event.color}`}>
                        {event.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

function MonthView({ date, events }: { date: Date; events: ShiftEvent[] }) {
  // 月の最初の日を取得
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  // 月の最後の日を取得
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  // カレンダーの最初の日（前月の日を含む）
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  // カレンダーの最後の日（翌月の日を含む）
  const endDate = new Date(lastDayOfMonth)
  if (endDate.getDay() < 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
  }

  // 日付の配列を生成
  const days = []
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // 週ごとに分割
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
        <div key={day} className="text-center font-medium p-2">
          {day}
        </div>
      ))}

      {weeks.flat().map((day, i) => {
        const isCurrentMonth = day.getMonth() === date.getMonth()
        const isToday = day.toDateString() === new Date().toDateString()
        const dayStr = day.toISOString().split("T")[0]
        const dayEvents = events.filter((event) => event.start.startsWith(dayStr))

        return (
          <div
            key={i}
            className={`min-h-[100px] p-1 border rounded-md ${
              !isCurrentMonth ? "bg-muted/50" : ""
            } ${isToday ? "bg-primary/10" : ""}`}
          >
            <div className="text-right text-sm font-medium">{day.getDate()}</div>
            <div className="mt-1 space-y-1">
              {dayEvents.length > 0 && (
                <div className="text-xs">
                  {dayEvents.filter((e) => e.type === "shift").length > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 w-full justify-center mb-1"
                    >
                      シフト
                    </Badge>
                  )}
                  {dayEvents.filter((e) => e.type === "delivery").length > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 w-full justify-center"
                    >
                      配送 {dayEvents.filter((e) => e.type === "delivery").length}件
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

