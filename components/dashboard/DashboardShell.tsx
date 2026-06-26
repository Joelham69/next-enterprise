"use client"

import { useState } from "react"
import Sidebar from "components/sidebar/Sidebar"
import DashboardLayout from "components/dashboard/DashboardLayout"
import CommandPalette from "components/command-palette/CommandPalette"

export default function DashboardShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? "4rem" : "16rem" }}
      >
        <DashboardLayout />
      </main>
      <CommandPalette />
    </div>
  )
}
