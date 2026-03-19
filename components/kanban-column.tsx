"use client"

import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"
import { TaskCard } from "./task-card"
import type { Column, Task } from "@/app/page"

interface KanbanColumnProps {
  column: Column
  onRenameTask?: (taskId: string, newTitle: string) => void
  onEditClick?: (task: Task) => void
  onAddTask?: (columnId: string) => void
  onDeleteTask?: (taskId: string) => void
}

export function KanbanColumn({ column, onRenameTask, onEditClick, onAddTask, onDeleteTask }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <div className="bg-[#2B5A6E] rounded-3xl p-6 min-h-[400px]">
      {/* Column Header with Plus Button and Title */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => onAddTask?.(column.id)}
          className="w-8 h-8 border-2 border-[#B8D4E8] rounded flex items-center justify-center hover:bg-[#3a6d82] transition-colors"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="w-5 h-5 text-[#B8D4E8]" />
        </button>
        <h2 className="text-purple-500 text-xl font-semibold underline">
          {column.title}
        </h2>
      </div>

      {/* Tasks Container */}
      <div ref={setNodeRef} className="flex flex-col gap-4 min-h-[300px]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onRename={onRenameTask} onEditClick={onEditClick} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  )
}
