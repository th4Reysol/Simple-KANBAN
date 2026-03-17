"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "@/app/page"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"
import { EditTaskModal } from "./edit-task-modal"

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
  onRename?: (taskId: string, newTitle: string) => void
}

export function TaskCard({ task, isOverlay, onRename }: TaskCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    setIsModalOpen(true)
  }

  const handleSave = (newTitle: string) => {
    if (onRename) {
      onRename(task.id, newTitle)
    }
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "bg-[#A8E6CF] rounded-lg p-4 cursor-grab active:cursor-grabbing",
          "text-[#2B5A6E] font-medium text-lg",
          "border-2 border-[#7BC9A8]",
          "flex items-center gap-3",
          isDragging && "opacity-50",
          isOverlay && "shadow-xl rotate-3"
        )}
      >
        <button
          onClick={handleEditClick}
          className="p-1.5 rounded hover:bg-[#8BD4B8] transition-colors shrink-0"
          aria-label="Edit task name"
        >
          <Pencil className="w-4 h-4 text-[#2B5A6E]" />
        </button>
        
        <span className="flex-1 text-center">{task.title}</span>
      </div>

      <EditTaskModal
        isOpen={isModalOpen}
        taskTitle={task.title}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}
