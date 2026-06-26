"use client"

import { useState } from "react"
import DashboardHeader from "./DashboardHeader"
import DashboardGrid from "./DashboardGrid"

export default function DashboardLayout() {
  const [layout, setLayout] = useState("default")
  const [widgets, setWidgets] = useState([
    { id: "kpi", type: "kpi", collapsed: false },
    { id: "agents", type: "agents", collapsed: false },
    { id: "workflows", type: "workflows", collapsed: false },
    { id: "projects", type: "projects", collapsed: false },
    { id: "infrastructure", type: "infrastructure", collapsed: false },
    { id: "business-intelligence", type: "business-intelligence", collapsed: false },
  ])

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, collapsed: !widget.collapsed } : widget
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader onLayoutChange={setLayout} />
      
      <main className="p-4 lg:p-6">
        <DashboardGrid 
          widgets={widgets} 
          onToggle={toggleWidget}
          layout={layout}
        />
      </main>
    </div>
  )
}