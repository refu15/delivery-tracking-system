"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // 初期値を設定
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    // リスナーを設定
    const listener = () => {
      setMatches(media.matches)
    }

    // 変更をリッスン
    window.addEventListener("resize", listener)
    
    return () => {
      window.removeEventListener("resize", listener)
    }
  }, [matches, query])

  return matches
} 