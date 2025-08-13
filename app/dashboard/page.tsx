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
  Settings,
  Bell,
  ChevronRight,
  TrendingUp,
  Calendar,
  Star,
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
    color: "from-blue-500 to-blue-600",
    sections: 4,
    completedSections: 3,
    lastAccessed: "2 days ago",
    isNew: false,
  },
  {
    id: "wave-optics",
    title: "Wave Optics",
    description: "Understanding light as a wave phenomenon",
    duration: "60 min",
    difficulty: "Intermediate",
    progress: 40,
    color: "from-purple-500 to-purple-600",
    sections: 4,
    completedSections: 2,
    lastAccessed: "1 day ago",
    isNew: false,
  },
  {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction",
    description: "Faraday's law and electromagnetic phenomena",
    duration: "75 min",
    difficulty: "Advanced",
    progress: 0,
    color: "from-green-500 to-green-600",
    sections: 4,
    completedSections: 0,
    lastAccessed: "Never",
    isNew: true,
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
    status: "completed",
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
    status: "completed",
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
    status: "locked",
  },
]

const weeklyActivity = [
  { day: "Mon", hours: 2.5, isToday: false },
  { day: "Tue", hours: 1.8, isToday: false },
  { day: "Wed", hours: 3.2, isToday: false },
  { day: "Thu", hours: 2.1, isToday: false },
  { day: "Fri", hours: 1.5, isToday: false },
  { day: "Sat", hours: 4.0, isToday: false },
  { day: "Sun", hours: 2.8, isToday: true },
]

const recentAchievements = [
  { title: "First Quiz Completed", date: "3 days ago", icon: Trophy, color: "text-yellow-600 bg-yellow-100" },
  { title: "5-Day Streak", date: "2 days ago", icon: Flame, color: "text-orange-600 bg-orange-100" },
  { title: "Wave Optics Expert", date: "1 day ago", icon: Award, color: "text-purple-600 bg-purple-100" },
]

export default function DashboardPage() {
  const currentStreak = 7
  const totalStudyHours = 18.9
  const averageScore = 78.5
  const completedLessons = 2
  const totalQuizAttempts = 3
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">SmartPath</span>
                <div className="text-xs text-slate-500 -mt-1">Learning Platform</div>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>

              <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl border">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-semibold text-sm">Abdullah</div>
                  <div className="text-xs text-slate-500">Class 12 - Science</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">Abdullah!</span> 🎯
              </h1>
              <p className="text-slate-600 text-lg">Class 12 Science • Keep up the great momentum!</p>
            </div>

            {/* Streak Card */}
            <Card className="w-full lg:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{currentStreak} Days</div>
                    <div className="text-orange-100">Current Streak 🔥</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 animate-slide-up">
          <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Lessons</p>
                  <p className="text-2xl font-bold">{completedLessons}/3</p>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +1 this week
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Quizzes</p>
                  <p className="text-2xl font-bold">{totalQuizAttempts}</p>
                  <div className="flex items-center text-xs text-blue-600 mt-1">
                    <Star className="w-3 h-3 mr-1" />2 retakes
                  </div>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Study Time</p>
                  <p className="text-2xl font-bold">{totalStudyHours}h</p>
                  <div className="flex items-center text-xs text-purple-600 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    This month
                  </div>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Avg Score</p>
                  <p className="text-2xl font-bold">{averageScore}%</p>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5% up
                  </div>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md col-span-2 lg:col-span-1">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Streak</p>
                  <p className="text-2xl font-bold">{currentStreak} days</p>
                  <div className="flex items-center text-xs text-orange-600 mt-1">
                    <Flame className="w-3 h-3 mr-1" />
                    Personal best!
                  </div>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="mb-8 border-0 shadow-lg animate-slide-up">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-xl">
                  <BarChart3 className="w-5 h-5 mr-3 text-blue-600" />
                  Weekly Study Activity
                </CardTitle>
                <CardDescription className="mt-1">Your study hours for the past week</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                Total: {weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between space-x-2 h-40 mb-4">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-lg mb-3 transition-all duration-300 hover:opacity-80 ${
                      day.isToday
                        ? "bg-gradient-to-t from-blue-600 to-purple-600 shadow-lg"
                        : "bg-gradient-to-t from-slate-300 to-slate-400"
                    }`}
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  ></div>
                  <div className={`text-xs font-medium mb-1 ${day.isToday ? "text-blue-600" : "text-slate-500"}`}>
                    {day.day}
                  </div>
                  <div className={`text-xs ${day.isToday ? "font-bold text-blue-600" : "text-slate-400"}`}>
                    {day.hours}h
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Physics Lessons</h2>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200"
              >
                Phase 1
              </Badge>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <Card
                  key={lesson.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-md animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{lesson.title}</h3>
                          {lesson.isNew && <Badge className="bg-green-100 text-green-700 border-green-200">New</Badge>}
                          {lesson.progress > 0 && lesson.progress < 100 && (
                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                              In Progress
                            </Badge>
                          )}
                          {lesson.progress === 100 && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{lesson.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration}
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {lesson.completedSections}/{lesson.sections} sections
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-xs">Last: {lesson.lastAccessed}</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${lesson.color} shadow-sm`}></div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-bold text-blue-600">{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>

                    <div className="flex space-x-3">
                      <Link href={`/lessons/${lesson.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
                          {lesson.progress === 0 ? "Start Lesson" : "Continue"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href={`/quiz/${lesson.id}`}>
                        <Button variant="outline" className="border-slate-200 hover:bg-slate-50 bg-transparent">
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
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-3 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.color}`}>
                        <achievement.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{achievement.title}</div>
                        <div className="text-xs text-slate-500">{achievement.date}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quiz Performance */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quiz Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">{quiz.title}</div>
                        <div className="text-xs text-slate-500">
                          {quiz.attempts} attempt{quiz.attempts !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="text-right">
                        {quiz.bestScore ? (
                          <div className="text-sm font-bold text-green-600">{quiz.bestScore}%</div>
                        ) : (
                          <div className="text-xs text-slate-400">Not taken</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/quiz/newtons-laws" className="block mt-4">
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 bg-transparent">
                    Take Next Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Study Goal */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg text-green-800">
                  <Zap className="w-5 h-5 mr-3" />
                  Daily Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2 text-green-800">2.5h / 3h</div>
                  <Progress value={83} className="mb-3 h-3" />
                  <div className="text-sm text-green-700 mb-1">83% complete</div>
                  <div className="text-xs text-green-600 font-medium">Great progress today! 🎉</div>
                </div>
              </CardContent>
            </Card>

            {/* Q&A Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <MessageCircle className="w-5 h-5 mr-3 text-blue-600" />
                  Need Help?
                </CardTitle>
                <CardDescription>Get instant answers to your physics questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/qa">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
                    Browse Q&A
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
