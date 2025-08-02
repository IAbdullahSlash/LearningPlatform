"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"
import type { QuizResult } from "@/lib/supabase"

export function useQuizResults() {
  const { user } = useAuth()
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchResults()
    }
  }, [user])

  const fetchResults = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })

      if (error) throw error
      setResults(data || [])
    } catch (error) {
      console.error("Error fetching quiz results:", error)
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
    if (!user) return

    try {
      const { error } = await supabase.from("quiz_results").insert({
        user_id: user.id,
        subject,
        lesson,
        score,
        total_questions: totalQuestions,
        answers,
      })

      if (error) throw error
      await fetchResults() // Refresh results
    } catch (error) {
      console.error("Error saving quiz result:", error)
    }
  }

  const getSubjectResults = (subject: string) => {
    return results.filter((r) => r.subject === subject)
  }

  const getLessonResults = (subject: string, lesson: string) => {
    return results.filter((r) => r.subject === subject && r.lesson === lesson)
  }

  return {
    results,
    loading,
    saveQuizResult,
    getSubjectResults,
    getLessonResults,
    refetch: fetchResults,
  }
}
