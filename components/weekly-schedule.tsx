import { Badge } from "@/components/ui/badge"

type ScheduleItem = {
  id: number
  day: string
  date: string
  shift: string
  deliveryArea?: string
}

const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    day: "月",
    date: "3/30",
    shift: "8:00 - 17:00",
    deliveryArea: "新宿区",
  },
  {
    id: 2,
    day: "火",
    date: "3/31",
    shift: "8:00 - 17:00",
    deliveryArea: "渋谷区",
  },
  {
    id: 3,
    day: "水",
    date: "4/1",
    shift: "休日",
  },
  {
    id: 4,
    day: "木",
    date: "4/2",
    shift: "8:00 - 17:00",
    deliveryArea: "品川区",
  },
  {
    id: 5,
    day: "金",
    date: "4/3",
    shift: "8:00 - 17:00",
    deliveryArea: "目黒区",
  },
]

export function WeeklySchedule() {
  return (
    <div className="space-y-3">
      {scheduleItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="font-medium">{item.day}</span>
            </div>
            <div>
              <p className="font-medium">{item.date}</p>
              <p className="text-sm text-muted-foreground">{item.shift}</p>
            </div>
          </div>
          {item.deliveryArea ? (
            <Badge variant="outline">{item.deliveryArea}</Badge>
          ) : (
            <Badge variant="secondary">休日</Badge>
          )}
        </div>
      ))}
    </div>
  )
}

