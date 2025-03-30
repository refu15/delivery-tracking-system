"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { AttendanceLog } from "@/components/attendance-log"
import { LocationTracker } from "@/components/location-tracker"
import { useUser } from "@/context/user-context"
import { 
  MapPin, 
  Clock, 
  Info, 
  Search, 
  UserCheck, 
  UserX, 
  Check, 
  X, 
  Plus 
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditableBreakTime } from "@/components/editable-break-time"

// ダミーデータ - 配達員勤怠情報
const attendanceData = [
  {
    id: "DRV001",
    name: "山田 太郎",
    date: "2023/11/01",
    clockIn: "08:05",
    clockOut: "17:30",
    breakStart: "12:00",
    breakEnd: "13:00",
    status: "complete", // complete, active, absent
    location: "東京都新宿区"
  },
  {
    id: "DRV002",
    name: "佐藤 一郎",
    date: "2023/11/01",
    clockIn: "08:00",
    clockOut: "17:00",
    breakStart: "12:30",
    breakEnd: "13:30",
    status: "complete",
    location: "東京都渋谷区"
  },
  {
    id: "DRV003",
    name: "鈴木 次郎",
    date: "2023/11/01",
    clockIn: "--:--",
    clockOut: "--:--",
    breakStart: "--:--",
    breakEnd: "--:--",
    status: "absent",
    location: "--"
  },
  {
    id: "DRV004",
    name: "高橋 三郎",
    date: "2023/11/01",
    clockIn: "08:15",
    clockOut: "--:--",
    breakStart: "12:15",
    breakEnd: "13:15",
    status: "active",
    location: "東京都目黒区"
  }
]

