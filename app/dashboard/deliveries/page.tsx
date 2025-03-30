"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DeliveryList } from "@/components/delivery-list"
import { 
  Search, 
  Filter, 
  Plus, 
  FileUp, 
  FileDown, 
  Calendar,
  RefreshCw
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function DeliveriesPage() {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleImportCSV = (e: React.FormEvent) => {
    e.preventDefault();
    // CSV 取り込み処理（実際にはAPIリクエスト）
    setImportDialogOpen(false);
  };

  const handleCreateDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    // 新規配送案件作成処理（実際にはAPIリクエスト）
    setCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">配送案件</h2>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規案件
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規配送案件登録</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateDelivery} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer">顧客名</Label>
                    <Input id="customer" placeholder="例: 株式会社ABC" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">担当者名</Label>
                    <Input id="contact" placeholder="例: 田中 太郎" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号</Label>
                    <Input id="phone" placeholder="例: 03-1234-5678" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-date">配送日</Label>
                    <Input id="delivery-date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-time">配送時間帯</Label>
                    <Input id="delivery-time" placeholder="例: 10:00 - 12:00" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="items">荷物数</Label>
                    <Input id="items" type="number" placeholder="例: 3" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">配送先住所</Label>
                  <Input id="address" placeholder="例: 東京都新宿区西新宿1-1-1" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">備考</Label>
                  <Textarea id="notes" placeholder="配送に関する特記事項" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button type="submit">登録</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                CSVインポート
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>CSVデータインポート</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleImportCSV} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csv-file">CSVファイル</Label>
                  <Input id="csv-file" type="file" accept=".csv" required />
                </div>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">CSVフォーマット</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    顧客名,担当者,電話番号,配送先住所,配送日,配送時間,荷物数,重量,備考
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ※1行目はヘッダー行として処理されます
                  </p>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setImportDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button type="submit">インポート</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            CSVエクスポート
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>案件検索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="ID、顧客名で検索" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">ステータス</option>
                <option value="pending">未着手</option>
                <option value="in_progress">配送中</option>
                <option value="completed">完了</option>
                <option value="failed">配達失敗</option>
                <option value="cancelled">キャンセル</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input type="date" placeholder="配送日" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1">
                <Search className="mr-2 h-4 w-4" />
                検索
              </Button>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeliveryList />
    </div>
  )
}

