"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, HelpCircle, LogOut, Clock, Target, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const lessons = [
  {
    id: "newtons-laws",
    title: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    difficulty: "Beginner",
    duration: "45 min",
    progress: 0,
    color: "bg-blue-500",
  },
  {
    id: "wave-optics",
    title: "Wave Optics",
    description: "Understanding light as waves and interference",
    difficulty: "Intermediate",
    duration: "60 min",
    progress: 0,
    color: "bg-purple-500",
  },
  {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction",
    description: "Faraday's law and electromagnetic phenomena",
    difficulty: "Advanced",
    duration: "75 min",
    progress: 0,
    color: "bg-green-500",
  },
]

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Badge variant="secondary">Physics - Phase 1</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.displayName || user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Available</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Physics fundamentals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Ready</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Test your knowledge</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Q&A Available</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15+</div>
              <p className="text-xs text-muted-foreground">Predefined answers</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Lessons */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Lessons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-3 h-3 rounded-full ${lesson.color}`}></div>
                    <Badge
                      variant={
                        lesson.difficulty === "Beginner"
                          ? "default"
                          : lesson.difficulty === "Intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {lesson.duration}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {lesson.progress}% Complete
                      </div>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                    <div className="flex space-x-2">
                      <Link href={`/lessons/${lesson.id}`} className="flex-1">
                        <Button className="w-full" size="sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Start Lesson
                        </Button>
                      </Link>
                      <Link href={`/quiz/${lesson.id}`}>
                        <Button variant="outline" size="sm">
                          <Trophy className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Q&A Helper
              </CardTitle>
              <CardDescription>Get instant answers to common Physics questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/qa">
                <Button className="w-full">Browse Questions</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Your Progress
              </CardTitle>
              <CardDescription>Track your learning journey and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-gray-600 mt-2">Complete lessons and quizzes to track your progress</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
