"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type UserRole = "admin" | "driver"

type UserContextType = {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  isAdmin: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("driver")

  // localStorageからユーザーロールを取得（クライアントサイドのみ）
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole | null
    if (storedRole && (storedRole === "admin" || storedRole === "driver")) {
      setUserRole(storedRole)
    }
  }, [])

  // ユーザーロールが変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("userRole", userRole)
  }, [userRole])

  const isAdmin = userRole === "admin"

  return (
    <UserContext.Provider value={{ userRole, setUserRole, isAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(): UserContextType {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 