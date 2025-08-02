"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Trophy, Clock, Target, TrendingUp, MessageCircle, Play, FileText } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { useProgress } from "@/hooks/useProgress"
import { useQuizResults } from "@/hooks/useQuizResults"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardPage() {
  const { user } = useAuth()
  const { progress, loading: progressLoading } = useProgress()
  const { results, loading: resultsLoading } = useQuizResults()

  const [studyStreak, setStudyStreak] = useState(12)
  const [hoursToday, setHoursToday] = useState(2.5)

  const subjects = [
    { id: "physics", name: "Physics", color: "bg-blue-500" },
    { id: "mathematics", name: "Mathematics", color: "bg-purple-500" },
  ]

  // Calculate real progress from database
  const getSubjectProgress = (subjectId: string) => {
    const subjectProgress = progress.filter((p) => p.subject === subjectId)
    if (subjectProgress.length === 0) return 0

    const completed = subjectProgress.filter((p) => p.completed).length
    return Math.round((completed / subjectProgress.length) * 100)
  }

  // Calculate overall progress
  const getOverallProgress = () => {
    if (progress.length === 0) return 0
    const completed = progress.filter((p) => p.completed).length
    return Math.round((completed / progress.length) * 100)
  }

  // Calculate quiz average
  const getQuizAverage = () => {
    if (results.length === 0) return 0
    const totalScore = results.reduce((sum, result) => sum + result.score, 0)
    const totalQuestions = results.reduce((sum, result) => sum + result.total_questions, 0)
    return totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0
  }

  // Get recent activity from database
  const getRecentActivity = () => {
    const recentResults = results.slice(0, 3).map((result) => ({
      subject: result.subject.charAt(0).toUpperCase() + result.subject.slice(1),
      topic: result.lesson.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      type: "quiz" as const,
      score: Math.round((result.score / result.total_questions) * 100),
      time: new Date(result.completed_at).toLocaleDateString(),
    }))

    const recentProgress = progress
      .filter((p) => p.completed && p.completed_at)
      .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())
      .slice(0, 3 - recentResults.length)
      .map((p) => ({
        subject: p.subject.charAt(0).toUpperCase() + p.subject.slice(1),
        topic: p.lesson.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        type: "lesson" as const,
        time: new Date(p.completed_at!).toLocaleDateString(),
      }))

    return [...recentResults, ...recentProgress].slice(0, 3)
  }

  // Get weak areas based on quiz performance
  const getWeakAreas = () => {
    const subjectScores: { [key: string]: number[] } = {}

    results.forEach((result) => {
      const percentage = Math.round((result.score / result.total_questions) * 100)
      if (!subjectScores[result.subject]) {
        subjectScores[result.subject] = []
      }
      subjectScores[result.subject].push(percentage)
    })

    return Object.entries(subjectScores)
      .map(([subject, scores]) => ({
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        topic: "Recent Quizzes",
        accuracy: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      }))
      .filter((area) => area.accuracy < 80)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3)
  }

  if (progressLoading || resultsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your progress...</div>
        </div>
      </div>
    )
  }

  const recentActivity = getRecentActivity()
  const weakAreas = getWeakAreas()
  const overallProgress = getOverallProgress()
  const quizAverage = getQuizAverage()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "Student"}! 👋</h1>
          <p className="text-gray-600">Ready to continue your learning journey? Let's make today count!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Streak</p>
                  <p className="text-2xl font-bold">{studyStreak} days</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hours Today</p>
                  <p className="text-2xl font-bold">{hoursToday}h</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quiz Average</p>
                  <p className="text-2xl font-bold">{quizAverage}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Subjects</CardTitle>
                <CardDescription>Track your progress across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => {
                    const subjectProgress = getSubjectProgress(subject.id)
                    return (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                          <div>
                            <h3 className="font-medium">{subject.name}</h3>
                            <p className="text-sm text-gray-600">{subjectProgress}% complete</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Progress value={subjectProgress} className="w-24" />
                          <Link href={`/subjects/${subject.id}`}>
                            <Button size="sm">Continue</Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {activity.type === "quiz" && <FileText className="w-5 h-5 text-blue-600" />}
                            {activity.type === "lesson" && <Play className="w-5 h-5 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {activity.subject} - {activity.topic}
                            </h3>
                            <p className="text-sm text-gray-600 capitalize">
                              {activity.type} • {activity.time}
                            </p>
                          </div>
                        </div>
                        {activity.score && (
                          <Badge
                            variant={
                              activity.score >= 80 ? "default" : activity.score >= 60 ? "secondary" : "destructive"
                            }
                          >
                            {activity.score}%
                          </Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No recent activity yet. Start learning to see your progress here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tutor Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI Tutor</span>
                </CardTitle>
                <CardDescription>Get instant help with your studies</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/tutor">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask AI Tutor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Areas to Improve</CardTitle>
                <CardDescription>Focus on these topics to boost your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weakAreas.length > 0 ? (
                    weakAreas.map((area, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{area.subject}</h4>
                          <Badge variant="outline" className="text-xs">
                            {area.accuracy}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{area.topic}</p>
                        <Link href={`/subjects/${area.subject.toLowerCase()}`}>
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            Practice Now
                          </Button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">Great job! No weak areas detected.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Daily Goal */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Goal</CardTitle>
                <CardDescription>Complete 3 hours of study</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{hoursToday} / 3.0 hours</span>
                  </div>
                  <Progress value={(hoursToday / 3) * 100} />
                  <p className="text-xs text-gray-600">
                    {hoursToday >= 3 ? "🎉 Goal completed! Great work!" : `${(3 - hoursToday).toFixed(1)} hours to go.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
