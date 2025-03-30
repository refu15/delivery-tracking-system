"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Calendar,
  Clock,
  MapPin, 
  User, 
  Search, 
  Plus, 
  Edit, 
  Truck,
  Calendar as CalendarIcon
} from "lucide-react"
import { EditableBreakTime } from "@/components/editable-break-time"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"

// ダミーデータ
const driverList = [
  {
    id: "DRV001",
    name: "山田 太郎",
    email: "yamada@example.com",
    phone: "090-1234-5678",
    status: "active", // active, inactive, vacation
    area: "東京都新宿区",
    shift: {
      start: "08:00",
      end: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00"
    }
  },
  {
    id: "DRV002",
    name: "佐藤 一郎",
    email: "sato@example.com",
    phone: "090-2345-6789",
    status: "active",
    area: "東京都渋谷区",
    shift: {
      start: "08:30",
      end: "17:30",
      breakStart: "12:30",
      breakEnd: "13:30"
    }
  },
  {
    id: "DRV003",
    name: "鈴木 次郎",
    email: "suzuki@example.com",
    phone: "090-3456-7890",
    status: "vacation", // 休暇中
    area: "東京都品川区",
    shift: {
      start: "09:00",
      end: "18:00",
      breakStart: "13:00",
      breakEnd: "14:00"
    }
  },
  {
    id: "DRV004",
    name: "高橋 三郎",
    email: "takahashi@example.com", 
    phone: "090-4567-8901",
    status: "inactive", // 非アクティブ
    area: "東京都目黒区",
    shift: {
      start: "10:00",
      end: "19:00",
      breakStart: "14:00",
      breakEnd: "15:00"
    }
  }
]

