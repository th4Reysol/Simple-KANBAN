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
    <div className="bg-[#fff5ee] rounded-3xl p-6 min-h-[400px] border border-gray-200">
      {/* Column Header with Plus Button and Title aligned at bottom */}
      <div className="flex items-end mb-6">
        <button
          onClick={() => onAddTask?.(column.id)}
          className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="flex-1 text-purple-500 text-xl font-semibold underline text-center">
          {column.title}
        </h2>
        {/* Spacer to balance the layout */}
        <div className="w-8"></div>
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
