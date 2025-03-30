"use client"

import { useState } from "react"
import { Edit, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditableBreakTimeProps {
  defaultValue: string
  onUpdate?: (value: string) => void
  className?: string
}

export function EditableBreakTime({ 
  defaultValue, 
  onUpdate, 
  className 
}: EditableBreakTimeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [tempValue, setTempValue] = useState(defaultValue)

  const handleEdit = () => {
    setIsEditing(true)
    setTempValue(value)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempValue(value)
  }

  const handleSave = () => {
    setIsEditing(false)
    setValue(tempValue)
    if (onUpdate) onUpdate(tempValue)
  }

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="h-7 text-sm bg-white dark:bg-slate-950"
          placeholder="12:00-13:00"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleSave} 
          className="h-7 w-7 text-green-600"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCancel} 
          className="h-7 w-7 text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center font-medium", className)}>
      <span>{value}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleEdit}
        className="h-6 w-6 ml-1"
      >
        <Edit className="h-3 w-3 text-muted-foreground" />
      </Button>
    </div>
  )
} 