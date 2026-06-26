"use client"

import { useState } from "react"
import DashboardCard from "./DashboardCard"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

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
  const [gridItems, setGridItems] = useState(widgets)

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

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(gridItems)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setGridItems(items)
  }

  const orderedWidgets = gridItems.map(widget => widget.id)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dashboard" direction="horizontal">
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid gap-4"
            style={{ gridTemplate }}
          >
            {GRID_LAYOUTS[layout as keyof typeof GRID_LAYOUTS].map((row, rowIndex) => (
              row.map((widgetId, colIndex) => {
                const widget = widgets.find(w => w.id === widgetId)
                if (!widget) return null
                
                const index = orderedWidgets.indexOf(widgetId)
                
                return (
                  <Draggable key={widgetId} draggableId={widgetId} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DashboardCard 
                          id={widgetId} 
                          type={widget.type} 
                          collapsed={widget.collapsed}
                          onToggle={onToggle}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}