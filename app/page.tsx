"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { KanbanColumn } from "@/components/kanban-column"
import { TaskCard } from "@/components/task-card"

export type Task = {
  id: string
  title: string
}

export type Column = {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: "ready",
    title: "Ready",
    tasks: [
      { id: "task-1", title: "Task Card 1" },
      { id: "task-2", title: "Task Card 2" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [{ id: "task-3", title: "Task Card 1" }],
  },
  {
    id: "complete",
    title: "Complete",
    tasks: [{ id: "task-4", title: "Task Card 1" }],
  },
]

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const findColumnByTaskId = (taskId: string) => {
    return columns.find((column) =>
      column.tasks.some((task) => task.id === taskId)
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeColumn = findColumnByTaskId(active.id as string)
    if (activeColumn) {
      const task = activeColumn.tasks.find((t) => t.id === active.id)
      if (task) {
        setActiveTask(task)
      }
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeColumn = findColumnByTaskId(activeId)
    const overColumn = findColumnByTaskId(overId) || columns.find((c) => c.id === overId)

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return

    setColumns((prev) => {
      const activeTask = activeColumn.tasks.find((t) => t.id === activeId)
      if (!activeTask) return prev

      return prev.map((column) => {
        if (column.id === activeColumn.id) {
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.id !== activeId),
          }
        }
        if (column.id === overColumn.id) {
          const overTaskIndex = column.tasks.findIndex((t) => t.id === overId)
          const newTasks = [...column.tasks]
          if (overTaskIndex >= 0) {
            newTasks.splice(overTaskIndex, 0, activeTask)
          } else {
            newTasks.push(activeTask)
          }
          return {
            ...column,
            tasks: newTasks,
          }
        }
        return column
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeColumn = findColumnByTaskId(activeId)
    if (!activeColumn) return

    const activeIndex = activeColumn.tasks.findIndex((t) => t.id === activeId)
    const overIndex = activeColumn.tasks.findIndex((t) => t.id === overId)

    if (activeIndex !== -1 && overIndex !== -1) {
      setColumns((prev) =>
        prev.map((column) => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              tasks: arrayMove(column.tasks, activeIndex, overIndex),
            }
          }
          return column
        })
      )
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="bg-[#B8D4E8] py-4 px-8 mb-8">
        <h1 className="text-4xl font-bold text-center text-black">Kanban Board</h1>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={column.tasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn column={column} />
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
