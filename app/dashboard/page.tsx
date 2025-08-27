"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Trophy, TrendingUp, Brain, Atom, FlaskConical, Calculator, Dna, Flame, Star, Home, BarChart3, Target, Zap, Award, ChevronRight } from "lucide-react"

import Link from "next/link"

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  // Abdullah's personalized data
  const studentData = {
    name: "Abdullah",
    class: "12",
    stream: "Science",
    currentStreak: 7,
    personalBest: 12,
    totalStudyTime: 18.9, // hours this month
    averageScore: 78.5,
    improvement: 5, // percentage improvement
    dailyGoal: 3, // hours
    todayProgress: 2.5, // hours completed today
  }

  const subjects1 = [
    {
      name: "Physics",
      icon: Atom,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      progress: 75,
      lessons: 12,
      totalLessons: 16,
      description: "Explore the fundamental laws of nature",
    },
    {
      name: "Chemistry",
      icon: FlaskConical,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      progress: 60,
      lessons: 9,
      totalLessons: 15,
      description: "Discover the world of atoms and molecules",
    },
    {
      name: "Mathematics",
      icon: Calculator,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      progress: 85,
      lessons: 17,
      totalLessons: 20,
      description: "Master numbers, equations, and logic",
    },
    {
      name: "Biology",
      icon: Dna,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      progress: 45,
      lessons: 7,
      totalLessons: 14,
      description: "Study life and living organisms",
    },
  ]

  const recentAchievements = [
    {
      title: "First Quiz Completed",
      description: "Completed your first physics quiz",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      timestamp: "3 days ago",
    },
    {
      title: "5-Day Streak",
      description: "Maintained study streak for 5 days",
      icon: Flame,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      timestamp: "2 days ago",
    },
    {
      title: "Wave Optics Expert",
      description: "Scored 85% on Wave Optics quiz",
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      timestamp: "1 day ago",
    },
  ]

  const subjects = [
    {
      id: "physics",
      name: "Physics",
      progress: 65,
      lessons: [
        {
          id: "newtons-laws",
          title: "Newton's Laws of Motion",
          progress: 75,
          status: "In Progress",
          lastAccessed: "2 hours ago",
          quizScore: 85,
          attempts: 2,
        },
        {
          id: "wave-optics",
          title: "Wave Optics",
          progress: 40,
          status: "In Progress",
          lastAccessed: "1 day ago",
          quizScore: 72,
          attempts: 1,
        },
        {
          id: "electromagnetic-induction",
          title: "Electromagnetic Induction",
          progress: 0,
          status: "New",
          lastAccessed: "Never",
          quizScore: null,
          attempts: 0,
        },
      ],
    },
  ]

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SmartPath
                  </h1>
                  <p className="text-xs text-gray-500">Learning Platform</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Online</span>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                  <AvatarImage src="/placeholder-user.jpg" alt="Abdullah" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    AB
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{studentData.name}</p>
                  <p className="text-xs text-gray-500">
                    Class {studentData.class} • {studentData.stream}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {studentData.name}! 👋</h2>
                <p className="text-blue-100 mb-4">Ready to continue your learning journey?</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-orange-300" />
                    <span className="font-semibold">{studentData.currentStreak} day streak</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">{studentData.averageScore}% avg score</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Streak Card */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Personal Best: {studentData.personalBest}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{studentData.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="mt-4 text-xs text-orange-700 bg-orange-100 rounded-full px-3 py-1 inline-block">
                🔥 On fire! Keep it up!
              </div>
            </CardContent>
          </Card>

          {/* Study Time Card */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{studentData.totalStudyTime}h</div>
              <div className="text-sm text-gray-600">This Month</div>
              <div className="mt-2 text-xs text-green-700">+2.3h from last month</div>
            </CardContent>
          </Card>

          {/* Average Score Card */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  +{studentData.improvement}%
                </Badge>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{studentData.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
              <div className="mt-2 text-xs text-green-700">Great improvement!</div>
            </CardContent>
          </Card>

          {/* Daily Goal Card */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-purple-600 font-medium">
                  {Math.round((studentData.todayProgress / studentData.dailyGoal) * 100)}%
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {studentData.todayProgress}/{studentData.dailyGoal}h
              </div>
              <div className="text-sm text-gray-600 mb-3">Daily Goal</div>
              <Progress value={(studentData.todayProgress / studentData.dailyGoal) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-lg font-bold text-yellow-600 mb-2">Quick Start</div>
              <Link href="/lessons/newtons-laws">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                
                  Continue Learning
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Activity Chart */}
             {/* Subjects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Subjects</h2>
            <Badge variant="secondary" className="px-3 py-1">
              4 Active Subjects
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects1.map((subject, index) => {
              const IconComponent = subject.icon
              return (
                <Link key={index} href={`/subjects/${subject.name.toLowerCase()}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${subject.color}`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <Badge variant="outline" className={subject.textColor}>
                          {subject.lessons}/{subject.totalLessons} lessons
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{subject.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>

                      <Button className="w-full mt-4 group-hover:bg-blue-600 transition-colors">
                        <Brain className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

            {/* Subjects Progress */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Your Subjects</span>
                </CardTitle>
                <CardDescription>Track your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {subject.progress}% Complete
                        </Badge>
                      </div>
                      <Progress value={subject.progress} className="h-3" />

                      <div className="grid gap-4">
                        {subject.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  lesson.status === "New"
                                    ? "bg-blue-100 text-blue-600"
                                    : lesson.status === "In Progress"
                                      ? "bg-orange-100 text-orange-600"
                                      : "bg-green-100 text-green-600"
                                }`}
                              >
                                <BookOpen className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <div className="flex items-center space-x-4 mt-1">
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      lesson.status === "New"
                                        ? "bg-blue-100 text-blue-800"
                                        : lesson.status === "In Progress"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {lesson.status}
                                  </Badge>
                                  <span className="text-xs text-gray-500">Last accessed: {lesson.lastAccessed}</span>
                                  {lesson.quizScore && (
                                    <span className="text-xs text-green-600 font-medium">
                                      Quiz: {lesson.quizScore}% ({lesson.attempts} attempts)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{lesson.progress}%</div>
                                <Progress value={lesson.progress} className="w-16 h-2" />
                              </div>
                              <Link href={`/lessons/${lesson.id}`}>
                                <Button size="sm" variant="ghost">
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 ${achievement.bgColor} rounded-lg flex items-center justify-center`}>
                        <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/lessons/newtons-laws">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Continue Newton's Laws
                    </Button>
                  </Link>
                  <Link href="/quiz/wave-optics">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Trophy className="w-4 h-4 mr-2" />
                      Retake Wave Optics Quiz
                    </Button>
                  </Link>
                  <Link href="/qa">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      Ask AI Tutor
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-indigo-700">
                  <Star className="w-5 h-5" />
                  <span>Study Tip</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-indigo-600 leading-relaxed">
                  💡 <strong>Active Recall:</strong> Instead of just re-reading notes, try to explain concepts out loud
                  or write them from memory. This strengthens neural pathways and improves retention!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
