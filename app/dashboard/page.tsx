"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Brain,
  MessageCircle,
  Trophy,
  Clock,
  ArrowRight,
  Home,
  Flame,
  Target,
  Award,
  Zap,
  BarChart3,
  User,
} from "lucide-react"
import Link from "next/link"

const lessons = [
  {
    id: "newtons-laws",
    title: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    duration: "45 min",
    difficulty: "Beginner",
    progress: 75,
    color: "bg-blue-500",
    sections: 4,
    completedSections: 3,
    lastAccessed: "2 days ago",
  },
  {
    id: "wave-optics",
    title: "Wave Optics",
    description: "Understanding light as a wave phenomenon",
    duration: "60 min",
    difficulty: "Intermediate",
    progress: 40,
    color: "bg-purple-500",
    sections: 4,
    completedSections: 2,
    lastAccessed: "1 day ago",
  },
  {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction",
    description: "Faraday's law and electromagnetic phenomena",
    duration: "75 min",
    difficulty: "Advanced",
    progress: 0,
    color: "bg-green-500",
    sections: 4,
    completedSections: 0,
    lastAccessed: "Never",
  },
]

const quizzes = [
  {
    id: "newtons-laws",
    title: "Newton's Laws Quiz",
    questions: 7,
    timeLimit: "15 min",
    bestScore: 85,
    difficulty: "Beginner",
    attempts: 2,
    lastAttempt: "3 days ago",
  },
  {
    id: "wave-optics",
    title: "Wave Optics Quiz",
    questions: 8,
    timeLimit: "20 min",
    bestScore: 72,
    difficulty: "Intermediate",
    attempts: 1,
    lastAttempt: "1 day ago",
  },
  {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction Quiz",
    questions: 9,
    timeLimit: "25 min",
    bestScore: null,
    difficulty: "Advanced",
    attempts: 0,
    lastAttempt: "Never",
  },
]

const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 2.8 },
]

const recentAchievements = [
  { title: "First Quiz Completed", date: "3 days ago", icon: Trophy },
  { title: "5-Day Streak", date: "2 days ago", icon: Flame },
  { title: "Wave Optics Expert", date: "1 day ago", icon: Award },
]

export default function DashboardPage() {
  const currentStreak = 7
  const totalStudyHours = 18.9
  const averageScore = 78.5
  const completedLessons = 2
  const totalQuizAttempts = 3

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartPath
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <div className="text-sm">
                <div className="font-medium">Abdullah</div>
                <div className="text-gray-500">Class 12 - Science</div>
              </div>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/qa">
              <Button variant="outline" size="sm">
                Q&A Helper
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Abdullah! 🎯</h1>
              <p className="text-gray-600">Class 12 Science • Keep up the great momentum!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-orange-500">{currentStreak}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold">{completedLessons}/3</p>
                  <p className="text-xs text-green-600">+1 this week</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quiz Attempts</p>
                  <p className="text-2xl font-bold">{totalQuizAttempts}</p>
                  <p className="text-xs text-blue-600">2 retakes</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Time</p>
                  <p className="text-2xl font-bold">{totalStudyHours}h</p>
                  <p className="text-xs text-purple-600">This month</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold">{averageScore}%</p>
                  <p className="text-xs text-green-600">+5% improvement</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold">{currentStreak} days</p>
                  <p className="text-xs text-orange-600">Personal best!</p>
                </div>
                <Flame className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Weekly Study Activity
            </CardTitle>
            <CardDescription>Your study hours for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2 h-32">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm mb-2 transition-all hover:opacity-80"
                    style={{ height: `${(day.hours / 4) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500">{day.day}</div>
                  <div className="text-xs font-medium">{day.hours}h</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Physics Lessons</h2>
              <Badge variant="secondary">Phase 1</Badge>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{lesson.title}</h3>
                          {lesson.progress > 0 && (
                            <Badge variant="outline" className="text-xs">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration}
                          </span>
                          <span>
                            {lesson.completedSections}/{lesson.sections} sections
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-xs">Last: {lesson.lastAccessed}</span>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${lesson.color}`}></div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/lessons/${lesson.id}`} className="flex-1">
                        <Button className="w-full">
                          {lesson.progress === 0 ? "Start Lesson" : "Continue"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href={`/quiz/${lesson.id}`}>
                        <Button variant="outline">
                          <Trophy className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <achievement.icon className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{achievement.title}</div>
                        <div className="text-xs text-gray-500">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quiz Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{quiz.title}</div>
                        <div className="text-xs text-gray-500">
                          {quiz.attempts} attempt{quiz.attempts !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="text-right">
                        {quiz.bestScore ? (
                          <div className="text-sm font-bold text-green-600">{quiz.bestScore}%</div>
                        ) : (
                          <div className="text-xs text-gray-400">Not taken</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/quiz/newtons-laws" className="block mt-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    Take Next Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Q&A Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Need Help?
                </CardTitle>
                <CardDescription>Get instant answers to your physics questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/qa">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Browse Q&A
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Study Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Daily Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">2.5h / 3h</div>
                  <Progress value={83} className="mb-2" />
                  <div className="text-sm text-gray-600">83% complete</div>
                  <div className="text-xs text-green-600 mt-1">Great progress today!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
