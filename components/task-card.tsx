"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "@/app/page"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-[#A8E6CF] rounded-lg p-6 cursor-grab active:cursor-grabbing",
        "text-[#2B5A6E] text-center font-medium text-lg",
        "border-2 border-[#7BC9A8]",
        isDragging && "opacity-50",
        isOverlay && "shadow-xl rotate-3"
      )}
    >
      {task.title}
    </div>
  )
}
