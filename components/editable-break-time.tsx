"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X } from "lucide-react"

type EditableBreakTimeProps = {
  defaultStartTime?: string
  defaultEndTime?: string
  isEditable?: boolean
  onSave?: (startTime: string, endTime: string) => void
}

export function EditableBreakTime({
  defaultStartTime = "12:00",
  defaultEndTime = "13:00",
  isEditable = false,
  onSave
}: EditableBreakTimeProps) {
  const [startTime, setStartTime] = useState(defaultStartTime)
  const [endTime, setEndTime] = useState(defaultEndTime)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(startTime, endTime)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setStartTime(defaultStartTime)
    setEndTime(defaultEndTime)
    setIsEditing(false)
  }

  if (!isEditable) {
    return (
      <span className="font-bold">{startTime} - {endTime}</span>
    )
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-24 h-7 text-xs"
        />
        <span>-</span>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-24 h-7 text-xs"
        />
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleSave}>
          <Save className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCancel}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <span className="font-bold">{startTime} - {endTime}</span>
      {isEditable && (
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => setIsEditing(true)}>
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
} 