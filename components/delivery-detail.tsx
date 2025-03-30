"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Package, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Calendar, 
  Clock,
  ClipboardCheck,
  MessageSquare,
  History
} from "lucide-react"

type DeliveryStatus = "pending" | "in_progress" | "completed" | "failed" | "cancelled"

type DeliveryDetails = {
  id: string
  address: string
  customer: string
  contactName: string
  contactPhone: string
  scheduledDate: string
  scheduledTime: string
  status: DeliveryStatus
  items: {
    id: string
    name: string
    quantity: number
    weight: string
    dimensions: string
    fragile: boolean
  }[]
  notes?: string
  vehicle?: string
  driver?: string
  history: {
    time: string
    status: DeliveryStatus
    note?: string
  }[]
}

const mockDelivery: DeliveryDetails = {
  id: "DEL-001",
  address: "東京都新宿区西新宿1-1-1 ABCビル 5階",
  customer: "株式会社ABC",
  contactName: "田中 太郎",
  contactPhone: "03-1234-5678",
  scheduledDate: "2023-11-05",
  scheduledTime: "10:00 - 12:00",
  status: "pending",
  items: [
    {
      id: "ITEM-001",
      name: "パソコン",
      quantity: 2,
      weight: "5kg",
      dimensions: "50cm x 30cm x 10cm",
      fragile: true
    },
    {
      id: "ITEM-002",
      name: "プリンター",
      quantity: 1,
      weight: "8kg",
      dimensions: "40cm x 35cm x 20cm",
      fragile: true
    }
  ],
  notes: "受付で配送物の到着を伝えてください。",
  vehicle: "軽トラック A",
  driver: "佐藤 隆",
  history: [
    {
      time: "2023-11-01 09:15",
      status: "pending",
      note: "案件登録"
    }
  ]
}

const getStatusBadge = (status: DeliveryStatus) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          未着手
        </Badge>
      )
    case "in_progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          配送中
        </Badge>
      )
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          完了
        </Badge>
      )
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          配達失敗
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          キャンセル
        </Badge>
      )
    default:
      return <Badge variant="outline">不明</Badge>
  }
}

type DeliveryDetailProps = {
  deliveryId?: string
  isOpen: boolean
  onClose: () => void
}

