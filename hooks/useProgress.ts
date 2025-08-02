"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"
import type { UserProgress } from "@/lib/supabase"

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProgress()
    }
  }, [user])

  const fetchProgress = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("user_progress").select("*").eq("user_id", user.id)

      if (error) throw error
      setProgress(data || [])
    } catch (error) {
      console.error("Error fetching progress:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (subject: string, lesson: string, completed: boolean, score?: number) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("user_progress")
        .upsert({
          user_id: user.id,
          subject,
          lesson,
          completed,
          score,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .select()

      if (error) throw error

      // Refresh progress
      await fetchProgress()
      return { data, error: null }
    } catch (error) {
      console.error("Error updating progress:", error)
      return { data: null, error }
    }
  }

  const getSubjectProgress = (subject: string) => {
    return progress.filter((p) => p.subject === subject)
  }

  const getLessonProgress = (subject: string, lesson: string) => {
    return progress.find((p) => p.subject === subject && p.lesson === lesson)
  }

  const getOverallProgress = () => {
    const completed = progress.filter((p) => p.completed).length
    const total = progress.length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  return {
    progress,
    loading,
    updateProgress,
    getSubjectProgress,
    getLessonProgress,
    getOverallProgress,
    refetch: fetchProgress,
  }
}
