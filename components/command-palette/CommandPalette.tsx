"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiPlus, FiArrowUp, FiArrowDown, FiCheck } from "react-icons/fi"
import { useHotkeys } from "react-hotkeys-hook"

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Mock AI-powered suggestions
  const commands = [
    { label: "Create new project", description: "Start a new AI workflow", type: "action" },
    { label: "Open billing details", description: "View payment history and plans", type: "navigation" },
    { label: "Run data analysis job", description: "Trigger latest dataset processing", type: "action" },
    { label: "Invite team member", description: "Add new user to workspace", type: "action" },
    { label: "Switch to dark mode", description: "Toggle theme preference", type: "setting" },
    { label: "View system status", description: "Check health of AI agents", type: "information" },
    { label: "Export report PDF", description: "Download current dashboard as PDF", type: "action" },
  ]

  const filteredCommands = query
    ? commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  useEffect(() => {
    if (isOpen && filteredCommands.length > 0) {
      setSelectedIndex(0)
    } else {
      setSelectedIndex(-1)
    }
  }, [isOpen, query])

  useHotkeys("ctrl+k", () => setIsOpen((prev) => !prev), { preventDefault: true })
  useHotkeys("escape", () => setIsOpen(false), { preventDefault: true })
  useHotkeys("down", () => {
    if (isOpen && selectedIndex < filteredCommands.length - 1)
      setSelectedIndex(selectedIndex + 1)
  }, { preventDefault: true })
  useHotkeys("up", () => {
    if (isOpen && selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
  }, { preventDefault: true })
  useHotkeys("enter", () => {
    if (isOpen && filteredCommands[selectedIndex]) {
      // Simulate command execution
      setIsOpen(false)
      setQuery("")
    }
  }, { preventDefault: true })

  return (
    <>
      {/* Trigger Button */}
      <button
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FiPlus className="w-6 h-6" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 text-white rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center gap-3">
              <FiSearch className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ask anything (Ctrl+K)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-gray-400">No results found</div>
              ) : (
                filteredCommands.map((cmd, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery("")
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-700 transition-colors ${
                      index === selectedIndex ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      {cmd.type === "action" && <FiPlus className="w-4 h-4" />}
                      {cmd.type === "navigation" && <FiArrowUp className="w-4 h-4" />}
                      {cmd.type === "setting" && <FiCheck className="w-4 h-4" />}
                      {cmd.type === "information" && <FiSearch className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{cmd.label}</p>
                      <p className="text-sm text-gray-400 truncate">{cmd.description}</p>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-700 flex justify-between text-xs text-gray-500">
              <span>Ctrl+K — Open Command Palette</span>
              <span>↑↓ Enter — Navigate</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}