"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ShiftCalendar } from "@/components/shift-calendar"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ShiftsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleDateChange = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: "day" | "week" | "month") => {
    setView(newView)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">シフト表</h2>
      </div>

      <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-[1fr_250px]"}>
        <Card className="col-span-1 overflow-hidden">
          <CardContent className="pt-6 p-0 sm:p-6">
            <div className="w-full overflow-auto">
              <ShiftCalendar 
                date={date} 
                view={view} 
                onDateChange={handleDateChange}
                onViewChange={handleViewChange}
              />
            </div>
          </CardContent>
        </Card>

        {!isMobile && (
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
        )}
      </div>
    </div>
  )
}

