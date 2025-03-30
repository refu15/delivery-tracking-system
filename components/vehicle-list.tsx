"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CarFront, Calendar, AlertCircle, Search, Plus, RotateCw } from "lucide-react"

type Vehicle = {
  id: string
  name: string
  type: "軽トラック" | "2トントラック" | "4トントラック" | "バン" | "その他"
  plate: string
  status: "稼働中" | "空き" | "整備中" | "故障" | "廃車予定"
  inspectionDate: string
  fuelEfficiency: string
  totalMileage: string
  notes?: string
  driver?: string
}

// モックデータ
const initialVehicles: Vehicle[] = [
  {
    id: "V001",
    name: "軽トラック A",
    type: "軽トラック",
    plate: "品川 あ-1234",
    status: "稼働中",
    inspectionDate: "2025-06-15",
    fuelEfficiency: "12.5",
    totalMileage: "45,230",
    driver: "田中 太郎"
  },
  {
    id: "V002",
    name: "2トン B",
    type: "2トントラック",
    plate: "品川 い-5678",
    status: "空き",
    inspectionDate: "2025-04-22",
    fuelEfficiency: "8.3",
    totalMileage: "78,540",
    notes: "左後部ドアの開閉に注意"
  },
  {
    id: "V003",
    name: "4トン C",
    type: "4トントラック",
    plate: "品川 う-9012",
    status: "整備中",
    inspectionDate: "2025-05-10",
    fuelEfficiency: "6.2",
    totalMileage: "120,350",
    notes: "エンジンオイル交換予定"
  },
  {
    id: "V004",
    name: "バン D",
    type: "バン",
    plate: "品川 え-3456",
    status: "稼働中",
    inspectionDate: "2026-01-25",
    fuelEfficiency: "10.1",
    totalMileage: "32,600",
    driver: "鈴木 一郎"
  },
  {
    id: "V005",
    name: "軽トラック E",
    type: "軽トラック",
    plate: "品川 お-7890",
    status: "故障",
    inspectionDate: "2024-12-05",
    fuelEfficiency: "13.0",
    totalMileage: "67,890",
    notes: "エンジン不調のため修理工場へ"
  }
]

const getStatusBadge = (status: Vehicle["status"]) => {
  switch (status) {
    case "稼働中":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">稼働中</Badge>
    case "空き":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">空き</Badge>
    case "整備中":
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">整備中</Badge>
    case "故障":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">故障</Badge>
    case "廃車予定":
      return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">廃車予定</Badge>
    default:
      return <Badge variant="outline">不明</Badge>
  }
}

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Vehicle["status"] | "全て">("全て")
  const [openAddDialog, setOpenAddDialog] = useState(false)
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.driver && vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === "全て" || vehicle.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // 新規車両追加の処理（実際にはAPIリクエストになる）
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    // 新しい車両を追加する処理（ここではモックデータ追加）
    const newVehicle: Vehicle = {
      id: `V00${vehicles.length + 1}`,
      name: "新規車両",
      type: "その他",
      plate: "品川 新-0000",
      status: "空き",
      inspectionDate: new Date().toISOString().split('T')[0],
      fuelEfficiency: "10.0",
      totalMileage: "0",
      notes: "新しく追加された車両"
    }
    
    setVehicles([...vehicles, newVehicle])
    setOpenAddDialog(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="車両名、ナンバー、担当者で検索..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="全て" onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="状態でフィルタ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="全て">全ての状態</SelectItem>
              <SelectItem value="稼働中">稼働中</SelectItem>
              <SelectItem value="空き">空き</SelectItem>
              <SelectItem value="整備中">整備中</SelectItem>
              <SelectItem value="故障">故障</SelectItem>
              <SelectItem value="廃車予定">廃車予定</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              車両追加
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規車両登録</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-name">車両名</Label>
                  <Input id="vehicle-name" placeholder="例: 軽トラック A" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">車両タイプ</Label>
                  <Select defaultValue="軽トラック">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="軽トラック">軽トラック</SelectItem>
                      <SelectItem value="2トントラック">2トントラック</SelectItem>
                      <SelectItem value="4トントラック">4トントラック</SelectItem>
                      <SelectItem value="バン">バン</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-plate">ナンバープレート</Label>
                  <Input id="vehicle-plate" placeholder="例: 品川 あ-1234" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-inspection">車検期限</Label>
                  <Input id="vehicle-inspection" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-notes">備考</Label>
                <Input id="vehicle-notes" placeholder="メモや特記事項" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpenAddDialog(false)}>
                  キャンセル
                </Button>
                <Button type="submit">登録</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/50">
              <CardTitle className="text-md font-medium flex items-center gap-2">
                <CarFront className="h-5 w-5" />
                {vehicle.name}
              </CardTitle>
              {getStatusBadge(vehicle.status)}
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">車両ID</p>
                    <p className="font-medium">{vehicle.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">車両タイプ</p>
                    <p className="font-medium">{vehicle.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ナンバー</p>
                    <p className="font-medium">{vehicle.plate}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-muted-foreground">車検期限</p>
                    <p className="font-medium flex items-center">
                      {new Date(vehicle.inspectionDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                        <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      {new Intl.DateTimeFormat('ja-JP').format(new Date(vehicle.inspectionDate))}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">燃費</p>
                    <p className="font-medium">{vehicle.fuelEfficiency} km/L</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">総走行距離</p>
                    <p className="font-medium">{vehicle.totalMileage} km</p>
                  </div>
                </div>
                
                {vehicle.driver && (
                  <div className="pt-2 text-sm">
                    <p className="text-muted-foreground">現在の担当者</p>
                    <p className="font-medium">{vehicle.driver}</p>
                  </div>
                )}
                
                {vehicle.notes && (
                  <div className="pt-2 text-sm">
                    <p className="text-muted-foreground">備考</p>
                    <p className="font-medium">{vehicle.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    詳細
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <RotateCw className="mr-1 h-3 w-3" />
                    状態変更
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <CarFront className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">車両が見つかりません</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-xs">
            検索条件に一致する車両はありません。別の検索条件をお試しください。
          </p>
        </div>
      )}
    </div>
  )
} 