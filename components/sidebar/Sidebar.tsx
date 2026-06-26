"use client"

import { useState } from "react"
import Link from "next/link"
import { RiDashboardLine, RiProjectorFill, RiBarChartLine, RiFileList2Line, RiGroupLine, RiRobot2Line, RiSettings3Line, RiExternalLinkLine } from "react-icons/ri"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: RiDashboardLine, href: "/dashboard" },
  { id: "projects", label: "Projects", icon: RiProjectorFill, href: "/projects" },
  { id: "analytics", label: "Analytics", icon: RiBarChartLine, href: "/analytics" },
  { id: "reports", label: "Reports", icon: RiFileList2Line, href: "/reports" },
  { id: "files", label: "Files", icon: RiFileList2Line, href: "/files" },
  { id: "team", label: "Team", icon: RiGroupLine, href: "/team" },
  { id: "ai-agents", label: "AI Agents", icon: RiRobot2Line, href: "/ai-agents" },
  { id: "integrations", label: "Integrations", icon: RiExternalLinkLine, href: "/integrations" },
  { id: "billing", label: "Billing", icon: RiBarChartLine, href: "/billing" },
  { id: "settings", label: "Settings", icon: RiSettings3Line, href: "/settings" },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

export default function Sidebar({ collapsed: controlledCollapsed, onToggle }: SidebarProps = {}) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  // Support both controlled and uncontrolled modes
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

  const handleToggle = () => {
    const next = !collapsed
    setInternalCollapsed(next)
    onToggle?.(next)
  }

  return (
    <aside className={"fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-white transition-all duration-300 " + (collapsed ? "w-16" : "w-64")}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span className="font-bold text-lg">AI OS</span>
          </div>
        )}
        <button
          onClick={handleToggle}
          className={"p-2 rounded-lg hover:bg-gray-800 transition-colors " + (collapsed ? "mx-auto" : "")}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              activeItem === item.id
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => setActiveItem(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center w-full px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <RiSettings3Line className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Account Settings</span>}
        </button>
      </div>
    </aside>
  )
}