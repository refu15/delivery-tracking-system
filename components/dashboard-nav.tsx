"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, Home, Truck, FileText, Bell, CarFront } from "lucide-react"

const navItems = [
  {
    title: "ホーム",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "シフト表",
    href: "/dashboard/shifts",
    icon: Calendar,
  },
  {
    title: "配送案件",
    href: "/dashboard/deliveries",
    icon: Truck,
  },
  {
    title: "勤怠管理",
    href: "/dashboard/attendance",
    icon: FileText,
  },
  {
    title: "車両管理",
    href: "/dashboard/vehicles",
    icon: CarFront,
  },
  {
    title: "お知らせ",
    href: "/dashboard/notifications",
    icon: Bell,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}

