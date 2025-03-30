"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/user-context"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUserRole } = useUser()
  const [activeTab, setActiveTab] = useState<"delivery" | "admin">("delivery")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // ユーザーロールを設定
    setUserRole(activeTab === "admin" ? "admin" : "driver")

    // 実際の実装ではSupabaseなどで認証処理
    // ここではモック処理として少し待ってからリダイレクト
    setTimeout(() => {
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <Tabs 
        defaultValue="delivery" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value as "delivery" | "admin")}
      >
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="delivery">配達員</TabsTrigger>
            <TabsTrigger value="admin">管理者</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="delivery">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="admin">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">管理者ID</Label>
                <Input id="admin-email" type="email" placeholder="admin@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">パスワード</Label>
                <Input id="admin-password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "ログイン中..." : "管理者ログイン"}
              </Button>
            </form>
          </TabsContent>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">© 2025 運送業務基幹システム</p>
        </CardFooter>
      </Tabs>
    </Card>
  )
}

