import { Metadata } from "next"
import DashboardLayout from "components/dashboard/DashboardLayout"

export const metadata: Metadata = {
  title: "AI Operating System - Mission Control",
  description: "The central command center for your AI-powered company",
}

export default function DashboardPage() {
  return <DashboardLayout />
}