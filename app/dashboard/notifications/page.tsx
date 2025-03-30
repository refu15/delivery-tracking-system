import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertCircle, CheckCircle2 } from "lucide-react"

type Notification = {
  id: number
  title: string
  content: string
  date: string
  isImportant: boolean
  isRead: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "システムメンテナンスのお知らせ",
    content:
      "明日の深夜1時から3時までシステムメンテナンスを実施します。この間はシステムにアクセスできなくなりますのでご注意ください。",
    date: "2025/03/28",
    isImportant: true,
    isRead: false,
  },
  {
    id: 2,
    title: "4月のシフト提出期限について",
    content: "4月のシフト希望の提出期限は3月25日までとなっています。期限までにご提出ください。",
    date: "2025/03/25",
    isImportant: true,
    isRead: true,
  },
  {
    id: 3,
    title: "安全運転講習会の開催について",
    content: "4月10日に安全運転講習会を開催します。参加必須となりますので、スケジュールの調整をお願いします。",
    date: "2025/03/20",
    isImportant: false,
    isRead: false,
  },
  {
    id: 4,
    title: "新しい配送マニュアルの公開",
    content: "配送手順の改訂版マニュアルが公開されました。必ずご確認ください。",
    date: "2025/03/15",
    isImportant: false,
    isRead: true,
  },
  {
    id: 5,
    title: "夏季休暇の申請について",
    content: "夏季休暇の申請受付を開始しました。希望される方は4月末までに申請してください。",
    date: "2025/03/10",
    isImportant: false,
    isRead: true,
  },
]

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.isRead).length
  const importantCount = notifications.filter((n) => n.isImportant).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">お知らせ</h2>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            すべて{" "}
            <Badge className="ml-2" variant="secondary">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            未読{" "}
            <Badge className="ml-2" variant="secondary">
              {unreadCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="important">
            重要{" "}
            <Badge className="ml-2" variant="secondary">
              {importantCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-4">
          {notifications
            .filter((n) => !n.isRead)
            .map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
        </TabsContent>

        <TabsContent value="important" className="mt-4 space-y-4">
          {notifications
            .filter((n) => n.isImportant)
            .map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <Card className={notification.isRead ? "opacity-80" : ""}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            {notification.isImportant ? (
              <AlertCircle className="h-5 w-5 text-primary" />
            ) : (
              <Bell className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{notification.title}</h3>
                {notification.isImportant && (
                  <Badge variant="destructive" className="text-xs">
                    重要
                  </Badge>
                )}
                {!notification.isRead && (
                  <Badge variant="secondary" className="text-xs">
                    未読
                  </Badge>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{notification.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{notification.content}</p>
          </div>
          {notification.isRead && <CheckCircle2 className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardContent>
    </Card>
  )
}