export default function AttendancePage() {
  const { isAdmin } = useUser()
  const [date, setDate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null)
  const [registerDate, setRegisterDate] = useState<Date>(new Date())
  
  // 管理者向けの勤怠一覧表示用フィルタリング
  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" || 
      record.status === statusFilter
      
    return matchesSearch && matchesStatus
  })
  
  // 選択された配達員の詳細情報を取得
  const selectedDriver = selectedDriverId
    ? attendanceData.find(driver => driver.id === selectedDriverId)
    : null
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">完了</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">勤務中</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">欠勤</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">勤怠管理</h2>
        {isAdmin && (
          <Button onClick={() => setShowRegisterDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            勤怠登録
          </Button>
        )}
      </div>

      {isAdmin ? (
        // 管理者向け表示
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">
              <UserCheck className="mr-2 h-4 w-4" />
              勤怠一覧
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Clock className="mr-2 h-4 w-4" />
              カレンダー表示
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>勤怠一覧</CardTitle>
                <CardDescription>配達員の勤怠状況を確認・管理できます</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="名前、IDで検索..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    defaultValue="all"
                    onValueChange={(value) => setStatusFilter(value)}
                  >
                    <SelectTrigger className="sm:w-[180px]">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="complete">完了</SelectItem>
                      <SelectItem value="active">勤務中</SelectItem>
                      <SelectItem value="absent">欠勤</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="overflow-auto rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">名前</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">日付</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">出勤・退勤</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">場所</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ステータス</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-gray-200 dark:divide-gray-800">
                      {filteredAttendance.map((record) => (
                        <tr key={record.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{record.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{record.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{record.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {record.clockIn} - {record.clockOut}
                            <div className="text-xs text-muted-foreground">
                              休憩: {record.breakStart} - {record.breakEnd}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{record.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(record.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedDriverId(record.id)}>
                                  編集
                                </Button>
                              </DialogTrigger>
                              {selectedDriver && selectedDriver.id === record.id && (
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>勤怠編集</DialogTitle>
                                    <DialogDescription>
                                      {selectedDriver.name} ({selectedDriver.id}) の勤怠情報を編集します
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="date" className="text-right">
                                        日付
                                      </Label>
                                      <Input
                                        id="date"
                                        type="date"
                                        defaultValue={selectedDriver.date.split('/').join('-')}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="status" className="text-right">
                                        ステータス
                                      </Label>
                                      <Select defaultValue={selectedDriver.status} className="col-span-3">
                                        <SelectTrigger>
                                          <SelectValue placeholder="ステータスを選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="complete">完了</SelectItem>
                                          <SelectItem value="active">勤務中</SelectItem>
                                          <SelectItem value="absent">欠勤</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="clockIn" className="text-right">
                                        出勤時間
                                      </Label>
                                      <Input
                                        id="clockIn"
                                        type="time"
                                        defaultValue={selectedDriver.clockIn !== "--:--" ? selectedDriver.clockIn : ""}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="clockOut" className="text-right">
                                        退勤時間
                                      </Label>
                                      <Input
                                        id="clockOut"
                                        type="time"
                                        defaultValue={selectedDriver.clockOut !== "--:--" ? selectedDriver.clockOut : ""}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right">
                                        休憩時間
                                      </Label>
                                      <div className="col-span-3">
                                        <EditableBreakTime 
                                          defaultStartTime={selectedDriver.breakStart !== "--:--" ? selectedDriver.breakStart : "12:00"} 
                                          defaultEndTime={selectedDriver.breakEnd !== "--:--" ? selectedDriver.breakEnd : "13:00"} 
                                          isEditable={true}
                                          onSave={() => {}}
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="location" className="text-right">
                                        場所
                                      </Label>
                                      <Input
                                        id="location"
                                        defaultValue={selectedDriver.location !== "--" ? selectedDriver.location : ""}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setSelectedDriverId(null)}>
                                      キャンセル
                                    </Button>
                                    <Button onClick={() => setSelectedDriverId(null)}>
                                      保存
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              )}
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredAttendance.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-10 text-center text-sm text-muted-foreground">
                            勤怠記録が見つかりませんでした
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="grid gap-4 md:grid-cols-[1fr_250px]">
              <Card>
                <CardHeader>
                  <CardTitle>勤怠カレンダー</CardTitle>
                  <CardDescription>日別の出勤状況を確認できます</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">カレンダービューが表示される予定です</p>
                </CardContent>
              </Card>
              
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
          </TabsContent>
        </Tabs>
      ) : (
        // 配達員向け表示
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

                <div className="mt-4 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        勤怠情報は管理者により登録されます。情報に誤りがある場合は管理者にお問い合わせください。
                      </p>
                    </div>
                  </div>
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
      )}
      
      {/* 勤怠登録ダイアログ - 管理者用 */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>勤怠登録</DialogTitle>
            <DialogDescription>
              配達員の勤怠情報を登録します
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="register-driver" className="text-right">
                配達員
              </Label>
              <Select className="col-span-3">
                <SelectTrigger id="register-driver">
                  <SelectValue placeholder="配達員を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRV001">山田 太郎</SelectItem>
                  <SelectItem value="DRV002">佐藤 一郎</SelectItem>
                  <SelectItem value="DRV003">鈴木 次郎</SelectItem>
                  <SelectItem value="DRV004">高橋 三郎</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="register-date" className="text-right">
                日付
              </Label>
              <Input
                id="register-date"
                type="date"
                value={registerDate.toISOString().split('T')[0]}
                onChange={(e) => setRegisterDate(new Date(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="register-status" className="text-right">
                ステータス
              </Label>
              <Select defaultValue="active" className="col-span-3">
                <SelectTrigger id="register-status">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">完了</SelectItem>
                  <SelectItem value="active">勤務中</SelectItem>
                  <SelectItem value="absent">欠勤</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="register-clockIn" className="text-right">
                出勤時間
              </Label>
              <Input
                id="register-clockIn"
                type="time"
                defaultValue="08:00"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="register-clockOut" className="text-right">
                退勤時間
              </Label>
              <Input
                id="register-clockOut"
                type="time"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                休憩時間
              </Label>
              <div className="col-span-3">
                <EditableBreakTime 
                  defaultStartTime="12:00" 
                  defaultEndTime="13:00" 
                  isEditable={true}
                  onSave={() => {}}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="register-location" className="text-right">
                場所
              </Label>
              <Input
                id="register-location"
                defaultValue="東京都新宿区"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegisterDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setShowRegisterDialog(false)}>
              登録
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

