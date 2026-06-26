"use client"

import { useState } from "react"
import DashboardCard from "./DashboardCard"

const GRID_LAYOUTS = {
  default: [
    ["kpi", "agents"],
    ["workflows", "projects"],
    ["infrastructure", "business-intelligence"]
  ],
  compact: [
    ["kpi"],
    ["agents"],
    ["workflows"],
    ["projects"],
    ["infrastructure"],
    ["business-intelligence"]
  ],
  analytics: [
    ["kpi", "business-intelligence"],
    ["agents", "infrastructure"],
    ["workflows", "projects"]
  ],
  developer: [
    ["kpi", "workflows"],
    ["agents", "projects"],
    ["infrastructure", "business-intelligence"]
  ]
}

export default function DashboardGrid({ 
  widgets, 
  onToggle, 
  layout 
}: { 
  widgets: Array<{ id: string; type: string; collapsed: boolean }>,
  onToggle: (id: string) => void,
  layout: string
}) {
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)

  const getGridTemplateColumns = () => {
    switch(layout) {
      case "default":
        return "repeat(2, minmax(0, 1fr))"
      case "compact":
        return "minmax(0, 1fr)"
      case "analytics":
        return "repeat(2, minmax(0, 1fr))"
      case "developer":
        return "repeat(2, minmax(0, 1fr))"
      default:
        return "repeat(2, minmax(0, 1fr))"
    }
  }

  const getGridTemplateRows = () => {
    switch(layout) {
      case "default":
      case "analytics":
      case "developer":
        return "repeat(3, min-content)"
      case "compact":
        return "repeat(6, min-content)"
      default:
        return "repeat(3, min-content)"
    }
  }

  const gridTemplate = `${getGridTemplateRows()} / ${getGridTemplateColumns()}`
  
  return (
    <div 
      className="grid gap-4"
      style={{ gridTemplate }}
    >
      {GRID_LAYOUTS[layout as keyof typeof GRID_LAYOUTS].map((row, rowIndex) => (
        row.map((widgetId) => {
          const widget = widgets.find(w => w.id === widgetId)
          if (!widget) return null
          
          return (
            <DashboardCard 
              key={widgetId} 
              id={widgetId} 
              type={widget.type} 
              collapsed={widget.collapsed}
              onToggle={onToggle}
            />
          )
        })
      ))}
    </div>
  )
}