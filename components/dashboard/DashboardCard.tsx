"use client"

import { useState } from "react"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

interface DashboardCardProps {
  id: string
  type: string
  collapsed: boolean
  onToggle: (id: string) => void
}

export default function DashboardCard({ 
  id, 
  type, 
  collapsed, 
  onToggle 
}: DashboardCardProps) {
  const [isDragging, setIsDragging] = useState(false)

  // Component mapping for different widget types
  const renderWidgetContent = () => {
    switch(type) {
      case "kpi":
        return <KPIWidgets />
      case "agents":
        return <AgentStatus />
      case "workflows":
        return <Workflows />
      case "projects":
        return <Projects />
      case "infrastructure":
        return <Infrastructure />
      case "business-intelligence":
        return <BusinessIntelligence />
      default:
        return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Widget not implemented</div>
    }
  }

  const getTitle = () => {
    const titles: Record<string, string> = {
      kpi: "Mission Control",
      agents: "AI Agents",
      workflows: "Workflows",
      projects: "Projects",
      infrastructure: "Infrastructure",
      "business-intelligence": "Business Intelligence"
    }
    return titles[type] || type
  }

  const getIcon = () => {
    const icons: Record<string, JSX.Element> = {
      kpi: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2"></path>
          <rect x="9" y="3" width="6" height="4" rx="1" ry="1"></rect>
        </svg>
      ),
      agents: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      workflows: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 6H4m14 0v7m0-7V15m0 0h-9.5m9.5 0h-9.5"></path>
        </svg>
      ),
      projects: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16.5 9V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-4.5"></path>
          <path d="M12 7V19"></path>
        </svg>
      ),
      infrastructure: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 6h-3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V3"></path>
          <path d="M9 6H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9z"></path>
          <path d="M6 15V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"></path>
          <path d="M18 6h-9a3 3 0 0 0-3 3v1a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2h5"></path>
          <circle cx="19" cy="8" r="3"></circle>
        </svg>
      ),
      "business-intelligence": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 8V4m0 0h-3.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3H9"></path>
          <path d="M16 16l-2.5-2.5m0 0V14m0 2h2.5a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3H19"></path>
        </svg>
      )
    }
    return icons[type] || <div className="w-5 h-5" />
  }

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div 
        className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center space-x-2">
          {getIcon()}
          <h3 className="font-semibold text-gray-900 dark:text-white">{getTitle()}</h3>
        </div>
        
        <button 
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <RiArrowDownSLine className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <RiArrowUpSLine className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
        </button>
      </div>
      
      {!collapsed && (
        <div className="p-4">
          {renderWidgetContent()}
        </div>
      )}
    </div>
  )
}

// Placeholder components for each widget type
function KPIWidgets() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Agents</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">42</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Daily Jobs</p>
          <p className="text-2xl font-bold text-green-700 dark:text-teal-300">1,254</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-purple-700 dark:text-pink-300">$18,450</p>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-4 border border-orange-100 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Tokens Used</p>
          <p className="text-2xl font-bold text-orange-700 dark:text-red-300">2.1M</p>
        </div>
      </div>
    
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">System Health</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">All systems operational</span>
          </div>
        </div>
        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
          Quick Actions
        </button>
      </div>
    </div>
  )
}

function AgentStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Running Agents</h4>
        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full">17 active</span>
      </div>
      
      <div className="space-y-2">
        {['Text Processing', 'Data Analysis', 'Customer Support', 'Code Generation', 'Image Creation'].map((agent, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{agent}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">2m ago</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Agent Health</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="block text-green-600 dark:text-green-400 font-bold">98%</span>
            <span className="text-gray-500 dark:text-gray-400">Uptime</span>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="block text-blue-600 dark:text-blue-400 font-bold">1.2s</span>
            <span className="text-gray-500 dark:text-gray-400">Avg Latency</span>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="block text-purple-600 dark:text-purple-400 font-bold">89%</span>
            <span className="text-gray-500 dark:text-gray-400">Success</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Workflows() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Active Workflows</h4>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full">5 running</span>
      </div>
      
      <div className="space-y-3">
        {[
          { name: "Content Pipeline", status: "running", progress: 67, lastRun: "2m ago" },
          { name: "Code Generation", status: "pending", progress: 0, lastRun: "15m ago" },
          { name: "Video Rendering", status: "completed", progress: 100, lastRun: "8h ago" },
          { name: "Image Generation", status: "running", progress: 42, lastRun: "7m ago" }
        ].map((workflow, i) => (
          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{workflow.name}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                workflow.status === 'running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                workflow.status === 'pending' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' :
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>{workflow.status}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-2">
              <div 
                className={`h-1.5 rounded-full ${
                  workflow.status === 'running' ? 'bg-blue-500' :
                  workflow.status === 'pending' ? 'bg-gray-400 dark:bg-gray-500' :
                  'bg-green-500'
                }`} 
                style={{ width: `${workflow.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last run {workflow.lastRun}</p>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center space-x-2 py-2 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 5v14m-7-7h14"></path>
        </svg>
        <span>Create New Workflow</span>
      </button>
    </div>
  )
}

function Projects() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Active Projects</h4>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs rounded-full">8 active</span>
      </div>
      
      <div className="space-y-3">
        {[
          { name: "AI Marketing Suite", client: "Acme Corp", status: "in-progress", progress: 75, lastUpdate: "1h ago" },
          { name: "Customer Support Bot", client: "GlobalBank", status: "completed", progress: 100, lastUpdate: "2d ago" },
          { name: "Document Processing", client: "HealthNet", status: "in-progress", progress: 45, lastUpdate: "3h ago" },
          { name: "Analytics Dashboard", client: "RetailPro", status: "planning", progress: 0, lastUpdate: "1w ago" }
        ].map((project, i) => (
          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-sm text-gray-900 dark:text-white">{project.name}</h5>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>{project.status}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Client: {project.client}</p>
            
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-2">
              <div 
                className={`h-1.5 rounded-full ${
                  project.status === 'in-progress' ? 'bg-blue-500' :
                  project.status === 'completed' ? 'bg-green-500' :
                  'bg-yellow-400'
                }`} 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">Last update {project.lastUpdate}</p>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center space-x-2 py-2 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 5v14m-7-7h14"></path>
        </svg>
        <span>New Project</span>
      </button>
    </div>
  )
}

function Infrastructure() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg p-4 border border-red-100 dark:border-red-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">GPU Usage</p>
          <div className="flex items-end space-x-2 mt-1 h-8">
            <div className="w-full bg-red-300 dark:bg-red-700 rounded flex items-end">
              <div className="h-6 w-5/6 bg-gradient-to-r from-red-400 to-pink-500 rounded"></div>
            </div>
          </div>
          <p className="text-sm font-bold text-red-700 dark:text-red-300">85%</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</p>
          <div className="flex items-end space-x-2 mt-1 h-8">
            <div className="w-full bg-cyan-300 dark:bg-cyan-700 rounded flex items-end">
              <div className="h-6 w-4/5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded"></div>
            </div>
          </div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-300">82%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Docker Containers</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-purple-700 dark:text-purple-300">18</span>
            <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-full">Running</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Vector DB</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-emerald-700 dark:text-emerald-300">Online</span>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Local Models</h4>
        <div className="space-y-2">
          {[
            { name: "GPT-4o", size: "18GB", status: "loaded" },
            { name: "Claude 3 Opus", size: "24GB", status: "loading" },
            { name: "Llama 3 70B", size: "45GB", status: "loaded" },
            { name: "Stable Diffusion XL", size: "12GB", status: "idle" }
          ].map((model, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">{model.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 dark:text-gray-400">{model.size}</span>
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  model.status === 'loaded' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  model.status === 'loading' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                }`}>{model.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BusinessIntelligence() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue (24h)</p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">$1,854</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Clients</p>
          <p className="text-2xl font-bold text-purple-700 dark:text-pink-300">89</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Token Usage</p>
          <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">2.1M</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-4 border border-orange-100 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">API Calls</p>
          <p className="text-xl font-bold text-red-700 dark:text-red-300">4,231</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">AI Recommendations</h4>
        <div className="space-y-3">
          {[
            "Optimize GPU allocation for 20% cost reduction",
            "Scale agent count during peak hours (10 PM - 6 AM)",
            "Upgrade Claude 3 model to Opus tier for better accuracy",
            "Create automated invoice generation workflow"
          ].map((rec, i) => (
            <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-600">
              <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}