export function DeliveryDetail({ deliveryId, isOpen, onClose }: DeliveryDetailProps) {
  const [delivery, setDelivery] = useState<DeliveryDetails>(mockDelivery)
  const [activeTab, setActiveTab] = useState("details")
  const [isEditing, setIsEditing] = useState(false)
  
  // 実際のアプリでは、deliveryIdに基づいてAPIからデータを取得
  
  // 配送ステータスを更新する関数（実際はAPIリクエスト）
  const updateStatus = (newStatus: DeliveryStatus) => {
    const now = new Date().toLocaleString('ja-JP')
    
    setDelivery({
      ...delivery,
      status: newStatus,
      history: [
        {
          time: now,
          status: newStatus,
          note: `ステータスを「${getStatusLabel(newStatus)}」に変更`
        },
        ...delivery.history
      ]
    })
  }
  
  const getStatusLabel = (status: DeliveryStatus): string => {
    const labels = {
      pending: "未着手",
      in_progress: "配送中",
      completed: "完了",
      failed: "配達失敗",
      cancelled: "キャンセル"
    }
    return labels[status]
  }
  
  const handleSaveChanges = () => {
    // 編集内容を保存する処理（実際はAPIリクエスト）
    setIsEditing(false)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex-1">
              配送案件：{delivery.id} {getStatusBadge(delivery.status)}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">
              <Package className="mr-2 h-4 w-4" />
              詳細情報
            </TabsTrigger>
            <TabsTrigger value="tracking">
              <Truck className="mr-2 h-4 w-4" />
              追跡情報
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" />
              履歴
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer">お客様名</Label>
                    <Input id="customer" defaultValue={delivery.customer} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">担当者名</Label>
                    <Input id="contact-name" defaultValue={delivery.contactName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">電話番号</Label>
                    <Input id="contact-phone" defaultValue={delivery.contactPhone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">住所</Label>
                    <Input id="address" defaultValue={delivery.address} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-date">配送予定日</Label>
                    <Input id="scheduled-date" type="date" defaultValue={delivery.scheduledDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduled-time">配送時間帯</Label>
                    <Input id="scheduled-time" defaultValue={delivery.scheduledTime} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">車両</Label>
                    <Select defaultValue={delivery.vehicle}>
                      <SelectTrigger>
                        <SelectValue placeholder="車両を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="軽トラック A">軽トラック A</SelectItem>
                        <SelectItem value="2トン B">2トン B</SelectItem>
                        <SelectItem value="バン D">バン D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver">ドライバー</Label>
                    <Select defaultValue={delivery.driver}>
                      <SelectTrigger>
                        <SelectValue placeholder="ドライバーを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="佐藤 隆">佐藤 隆</SelectItem>
                        <SelectItem value="田中 太郎">田中 太郎</SelectItem>
                        <SelectItem value="鈴木 一郎">鈴木 一郎</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">備考</Label>
                  <Textarea id="notes" defaultValue={delivery.notes} />
                </div>
                
                <h3 className="font-medium mt-4">配送アイテム</h3>
                {delivery.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 gap-2 sm:grid-cols-2 border rounded-md p-3">
                    <div className="space-y-2">
                      <Label htmlFor={`item-name-${index}`}>品名</Label>
                      <Input id={`item-name-${index}`} defaultValue={item.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-quantity-${index}`}>数量</Label>
                      <Input 
                        id={`item-quantity-${index}`} 
                        type="number" 
                        defaultValue={item.quantity.toString()} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-weight-${index}`}>重量</Label>
                      <Input id={`item-weight-${index}`} defaultValue={item.weight} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-dimensions-${index}`}>サイズ</Label>
                      <Input id={`item-dimensions-${index}`} defaultValue={item.dimensions} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        顧客情報
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">お客様名</p>
                        <p className="font-medium">{delivery.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">担当者</p>
                        <p className="font-medium">{delivery.contactName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{delivery.contactPhone}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="font-medium">{delivery.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        配送情報
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">配送予定日</p>
                          <p className="font-medium">
                            {new Date(delivery.scheduledDate).toLocaleDateString('ja-JP')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">配送時間帯</p>
                          <p className="font-medium">{delivery.scheduledTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">車両</p>
                          <p className="font-medium">{delivery.vehicle || "未割当"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">ドライバー</p>
                          <p className="font-medium">{delivery.driver || "未割当"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      配送アイテム
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md divide-y">
                      <div className="grid grid-cols-5 p-3 font-medium">
                        <div>品名</div>
                        <div>数量</div>
                        <div>重量</div>
                        <div>サイズ</div>
                        <div>取扱注意</div>
                      </div>
                      {delivery.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 p-3">
                          <div>{item.name}</div>
                          <div>{item.quantity}個</div>
                          <div>{item.weight}</div>
                          <div>{item.dimensions}</div>
                          <div>{item.fragile ? "あり" : "なし"}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {delivery.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        備考
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{delivery.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>配送状況</CardTitle>
                <CardDescription>現在のステータス: {getStatusLabel(delivery.status)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button 
                    variant={delivery.status === "pending" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateStatus("pending")}
                    disabled={delivery.status === "completed" || delivery.status === "cancelled"}
                  >
                    未着手
                  </Button>
                  <Button 
                    variant={delivery.status === "in_progress" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateStatus("in_progress")}
                    disabled={delivery.status === "completed" || delivery.status === "cancelled"}
                  >
                    配送中
                  </Button>
                  <Button 
                    variant={delivery.status === "completed" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateStatus("completed")}
                    disabled={delivery.status === "cancelled"}
                  >
                    完了
                  </Button>
                  <Button 
                    variant={delivery.status === "failed" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateStatus("failed")}
                    disabled={delivery.status === "completed" || delivery.status === "cancelled"}
                  >
                    配達失敗
                  </Button>
                  <Button 
                    variant={delivery.status === "cancelled" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateStatus("cancelled")}
                    disabled={delivery.status === "completed"}
                  >
                    キャンセル
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>配送追跡情報</CardTitle>
                <CardDescription>配送の進捗状況を追跡します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 pl-4 ml-2 space-y-2">
                  {delivery.status !== "pending" && (
                    <>
                      <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px]"></div>
                      <div className="mb-4">
                        <p className="font-medium">出発</p>
                        <p className="text-sm text-muted-foreground">
                          出発時刻: {new Date().toLocaleTimeString('ja-JP')}
                        </p>
                      </div>
                    </>
                  )}
                  
                  {delivery.status === "in_progress" && (
                    <>
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-24"></div>
                      <div className="mb-4">
                        <p className="font-medium">配送中</p>
                        <p className="text-sm text-muted-foreground">
                          現在の位置: 新宿区付近
                        </p>
                      </div>
                    </>
                  )}
                  
                  {delivery.status === "completed" && (
                    <>
                      <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-48"></div>
                      <div>
                        <p className="font-medium">配達完了</p>
                        <p className="text-sm text-muted-foreground">
                          完了時刻: {new Date().toLocaleTimeString('ja-JP')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="h-[200px] w-full bg-muted mt-6 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">地図が表示される予定です</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>ステータス履歴</CardTitle>
                <CardDescription>配送案件のステータス変更履歴</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {delivery.history.map((entry, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ClipboardCheck className="h-4 w-4 text-primary" />
                        </div>
                        {index < delivery.history.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{entry.time}</p>
                          {getStatusBadge(entry.status)}
                        </div>
                        {entry.note && <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          {activeTab === "details" && (
            isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleSaveChanges}>保存</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>編集</Button>
            )
          )}
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 