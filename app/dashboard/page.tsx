"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Trophy, Clock, Target, TrendingUp, MessageCircle, Play, FileText, Zap } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  const [selectedSubject, setSelectedSubject] = useState("physics")

  const subjects = {
    science: [
      { id: "physics", name: "Physics", progress: 65, color: "bg-blue-500" },
      { id: "chemistry", name: "Chemistry", progress: 78, color: "bg-green-500" },
      { id: "mathematics", name: "Mathematics", progress: 45, color: "bg-purple-500" },
      { id: "biology", name: "Biology", progress: 82, color: "bg-pink-500" },
    ],
  }

  const recentActivity = [
    { subject: "Physics", topic: "Wave Optics", type: "quiz", score: 85, time: "2 hours ago" },
    { subject: "Chemistry", topic: "Organic Chemistry", type: "lesson", time: "1 day ago" },
    { subject: "Mathematics", topic: "Calculus", type: "practice", score: 72, time: "2 days ago" },
  ]

  const weakAreas = [
    { subject: "Mathematics", topic: "Integration", accuracy: 45 },
    { subject: "Physics", topic: "Electromagnetic Induction", accuracy: 52 },
    { subject: "Chemistry", topic: "Chemical Kinetics", accuracy: 58 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Rahul! 👋</h1>
          <p className="text-gray-600">Ready to continue your learning journey? Let's make today count!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Streak</p>
                  <p className="text-2xl font-bold">12 days</p>
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
                  <p className="text-2xl font-bold">2.5h</p>
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
                  <p className="text-2xl font-bold">67%</p>
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
                  <p className="text-2xl font-bold">78%</p>
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
                  {subjects.science.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                        <div>
                          <h3 className="font-medium">{subject.name}</h3>
                          <p className="text-sm text-gray-600">{subject.progress}% complete</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress value={subject.progress} className="w-24" />
                        <Link href={`/subjects/${subject.id}`}>
                          <Button size="sm">Continue</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
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
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {activity.type === "quiz" && <FileText className="w-5 h-5 text-blue-600" />}
                          {activity.type === "lesson" && <Play className="w-5 h-5 text-blue-600" />}
                          {activity.type === "practice" && <Zap className="w-5 h-5 text-blue-600" />}
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
                  ))}
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
                  {weakAreas.map((area, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{area.subject}</h4>
                        <Badge variant="outline" className="text-xs">
                          {area.accuracy}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{area.topic}</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Practice Now
                      </Button>
                    </div>
                  ))}
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
                    <span>2.5 / 3.0 hours</span>
                  </div>
                  <Progress value={83} />
                  <p className="text-xs text-gray-600">You're almost there! 30 minutes to go.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
