"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"
import type { QuizResult } from "@/lib/supabase"

export function useQuizResults() {
  const { user } = useAuth()
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchResults()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchResults = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setError(null)
      const { data, error: fetchError } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })

      if (fetchError) {
        console.error("Error fetching quiz results:", fetchError)
        setError("Failed to load quiz results")
        setResults([])
      } else {
        setResults(data || [])
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error)
      setError("Failed to load quiz results")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const saveQuizResult = async (
    subject: string,
    lesson: string,
    score: number,
    totalQuestions: number,
    answers: any[],
  ) => {
    if (!user) return { error: "Not authenticated" }

    try {
      const { error } = await supabase.from("quiz_results").insert({
        user_id: user.id,
        subject,
        lesson,
        score,
        total_questions: totalQuestions,
        answers,
        completed_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error saving quiz result:", error)
        return { error }
      }

      await fetchResults() // Refresh results
      return { error: null }
    } catch (error) {
      console.error("Error saving quiz result:", error)
      return { error }
    }
  }

  return {
    results,
    loading,
    error,
    saveQuizResult,
    refetch: fetchResults,
  }
}
