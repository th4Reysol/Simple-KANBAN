"use client"

import { useState, useRef, useEffect } from "react"

interface EditTaskModalProps {
  isOpen: boolean
  taskTitle: string
  onSave: (newTitle: string) => void
  onCancel: () => void
}

export function EditTaskModal({ isOpen, taskTitle, onSave, onCancel }: EditTaskModalProps) {
  const [value, setValue] = useState(taskTitle)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen) {
      setValue(taskTitle)
      setTimeout(() => {
        textareaRef.current?.focus()
        textareaRef.current?.select()
      }, 0)
    }
  }, [isOpen, taskTitle])

  if (!isOpen) return null

  const handleOk = () => {
    if (value.trim()) {
      onSave(value.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div 
        className="bg-[#A8E6CF] rounded-lg p-6 w-[400px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Text Area */}
        <div className="bg-white border-2 border-[#7BC9A8] rounded-lg p-4 mb-6">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-24 resize-none text-[#7B68A8] font-semibold text-lg text-center outline-none"
            placeholder="Enter task name..."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleOk}
            className="bg-[#2B5A6E] text-white font-medium px-8 py-3 rounded-full hover:bg-[#234a5c] transition-colors"
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="bg-[#2B5A6E] text-white font-medium px-8 py-3 rounded-full hover:bg-[#234a5c] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
