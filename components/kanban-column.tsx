"use client"

import { useDroppable } from "@dnd-kit/core"
import { TaskCard } from "./task-card"
import type { Column } from "@/app/page"

interface KanbanColumnProps {
  column: Column
  onRenameTask?: (taskId: string, newTitle: string) => void
}

export function KanbanColumn({ column, onRenameTask }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <div className="bg-[#2B5A6E] rounded-3xl p-6 min-h-[400px]">
      {/* Column Title */}
      <h2 className="text-purple-500 text-xl font-semibold text-center mb-6 underline">
        {column.title}
      </h2>

      {/* Tasks Container */}
      <div ref={setNodeRef} className="flex flex-col gap-4 min-h-[300px]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onRename={onRenameTask} />
        ))}
      </div>
    </div>
  )
}
