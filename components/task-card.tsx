"use client"

import { useState, useRef, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "@/app/page"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
  onRename?: (taskId: string, newTitle: string) => void
}

export function TaskCard({ task, isOverlay, onRename }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
    setEditValue(task.title)
  }

  const handleSave = () => {
    if (editValue.trim() && onRename) {
      onRename(task.id, editValue.trim())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setEditValue(task.title)
      setIsEditing(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEditing ? {} : listeners)}
      className={cn(
        "bg-[#A8E6CF] rounded-lg p-4 cursor-grab active:cursor-grabbing",
        "text-[#2B5A6E] font-medium text-lg",
        "border-2 border-[#7BC9A8]",
        "flex items-center gap-3",
        isDragging && "opacity-50",
        isOverlay && "shadow-xl rotate-3",
        isEditing && "cursor-default"
      )}
    >
      <button
        onClick={handleEditClick}
        className="p-1.5 rounded hover:bg-[#8BD4B8] transition-colors shrink-0"
        aria-label="Edit task name"
      >
        <Pencil className="w-4 h-4 text-[#2B5A6E]" />
      </button>
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white px-2 py-1 rounded border border-[#7BC9A8] text-[#2B5A6E] outline-none focus:ring-2 focus:ring-[#2B5A6E]"
        />
      ) : (
        <span className="flex-1 text-center">{task.title}</span>
      )}
    </div>
  )
}
