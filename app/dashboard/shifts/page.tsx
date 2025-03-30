"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ShiftCalendar } from "@/components/shift-calendar"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ShiftsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")

  const handlePrevious = () => {
    const newDate = new Date(date)
    if (view === "day") {
      newDate.setDate(date.getDate() - 1)
    } else if (view === "week") {
      newDate.setDate(date.getDate() - 7)
    } else {
      newDate.setMonth(date.getMonth() - 1)
    }
    setDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(date)
    if (view === "day") {
      newDate.setDate(date.getDate() + 1)
    } else if (view === "week") {
      newDate.setDate(date.getDate() + 7)
    } else {
      newDate.setMonth(date.getMonth() + 1)
    }
    setDate(newDate)
  }

  const handleToday = () => {
    setDate(new Date())
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">シフト表</h2>
        <div className="mt-2 flex space-x-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("day")}
            className={view === "day" ? "bg-muted" : ""}
          >
            日
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("week")}
            className={view === "week" ? "bg-muted" : ""}
          >
            週
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("month")}
            className={view === "month" ? "bg-muted" : ""}
          >
            月
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px]">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>
                {view === "day" &&
                  new Intl.DateTimeFormat("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  }).format(date)}
                {view === "week" &&
                  `${new Intl.DateTimeFormat("ja-JP", { month: "long", day: "numeric" }).format(date)} の週`}
                {view === "month" && new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long" }).format(date)}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleToday}>
                今日
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ShiftCalendar date={date} view={view} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
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

