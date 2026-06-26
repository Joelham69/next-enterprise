"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar"
import { RiSettings3Line, RiLogoutBoxRLine } from "react-icons/ri"
import Link from "next/link"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-800 transition-colors"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar.jpg" alt="User profile" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <span className="hidden md:inline text-white font-medium">AI Admin</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 py-1">
          <Link href="/settings" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
            <RiSettings3Line className="w-5 h-5 mr-3" />
            Settings
          </Link>
          <button className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors text-left">
            <RiLogoutBoxRLine className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}