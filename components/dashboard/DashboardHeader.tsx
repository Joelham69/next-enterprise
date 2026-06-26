"use client"

import { useState } from "react"
import UserMenu from "components/ui/UserMenu"

export default function DashboardHeader({ onLayoutChange }: { onLayoutChange: (layout: string) => void }) {
  const [activeLayout, setActiveLayout] = useState("default")

  const layouts = [
    { id: "default", name: "Default", icon: "⌘" },
    { id: "compact", name: "Compact", icon: "⚡" },
    { id: "analytics", name: "Analytics", icon: "📊" },
    { id: "developer", name: "Developer", icon: "👨‍💻" }
  ]

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI OS</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => {
                  setActiveLayout(layout.id)
                  onLayoutChange(layout.id)
                }}
                className={`text-sm font-medium transition-colors ${activeLayout === layout.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                {layout.icon} {layout.name}
              </button>
            ))}
          </div>
          
          <UserMenu />
        </div>
      </div>
    </header>
  )
}