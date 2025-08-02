import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type User = {
  id: string
  email: string
  name: string
  created_at: string
}

export type UserProgress = {
  id: string
  user_id: string
  subject: string
  lesson: string
  completed: boolean
  score?: number
  completed_at?: string
  created_at: string
}

export type QuizResult = {
  id: string
  user_id: string
  subject: string
  lesson: string
  score: number
  total_questions: number
  answers: any[]
  completed_at: string
}
