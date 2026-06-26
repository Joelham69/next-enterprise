"use client"

import { useState, useEffect } from "react"

export function useRealTimeData<T>(fetcher: () => Promise<T>, interval = 5000) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetcher()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const timer = setInterval(fetchData, interval)

    return () => clearInterval(timer)
  }, [fetcher, interval])

  return { data, loading, error }
}