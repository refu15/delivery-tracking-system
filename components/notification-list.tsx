import { Badge } from "@/components/ui/badge"

type Notification = {
  id: number
  title: string
  date: string
  isImportant: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "システムメンテナンスのお知らせ",
    date: "2025/03/28",
    isImportant: true,
  },
  {
    id: 2,
    title: "4月のシフト提出期限について",
    date: "2025/03/25",
    isImportant: true,
  },
  {
    id: 3,
    title: "安全運転講習会の開催について",
    date: "2025/03/20",
    isImportant: false,
  },
  {
    id: 4,
    title: "新しい配送マニュアルの公開",
    date: "2025/03/15",
    isImportant: false,
  },
]

export function NotificationList() {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-start justify-between rounded-lg border p-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium leading-none">{notification.title}</p>
              {notification.isImportant && (
                <Badge variant="destructive" className="text-xs">
                  重要
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{notification.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

