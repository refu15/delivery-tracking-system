"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Send } from "lucide-react"

type Coordinates = {
  latitude: number
  longitude: number
}

type LocationTrackerProps = {
  onLocationUpdate?: (coords: Coordinates) => void
  showMap?: boolean
}

export function LocationTracker({ onLocationUpdate, showMap = true }: LocationTrackerProps) {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // 位置情報を取得する関数
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("お使いのブラウザは位置情報をサポートしていません")
      return
    }

    setLocationError(null)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        setCurrentLocation(coords)
        setLastUpdated(new Date().toLocaleTimeString('ja-JP'))
        
        if (onLocationUpdate) {
          onLocationUpdate(coords)
        }
      },
      (error) => {
        let errorMessage = "位置情報の取得に失敗しました"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "位置情報へのアクセスが拒否されました"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "位置情報が利用できません"
            break
          case error.TIMEOUT:
            errorMessage = "位置情報の取得がタイムアウトしました"
            break
        }
        setLocationError(errorMessage)
      },
      { enableHighAccuracy: true }
    )
  }

  // 位置情報の定期的な追跡を開始/停止
  const toggleTracking = () => {
    if (isTracking) {
      setIsTracking(false)
    } else {
      setIsTracking(true)
      getCurrentLocation()
    }
  }

  // 追跡モードが有効な場合、定期的に位置情報を更新
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isTracking) {
      intervalId = setInterval(() => {
        getCurrentLocation()
      }, 60000) // 1分ごとに更新
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isTracking])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          位置情報
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationError && (
            <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-300">{locationError}</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">現在のステータス:</p>
              <p className="text-sm font-bold">{isTracking ? "追跡中" : "停止中"}</p>
            </div>
            {lastUpdated && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">最終更新:</p>
                <p className="text-sm">{lastUpdated}</p>
              </div>
            )}
          </div>

          {currentLocation && (
            <div className="text-sm space-y-1">
              <p>緯度: {currentLocation.latitude.toFixed(6)}</p>
              <p>経度: {currentLocation.longitude.toFixed(6)}</p>
            </div>
          )}

          {showMap && currentLocation && (
            <div className="h-48 w-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-sm text-muted-foreground">GoogleマップAPIと連携予定</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              variant={isTracking ? "destructive" : "default"}
              onClick={toggleTracking}
            >
              {isTracking ? "追跡停止" : "追跡開始"}
            </Button>
            <Button 
              className="flex-1" 
              variant="outline" 
              onClick={getCurrentLocation}
              disabled={isTracking}
            >
              <Send className="mr-2 h-4 w-4" />
              現在地を送信
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 