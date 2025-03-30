"use client"

import React, { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

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
  onViewChange?: (view: "day" | "week" | "month") => void
  onDateChange?: (date: Date) => void
}

// モックデータ
const generateMockEvents = (baseDate: Date): ShiftEvent[] => {
  const events: ShiftEvent[] = []
  const currentDate = new Date(baseDate)

  // 週の始まりの日を取得（日曜日）
  currentDate.setDate(currentDate.getDate() - currentDate.getDay())

  for (let i = 0; i < 14; i++) {
    const dayDate = new Date(currentDate)
    dayDate.setDate(currentDate.getDate() + i)

    const dateStr = dayDate.toISOString().split("T")[0]

    // シフト
    if (dayDate.getDay() >= 1 && dayDate.getDay() <= 5) { // 平日のみ
      events.push({
        id: i * 10 + 1,
        title: "シフト",
        start: `${dateStr}T08:00:00`,
        end: `${dateStr}T17:00:00`,
        type: "shift",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      })

      // 配送案件
      const deliveryCount = Math.floor(Math.random() * 3) + 1; // 1〜3件の配送
      for (let j = 0; j < deliveryCount; j++) {
        const startHour = 9 + j * 3;
        const endHour = startHour + 2;
        const areas = ["新宿区", "渋谷区", "品川区", "目黒区", "世田谷区"];
        const area = areas[Math.floor(Math.random() * areas.length)];
        
        events.push({
          id: i * 10 + 2 + j,
          title: `${area}配送`,
          start: `${dateStr}T${startHour.toString().padStart(2, "0")}:00:00`,
          end: `${dateStr}T${endHour.toString().padStart(2, "0")}:00:00`,
          type: "delivery",
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        })
      }
    }
  }

  return events
}

// 日付フォーマット関数
const formatDate = (date: Date, format: "full" | "month" | "short" = "full"): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  
  if (format === "month") {
    return `${year}年${month}月`;
  } else if (format === "short") {
    return `${month}/${day}`;
  }
  
  return `${year}年${month}月${day}日(${dayOfWeek})`;
}

export function ShiftCalendar({ date, view, onViewChange, onDateChange }: ShiftCalendarProps) {
  const [events, setEvents] = useState<ShiftEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(date)
  const [currentView, setCurrentView] = useState<"day" | "week" | "month">(view)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    // 実際のアプリではAPIからデータを取得
    setEvents(generateMockEvents(selectedDate))
  }, [selectedDate])

  // 日付変更ハンドラ
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    if (onDateChange) onDateChange(newDate);
  }
  
  // 表示切替ハンドラ
  const handleViewChange = (newView: "day" | "week" | "month") => {
    setCurrentView(newView);
    if (onViewChange) onViewChange(newView);
  }
  
  // 日付移動ハンドラ
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    
    if (currentView === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    
    handleDateChange(newDate);
  }

  // 今日に移動
  const goToToday = () => {
    handleDateChange(new Date());
  }

  return (
    <div className="space-y-4 w-full">
      {/* カレンダーヘッダー */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center px-2 sm:px-0">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            今日
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">
            {currentView === "day" 
              ? formatDate(selectedDate)
              : currentView === "week"
                ? (() => {
                    const startOfWeek = new Date(selectedDate);
                    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6);
                    return `${formatDate(startOfWeek, "short")} - ${formatDate(endOfWeek, "short")}`;
                  })()
                : formatDate(selectedDate, "month")
            }
          </h2>
        </div>
        
        <div className="flex rounded-md border">
          <Button
            variant={currentView === "day" ? "subtle" : "ghost"}
            size="sm"
            className={cn(
              "rounded-none rounded-l-md",
              currentView === "day" ? "bg-muted" : "hover:bg-transparent"
            )}
            onClick={() => handleViewChange("day")}
          >
            <Clock className="mr-1 h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>日</span>
          </Button>
          <Button
            variant={currentView === "week" ? "subtle" : "ghost"}
            size="sm"
            className={cn(
              "rounded-none border-x",
              currentView === "week" ? "bg-muted" : "hover:bg-transparent"
            )}
            onClick={() => handleViewChange("week")}
          >
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>週</span>
          </Button>
          <Button
            variant={currentView === "month" ? "subtle" : "ghost"}
            size="sm"
            className={cn(
              "rounded-none rounded-r-md",
              currentView === "month" ? "bg-muted" : "hover:bg-transparent"
            )}
            onClick={() => handleViewChange("month")}
          >
            <CalendarDays className="mr-1 h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>月</span>
          </Button>
        </div>
      </div>
      
      {/* カレンダー本体 - スクロール可能なコンテナ */}
      <div className="border rounded-md bg-card overflow-hidden">
        <div className="w-full overflow-auto">
          {currentView === "day" ? (
            <DayView date={selectedDate} events={events} isMobile={isMobile} />
          ) : currentView === "week" ? (
            <WeekView date={selectedDate} events={events} isMobile={isMobile} isTablet={isTablet} />
          ) : (
            <MonthView date={selectedDate} events={events} isMobile={isMobile} />
          )}
        </div>
      </div>
    </div>
  )
}

