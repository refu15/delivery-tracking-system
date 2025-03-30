"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleList } from "@/components/vehicle-list"
import { CarFront, CalendarClock, Clock, TrendingUp, AlertCircle } from "lucide-react"
import { useUser } from "@/context/user-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VehiclesPage() {
  const { isAdmin } = useUser()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">車両管理</h2>
          <p className="text-muted-foreground">車両の一覧、状態確認、メンテナンス計画の管理を行います</p>
        </div>
      </div>

      {!isAdmin && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            配達員は車両一覧のみ閲覧できます。メンテナンス情報や詳細設定は管理者にお問い合わせください。
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <CarFront className="h-4 w-4" />
            車両一覧
          </TabsTrigger>
          {isAdmin && (
            <>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                メンテナンス
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                運行分析
              </TabsTrigger>
            </>
          )}
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <VehicleList />
        </TabsContent>
        
        {isAdmin && (
          <>
            <TabsContent value="maintenance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">次回車検予定</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">軽トラック E</span>
                        <span className="font-bold">2024年12月05日</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">2トン B</span>
                        <span className="font-bold">2025年04月22日</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">4トン C</span>
                        <span className="font-bold">2025年05月10日</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">燃費効率</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">最高</span>
                        <span className="font-bold">軽トラック E (13.0 km/L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">最低</span>
                        <span className="font-bold">4トン C (6.2 km/L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">平均</span>
                        <span className="font-bold">10.0 km/L</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">車両状態サマリー</CardTitle>
                    <CarFront className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">稼働中</span>
                        <span className="font-bold">2台</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">空き</span>
                        <span className="font-bold">1台</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">整備中/故障</span>
                        <span className="font-bold">2台</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>メンテナンススケジュール</CardTitle>
                  <CardDescription>今後予定されている整備・点検のスケジュール</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2 p-4 font-medium border-b">
                      <div>日付</div>
                      <div>車両</div>
                      <div>種類</div>
                      <div>担当</div>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2 p-4 border-b">
                      <div>2023/11/05</div>
                      <div>4トン C</div>
                      <div>エンジンオイル交換</div>
                      <div>メンテナンス部</div>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2 p-4 border-b">
                      <div>2023/11/12</div>
                      <div>軽トラック E</div>
                      <div>エンジン点検</div>
                      <div>指定工場</div>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2 p-4">
                      <div>2023/11/20</div>
                      <div>バン D</div>
                      <div>定期点検</div>
                      <div>メンテナンス部</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>運行分析</CardTitle>
                  <CardDescription>車両ごとの稼働時間、走行距離、燃費などの分析</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">将来的に分析グラフを表示予定</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
} 