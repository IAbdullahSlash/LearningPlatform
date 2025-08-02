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
      const { data, error } = await supabase
        .from("quiz_results")
        .insert({
          user_id: user.id,
          subject,
          lesson,
          score,
          total_questions: totalQuestions,
          answers,
        })
        .select()

      if (error) throw error

      // Refresh results
      await fetchResults()
      return { data, error: null }
    } catch (error) {
      console.error("Error saving quiz result:", error)
      return { data: null, error }
    }
  }

  const getQuizHistory = (subject?: string, lesson?: string) => {
    let filtered = results

    if (subject) {
      filtered = filtered.filter((r) => r.subject === subject)
    }

    if (lesson) {
      filtered = filtered.filter((r) => r.lesson === lesson)
    }

    return filtered
  }

  const getBestScore = (subject: string, lesson: string) => {
    const quizzes = results.filter((r) => r.subject === subject && r.lesson === lesson)
    if (quizzes.length === 0) return null

    return Math.max(...quizzes.map((q) => q.score))
  }

  const getAverageScore = (subject?: string) => {
    let filtered = results

    if (subject) {
      filtered = filtered.filter((r) => r.subject === subject)
    }

    if (filtered.length === 0) return 0

    const totalScore = filtered.reduce((sum, r) => sum + r.score, 0)
    return Math.round(totalScore / filtered.length)
  }

  return {
    results,
    loading,
    saveQuizResult,
    getQuizHistory,
    getBestScore,
    getAverageScore,
    refetch: fetchResults,
  }
}