function DayView({ date, events, isMobile }: { date: Date; events: ShiftEvent[]; isMobile: boolean }) {
  const dateStr = date.toISOString().split("T")[0]
  const dayEvents = events.filter((event) => event.start.startsWith(dateStr))
  
  // 表示する時間範囲を調整
  const startHour = 7 // 7時から表示
  const endHour = isMobile ? 19 : 20 // モバイルは19時まで、PCは20時まで
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour)
  
  // 時間帯ごとにイベントをグループ化
  const getHourEvents = (hour: number) => {
    return dayEvents.filter((event) => {
      const eventStart = new Date(event.start).getHours()
      const eventEnd = new Date(event.end).getHours()
      return eventStart <= hour && eventEnd > hour
    })
  }

  return (
    <div className="h-[calc(100vh-220px)] min-h-[400px] overflow-y-auto">
      <div className="space-y-1 p-2 min-w-[640px]"> {/* 最小幅を設定して横スクロール可能に */}
        <div className="grid grid-cols-[50px_1fr] pb-2 border-b">
          <div className="text-xs text-muted-foreground sticky left-0"></div>
          <div className="px-2">
            <div className="font-medium">
              {formatDate(date)}
            </div>
          </div>
        </div>
        
        {hours.map((hour) => {
          const hourEvents = getHourEvents(hour)
          const hasEvents = hourEvents.length > 0
          
          return (
            <div key={hour} className="grid grid-cols-[50px_1fr] min-h-[48px]">
              <div className="text-right pr-2 text-xs text-muted-foreground pt-2 sticky left-0 bg-card z-10">
                {hour}:00
              </div>
              <div className={cn(
                "border-l pl-2 relative",
                hasEvents ? "bg-muted/20" : ""
              )}>
                {hourEvents.map((event) => {
                  const startHour = new Date(event.start).getHours()
                  const isStartingHour = startHour === hour
                  
                  if (!isStartingHour) return null
                  
                  const startMin = new Date(event.start).getMinutes()
                  const endHour = new Date(event.end).getHours()
                  const endMin = new Date(event.end).getMinutes()
                  const durationHours = endHour - startHour + (endMin > 0 ? 1 : 0)
                  
                  return (
                    <div 
                      key={event.id} 
                      className={cn(
                        "absolute left-2 right-2 rounded-md px-2 py-1 text-sm z-10",
                        event.color,
                        startMin > 0 ? "mt-6" : "mt-0"
                      )}
                      style={{ 
                        height: `${Math.min(durationHours * 48, 48)}px`,
                        zIndex: event.type === "shift" ? 10 : 20
                      }}
                    >
                      <div className="flex items-center h-full">
                        <div className="truncate">
                          {event.title} {startHour}:{startMin.toString().padStart(2, '0')}-
                          {endHour}:{endMin.toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekView({ 
  date, 
  events, 
  isMobile, 
  isTablet 
}: { 
  date: Date; 
  events: ShiftEvent[]; 
  isMobile: boolean;
  isTablet: boolean;
}) {
  const [activeDay, setActiveDay] = useState<Date>(date)
  
  // 週の始まりの日を取得（日曜日）
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())

  // 週の日付を生成
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    return day
  })

  // 表示する時間範囲を調整
  const startHour = 7 // 7時から表示
  const endHour = isMobile ? 19 : 20 // モバイルは19時まで、PCは20時まで
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour)

  // モバイル表示の場合
  if (isMobile) {
    const dayStr = activeDay.toISOString().split("T")[0]
    const dayEvents = events.filter((event) => event.start.startsWith(dayStr))
    
    // 時間帯ごとにイベントをグループ化
    const getHourEvents = (hour: number) => {
      return dayEvents.filter((event) => {
        const eventStart = new Date(event.start).getHours()
        const eventEnd = new Date(event.end).getHours()
        return eventStart <= hour && eventEnd > hour
      })
    }

    return (
      <div className="space-y-2">
        {/* 曜日セレクター */}
        <div className="grid grid-cols-7 gap-1 px-2 pt-2 pb-1 border-b">
          {weekDays.map((day, index) => {
            const isActive = day.toDateString() === activeDay.toDateString()
            const isToday = day.toDateString() === new Date().toDateString()
            const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][day.getDay()]
            
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center p-1 h-auto",
                  isActive && "bg-primary/10 font-bold",
                  isToday && "text-primary"
                )}
                onClick={() => setActiveDay(day)}
              >
                <span className="text-xs">{dayOfWeek}</span>
                <span className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full",
                  isToday && "bg-primary text-primary-foreground",
                )}>
                  {day.getDate()}
                </span>
              </Button>
            )
          })}
        </div>
        
        {/* 選択された日のイベント */}
        <div className="h-[calc(100vh-300px)] min-h-[300px] overflow-y-auto">
          <div className="space-y-1 p-2">
            {hours.map((hour) => {
              const hourEvents = getHourEvents(hour)
              const hasEvents = hourEvents.length > 0
              
              return (
                <div key={hour} className="grid grid-cols-[40px_1fr] min-h-[48px]">
                  <div className="text-right pr-2 text-xs text-muted-foreground pt-2">
                    {hour}:00
                  </div>
                  <div className={cn(
                    "border-l pl-2 relative",
                    hasEvents ? "bg-muted/20" : ""
                  )}>
                    {hourEvents.map((event) => {
                      const startHour = new Date(event.start).getHours()
                      const isStartingHour = startHour === hour
                      
                      if (!isStartingHour) return null
                      
                      const startMin = new Date(event.start).getMinutes()
                      const endHour = new Date(event.end).getHours()
                      const endMin = new Date(event.end).getMinutes()
                      const durationHours = endHour - startHour + (endMin > 0 ? 1 : 0)
                      
                      return (
                        <div 
                          key={event.id} 
                          className={cn(
                            "absolute left-2 right-2 rounded-md px-2 py-1 text-sm z-10",
                            event.color,
                            startMin > 0 ? "mt-6" : "mt-0"
                          )}
                          style={{ 
                            height: `${Math.min(durationHours * 48, 48)}px`,
                            zIndex: event.type === "shift" ? 10 : 20
                          }}
                        >
                          <div className="flex items-center h-full">
                            <div className="truncate">
                              {event.title}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  
  // タブレット・デスクトップ表示
  const displayDays = isTablet 
    ? weekDays.filter(day => day.getDay() >= 1 && day.getDay() <= 5) // タブレットは平日のみ
    : weekDays // デスクトップは全日表示

  return (
    <div className="h-[calc(100vh-220px)] min-h-[400px] overflow-auto">
      <div className="min-w-[640px]"> {/* 最小幅を設定して横スクロール可能に */}
        <div className={cn(
          "grid gap-px",
          `grid-cols-[50px_repeat(${displayDays.length},1fr)]`
        )}>
          {/* ヘッダー行 */}
          <div className="sticky top-0 z-30 bg-card"></div>
          {displayDays.map((day, i) => {
            const isToday = day.toDateString() === new Date().toDateString()
            const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][day.getDay()]
            const dateNum = day.getDate()
            
            return (
              <div 
                key={i} 
                className={cn(
                  "sticky top-0 z-30 text-center py-2 bg-card",
                  isToday && "bg-primary/10"
                )}
              >
                <div className="text-sm font-medium">
                  {dayOfWeek}
                </div>
                <div className={cn(
                  "inline-flex items-center justify-center w-7 h-7 mt-1 rounded-full",
                  isToday && "bg-primary text-primary-foreground"
                )}>
                  {dateNum}
                </div>
              </div>
            )
          })}
          
          {/* 時間帯と予定の表示 */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 text-xs text-muted-foreground pt-2 bg-card sticky left-0 z-20">
                {hour}:00
              </div>
              
              {displayDays.map((day, dayIndex) => {
                const dayStr = day.toISOString().split("T")[0]
                const isToday = day.toDateString() === new Date().toDateString()
                
                // この時間のイベントを取得
                const hourEvents = events.filter(event => {
                  if (!event.start.startsWith(dayStr)) return false
                  
                  const eventStart = new Date(event.start).getHours()
                  const eventEnd = new Date(event.end).getHours()
                  return eventStart <= hour && eventEnd > hour
                })
                
                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      "relative border-t min-h-[48px]",
                      isToday && "bg-primary/5"
                    )}
                  >
                    {hourEvents.map((event) => {
                      const startHour = new Date(event.start).getHours()
                      const isStartingHour = startHour === hour
                      
                      if (!isStartingHour) return null
                      
                      const startMin = new Date(event.start).getMinutes()
                      const endHour = new Date(event.end).getHours()
                      const endMin = new Date(event.end).getMinutes()
                      const durationHours = endHour - startHour + (endMin > 0 ? 1 : 0)
                      
                      return (
                        <div 
                          key={event.id} 
                          className={cn(
                            "absolute inset-x-0 mx-1 rounded-md px-2 py-1 text-sm z-10",
                            event.color,
                            startMin > 0 ? "mt-6" : "mt-0"
                          )}
                          style={{ 
                            height: `${Math.min(durationHours * 48, 48)}px`,
                            zIndex: event.type === "shift" ? 10 : 20
                          }}
                        >
                          <div className="truncate">
                            {event.title}
                          </div>
                        </div>
                      )
                    })}
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

function MonthView({ date, events, isMobile }: { date: Date; events: ShiftEvent[]; isMobile: boolean }) {
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
    <div className="h-[calc(100vh-220px)] min-h-[450px] overflow-auto">
      <div className="min-w-[640px] p-2"> {/* 最小幅を設定して横スクロール可能に */}
        <div className="grid grid-cols-7 gap-2">
          {/* 曜日ヘッダー */}
          {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
            <div key={day} className={cn(
              "text-center text-sm font-medium p-1 sticky top-0 z-10 bg-card",
              index === 0 && "text-red-500",
              index === 6 && "text-blue-500"
            )}>
              {day}
            </div>
          ))}

          {/* 日付セル */}
          {weeks.flat().map((day, i) => {
            const isCurrentMonth = day.getMonth() === date.getMonth()
            const isToday = day.toDateString() === new Date().toDateString()
            const isWeekend = day.getDay() === 0 || day.getDay() === 6
            const dayStr = day.toISOString().split("T")[0]
            const dayEvents = events.filter((event) => event.start.startsWith(dayStr))
            
            // イベントタイプ別グループ化
            const shiftEvents = dayEvents.filter(e => e.type === "shift")
            const deliveryEvents = dayEvents.filter(e => e.type === "delivery")
            
            return (
              <div
                key={i}
                className={cn(
                  "border rounded-md p-1",
                  isMobile ? "min-h-[60px]" : "min-h-[90px]",
                  !isCurrentMonth ? "bg-muted/30 opacity-70" : "",
                  isToday ? "bg-primary/10 border-primary" : "",
                  isWeekend && !isToday ? "bg-muted/10" : ""
                )}
              >
                <div className={cn(
                  "flex justify-between items-center",
                  isWeekend && day.getDay() === 0 && "text-red-500",
                  isWeekend && day.getDay() === 6 && "text-blue-500"
                )}>
                  <span className={cn(
                    "text-sm font-medium",
                    isToday && "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center"
                  )}>
                    {day.getDate()}
                  </span>
                  {dayEvents.length > 0 && !isMobile && (
                    <span className="text-xs text-muted-foreground">
                      {dayEvents.length}件
                    </span>
                  )}
                </div>
                
                <div className={cn(
                  "mt-1 space-y-1",
                  isMobile ? "max-h-[40px] overflow-hidden" : "max-h-[70px] overflow-y-auto"
                )}>
                  {shiftEvents.length > 0 && (
                    <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-1.5 py-0.5 rounded truncate">
                      シフト {shiftEvents[0].start.substring(11, 16)}-{shiftEvents[0].end.substring(11, 16)}
                    </div>
                  )}
                  
                  {deliveryEvents.map((event, idx) => (
                    idx < (isMobile ? 1 : 3) && (
                      <div key={event.id} className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-1.5 py-0.5 rounded truncate">
                        {event.title} {event.start.substring(11, 16)}-{event.end.substring(11, 16)}
                      </div>
                    )
                  ))}
                  
                  {/* 表示しきれない場合の表示 */}
                  {((isMobile && dayEvents.length > 2) || (!isMobile && deliveryEvents.length > 3)) && (
                    <div className="text-xs text-center text-muted-foreground">
                      +{isMobile ? dayEvents.length - 2 : deliveryEvents.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

