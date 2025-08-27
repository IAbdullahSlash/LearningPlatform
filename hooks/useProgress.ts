"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"
import type { UserProgress } from "@/lib/supabase"

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchProgress()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchProgress = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setError(null)
      const { data, error: fetchError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (fetchError) {
        console.error("Error fetching progress:", fetchError)
        setError("Failed to load progress")
        setProgress([])
      } else {
        setProgress(data || [])
      }
    } catch (error) {
      console.error("Error fetching progress:", error)
      setError("Failed to load progress")
      setProgress([])
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (subject: string, lesson: string, completed: boolean, score?: number) => {
    if (!user) return { error: "Not authenticated" }

    try {
      const { error } = await supabase.from("user_progress").upsert({
        user_id: user.id,
        subject,
        lesson,
        completed,
        score,
        completed_at: completed ? new Date().toISOString() : null,
      })

      if (error) {
        console.error("Error updating progress:", error)
        return { error }
      }

      await fetchProgress() // Refresh progress
      return { error: null }
    } catch (error) {
      console.error("Error updating progress:", error)
      return { error }
    }
  }

  const getSubjectProgress = (subject: string) => {
    return progress.filter((p) => p.subject === subject)
  }

  const getLessonProgress = (subject: string, lesson: string) => {
    return progress.find((p) => p.subject === subject && p.lesson === lesson)
  }

  return {
    progress,
    loading,
    error,
    updateProgress,
    getSubjectProgress,
    getLessonProgress,
    refetch: fetchProgress,
  }
}
