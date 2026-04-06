"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "@/app/page"
import { cn } from "@/lib/utils"
import { Pencil, Trash2 } from "lucide-react"

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
  onRename?: (taskId: string, newTitle: string) => void
  onEditClick?: (task: Task) => void
  onDelete?: (taskId: string) => void
  onUpdateAssignee?: (taskId: string, newAssignee: string) => void
}

export function TaskCard({ task, isOverlay, onEditClick, onDelete, onUpdateAssignee }: TaskCardProps) {
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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onDelete) {
      onDelete(task.id)
    }
  }

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdateAssignee) {
      onUpdateAssignee(task.id, e.target.value)
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
        "flex flex-col gap-3",
        isDragging && "opacity-50",
        isOverlay && "shadow-xl rotate-3"
      )}
    >
      {/* Top row with task title and action buttons */}
      <div className="flex items-center gap-3">
        {/* Draggable area - centered text with word wrap */}
        <div 
          {...attributes}
          {...listeners}
          className="flex-1 text-center cursor-grab active:cursor-grabbing min-w-0 break-words overflow-hidden"
        >
          {task.title}
        </div>
        
        {/* Edit button - NOT draggable */}
        <button
          onClick={handleEditClick}
          onPointerDown={(e) => e.stopPropagation()}
          className="p-1.5 rounded hover:bg-[#8BD4B8] transition-colors shrink-0"
          aria-label="Edit task name"
        >
          <Pencil className="w-4 h-4 text-[#2B5A6E]" />
        </button>

        {/* Delete button - NOT draggable */}
        <button
          onClick={handleDeleteClick}
          onPointerDown={(e) => e.stopPropagation()}
          className="p-1.5 rounded hover:bg-[#e57373] transition-colors shrink-0"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4 text-[#2B5A6E]" />
        </button>
      </div>

      {/* Person-in-charge input */}
      <div 
        className="flex flex-col gap-1"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <label 
          htmlFor={`assignee-${task.id}`}
          className="text-xs text-[#2B5A6E]/70 font-normal"
        >
          Person-in-charge
        </label>
        <input
          id={`assignee-${task.id}`}
          type="text"
          value={task.assignee}
          onChange={handleAssigneeChange}
          placeholder="Enter name..."
          className="w-full px-2 py-1.5 text-sm bg-white/60 border border-[#7BC9A8] rounded focus:outline-none focus:ring-2 focus:ring-[#5BA890] focus:border-transparent placeholder:text-[#2B5A6E]/40"
        />
      </div>
    </div>
  )
}
