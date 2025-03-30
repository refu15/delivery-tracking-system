"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Package, Truck, Clock } from "lucide-react"
import { DeliveryDetail } from "@/components/delivery-detail"

type DeliveryStatus = "pending" | "in_progress" | "completed"

type Delivery = {
  id: string
  address: string
  customer: string
  scheduledTime: string
  status: DeliveryStatus
  items: number
  weight: string
}

const deliveries: Delivery[] = [
  {
    id: "DEL-001",
    address: "東京都新宿区西新宿1-1-1",
    customer: "株式会社ABC",
    scheduledTime: "10:00 - 12:00",
    status: "pending",
    items: 3,
    weight: "5kg",
  },
  {
    id: "DEL-002",
    address: "東京都渋谷区渋谷2-2-2",
    customer: "株式会社XYZ",
    scheduledTime: "13:00 - 15:00",
    status: "in_progress",
    items: 1,
    weight: "10kg",
  },
  {
    id: "DEL-003",
    address: "東京都品川区大崎3-3-3",
    customer: "株式会社123",
    scheduledTime: "15:30 - 17:00",
    status: "completed",
    items: 5,
    weight: "8kg",
  },
  {
    id: "DEL-004",
    address: "東京都目黒区目黒4-4-4",
    customer: "株式会社456",
    scheduledTime: "09:00 - 11:00",
    status: "pending",
    items: 2,
    weight: "3kg",
  },
]

const getStatusBadge = (status: DeliveryStatus) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          未着手
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          配送中
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          完了
        </Badge>
      )
    default:
      return <Badge variant="outline">不明</Badge>
  }
}

export function DeliveryList() {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const handleOpenDetail = (id: string) => {
    setSelectedDeliveryId(id)
    setDetailDialogOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailDialogOpen(false)
  }

  return (
    <>
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                      <h3 className="text-lg font-semibold">{delivery.id}</h3>
                      {getStatusBadge(delivery.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{delivery.scheduledTime}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">{delivery.customer}</div>
                        <div className="text-sm text-muted-foreground">{delivery.address}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.items}個</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.weight}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-end items-center gap-2 p-6 bg-muted/50">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDetail(delivery.id)}>
                    詳細
                  </Button>
                  {delivery.status === "pending" && <Button size="sm">配送開始</Button>}
                  {delivery.status === "in_progress" && <Button size="sm">配送完了</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeliveryDetail 
        deliveryId={selectedDeliveryId || undefined}
        isOpen={detailDialogOpen}
        onClose={handleCloseDetail}
      />
    </>
  )
}