export default function DriversPage() {
  const { isAdmin } = useUser()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  
  // 非管理者はダッシュボードにリダイレクト
  if (!isAdmin) {
    router.push("/dashboard")
    return null
  }
  
  // フィルタリングされた配達員リスト
  const filteredDrivers = driverList.filter(driver => {
    const matchesSearch = (
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.area.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    const matchesStatus = 
      statusFilter === "all" || 
      driver.status === statusFilter
      
    return matchesSearch && matchesStatus
  })
  
  // 選択された配達員の詳細情報を取得
  const selectedDriver = selectedDriverId
    ? driverList.find(driver => driver.id === selectedDriverId)
    : null
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">稼働中</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">非稼働</Badge>
      case "vacation":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">休暇中</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">配達員管理</h2>
          <p className="text-muted-foreground">配達員の情報とシフト管理を行います</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            配達員を追加
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>配達員一覧</CardTitle>
          <CardDescription>配達員の検索と詳細表示ができます</CardDescription>
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
                <SelectItem value="active">稼働中</SelectItem>
                <SelectItem value="inactive">非稼働</SelectItem>
                <SelectItem value="vacation">休暇中</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-auto rounded-md border">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">名前</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">担当エリア</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">シフト時間</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ステータス</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-gray-200 dark:divide-gray-800">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{driver.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{driver.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{driver.area}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{driver.shift.start} - {driver.shift.end}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(driver.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedDriverId(driver.id)}>
                            詳細
                          </Button>
                        </DialogTrigger>
                        {selectedDriver && selectedDriver.id === driver.id && (
                          <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                {selectedDriver.name}
                                {getStatusBadge(selectedDriver.status)}
                              </DialogTitle>
                            </DialogHeader>
                            
                            <Tabs defaultValue="details" className="w-full mt-2">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="details">基本情報</TabsTrigger>
                                <TabsTrigger value="shift">シフト管理</TabsTrigger>
                                <TabsTrigger value="history">履歴</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="details" className="space-y-4 pt-4">
                                {editMode ? (
                                  // 編集モード
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                      <div className="space-y-2">
                                        <Label htmlFor="driver-name">名前</Label>
                                        <Input
                                          id="driver-name"
                                          defaultValue={selectedDriver.name}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="driver-email">メールアドレス</Label>
                                        <Input
                                          id="driver-email"
                                          defaultValue={selectedDriver.email}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="driver-phone">電話番号</Label>
                                        <Input
                                          id="driver-phone"
                                          defaultValue={selectedDriver.phone}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="driver-area">担当エリア</Label>
                                        <Input
                                          id="driver-area"
                                          defaultValue={selectedDriver.area}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="driver-status">ステータス</Label>
                                        <Select defaultValue={selectedDriver.status}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="ステータスを選択" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="active">稼働中</SelectItem>
                                            <SelectItem value="inactive">非稼働</SelectItem>
                                            <SelectItem value="vacation">休暇中</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // 表示モード
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                      <div>
                                        <p className="text-sm text-muted-foreground">ID</p>
                                        <p className="font-medium">{selectedDriver.id}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">名前</p>
                                        <p className="font-medium">{selectedDriver.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">メールアドレス</p>
                                        <p className="font-medium">{selectedDriver.email}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">電話番号</p>
                                        <p className="font-medium">{selectedDriver.phone}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">担当エリア</p>
                                        <p className="font-medium">{selectedDriver.area}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">ステータス</p>
                                        <div className="mt-1">{getStatusBadge(selectedDriver.status)}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </TabsContent>
                              
                              <TabsContent value="shift" className="space-y-4 pt-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <Clock className="h-5 w-5" />
                                      シフト設定
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label htmlFor="shift-start">出勤時間</Label>
                                          <div className="mt-1">
                                            <Input 
                                              id="shift-start" 
                                              type="time" 
                                              defaultValue={selectedDriver.shift.start} 
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <Label htmlFor="shift-end">退勤時間</Label>
                                          <div className="mt-1">
                                            <Input 
                                              id="shift-end" 
                                              type="time" 
                                              defaultValue={selectedDriver.shift.end} 
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <Label>休憩時間</Label>
                                        <div className="mt-1">
                                          <EditableBreakTime 
                                            defaultStartTime={selectedDriver.shift.breakStart} 
                                            defaultEndTime={selectedDriver.shift.breakEnd} 
                                            isEditable={true}
                                            onSave={(start, end) => {
                                              console.log(`休憩時間を変更: ${start} - ${end}`);
                                              // 実際はここでAPIを呼び出して保存
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <CalendarIcon className="h-5 w-5" />
                                      予定カレンダー
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center justify-center h-[200px] bg-muted/50 rounded-md">
                                      <p className="text-muted-foreground">カレンダービューが表示されます</p>
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <Truck className="h-5 w-5" />
                                      配送案件割当
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                                        <div>
                                          <span className="font-medium">DEL-001</span>
                                          <span className="text-sm text-muted-foreground ml-2">10:00 - 12:00</span>
                                        </div>
                                        <Badge>未着手</Badge>
                                      </div>
                                      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                                        <div>
                                          <span className="font-medium">DEL-003</span>
                                          <span className="text-sm text-muted-foreground ml-2">13:30 - 15:00</span>
                                        </div>
                                        <Badge>未着手</Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <Button variant="outline" size="sm" className="w-full">
                                        <Plus className="mr-2 h-4 w-4" />
                                        案件を割り当て
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </TabsContent>
                              
                              <TabsContent value="history" className="space-y-4 pt-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">勤務履歴</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="flex justify-between items-center border-b pb-2">
                                        <div>
                                          <p className="font-medium">2023/11/01</p>
                                          <p className="text-sm text-muted-foreground">08:00 - 17:00</p>
                                        </div>
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">正常</Badge>
                                      </div>
                                      <div className="flex justify-between items-center border-b pb-2">
                                        <div>
                                          <p className="font-medium">2023/10/31</p>
                                          <p className="text-sm text-muted-foreground">08:15 - 17:00</p>
                                        </div>
                                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">遅刻</Badge>
                                      </div>
                                      <div className="flex justify-between items-center border-b pb-2">
                                        <div>
                                          <p className="font-medium">2023/10/30</p>
                                          <p className="text-sm text-muted-foreground">08:00 - 17:00</p>
                                        </div>
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">正常</Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                            
                            <DialogFooter>
                              {editMode ? (
                                <>
                                  <Button variant="outline" onClick={() => setEditMode(false)}>
                                    キャンセル
                                  </Button>
                                  <Button onClick={() => setEditMode(false)}>
                                    保存
                                  </Button>
                                </>
                              ) : (
                                <Button variant="outline" onClick={() => setEditMode(true)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  編集
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </td>
                  </tr>
                ))}
                
                {filteredDrivers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      配達員が見つかりませんでした
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 