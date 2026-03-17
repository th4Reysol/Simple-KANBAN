"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "@/app/page"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
  onRename?: (taskId: string, newTitle: string) => void
  onEditClick?: (task: Task) => void
}

export function TaskCard({ task, isOverlay, onEditClick }: TaskCardProps) {
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onEditClick) {
      onEditClick(task)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-[#A8E6CF] rounded-lg p-4",
        "text-[#2B5A6E] font-medium text-lg",
        "border-2 border-[#7BC9A8]",
        "flex items-center gap-3",
        isDragging && "opacity-50",
        isOverlay && "shadow-xl rotate-3"
      )}
    >
      {/* Draggable area - centered text */}
      <div 
        {...attributes}
        {...listeners}
        className="flex-1 text-center cursor-grab active:cursor-grabbing"
      >
        {task.title}
      </div>
      
      {/* Edit button on the right - NOT draggable */}
      <button
        onClick={handleEditClick}
        onPointerDown={(e) => e.stopPropagation()}
        className="p-1.5 rounded hover:bg-[#8BD4B8] transition-colors shrink-0"
        aria-label="Edit task name"
      >
        <Pencil className="w-4 h-4 text-[#2B5A6E]" />
      </button>
    </div>
  )
}
