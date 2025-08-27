"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, FileText, Brain, Clock, CheckCircle, Circle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const [selectedChapter, setSelectedChapter] = useState(0)

  const subjectData = {
    physics: {
      name: "Physics",
      progress: 65,
      chapters: [
        {
          id: 1,
          title: "Wave Optics",
          progress: 100,
          topics: 8,
          completed: 8,
          difficulty: "Medium",
          estimatedTime: "2 hours",
        },
        {
          id: 2,
          title: "Electromagnetic Induction",
          progress: 60,
          topics: 6,
          completed: 4,
          difficulty: "Hard",
          estimatedTime: "3 hours",
        },
        {
          id: 3,
          title: "Alternating Current",
          progress: 30,
          topics: 7,
          completed: 2,
          difficulty: "Medium",
          estimatedTime: "2.5 hours",
        },
        {
          id: 4,
          title: "Electromagnetic Waves",
          progress: 0,
          topics: 5,
          completed: 0,
          difficulty: "Easy",
          estimatedTime: "1.5 hours",
        },
      ],
    },
  }

  const subject = subjectData[params.subject as keyof typeof subjectData] || subjectData.physics

  const currentChapter = subject.chapters[selectedChapter]

  const learningMaterials = [
    { type: "concept", title: "Introduction to Wave Optics", duration: "15 min", completed: true },
    { type: "video", title: "Huygens Principle Explained", duration: "20 min", completed: true },
    { type: "example", title: "Interference of Light Waves", duration: "10 min", completed: false },
    { type: "quiz", title: "Wave Optics Quiz", duration: "15 min", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{subject.name}</h1>
            <p className="text-gray-600">Class 12 • Science Stream</p>
          </div>
        </div>

        {/* Subject Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{subject.progress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {subject.chapters.filter((c) => c.progress === 100).length}
                </div>
                <div className="text-sm text-gray-600">Completed Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{subject.chapters.length}</div>
                <div className="text-sm text-gray-600">Total Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">78%</div>
                <div className="text-sm text-gray-600">Quiz Average</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Chapters</CardTitle>
                <CardDescription>Select a chapter to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subject.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedChapter === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedChapter(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-sm">{chapter.title}</h3>
                        {chapter.progress === 100 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <Progress value={chapter.progress} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>
                          {chapter.completed}/{chapter.topics} topics
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {chapter.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chapter Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentChapter.title}</CardTitle>
                    <CardDescription>
                      {currentChapter.topics} topics • {currentChapter.estimatedTime} estimated time
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      currentChapter.difficulty === "Easy"
                        ? "default"
                        : currentChapter.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {currentChapter.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="learn" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="assess">Assess</TabsTrigger>
                  </TabsList>

                  <TabsContent value="learn" className="space-y-4">
                    <div className="space-y-3">
                      {learningMaterials.map((material, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              {material.type === "concept" && <BookOpen className="w-5 h-5 text-blue-600" />}
                              {material.type === "video" && <Play className="w-5 h-5 text-blue-600" />}
                              {material.type === "example" && <FileText className="w-5 h-5 text-blue-600" />}
                              {material.type === "quiz" && <Brain className="w-5 h-5 text-blue-600" />}
                            </div>
                            <div>
                              <h3 className="font-medium">{material.title}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-3 h-3" />
                                <span>{material.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {material.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                            <Button size="sm" variant={material.completed ? "outline" : "default"}>
                              {material.completed ? "Review" : "Start"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="practice" className="space-y-4">
                    <div className="text-center py-8">
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Practice Problems</h3>
                      <p className="text-gray-600 mb-4">Solve practice problems to reinforce your understanding</p>
                      <Link href="/quiz/newtons-laws">
                      <Button>Start Practice Session</Button>
                      </Link>
                    </div>
                  </TabsContent>

                  <TabsContent value="assess" className="space-y-4">
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Chapter Assessment</h3>
                      <p className="text-gray-600 mb-4">Test your knowledge with a comprehensive quiz</p>
                      <Link href={`/quiz/${params.subject}/${currentChapter.id}`}>
                        <Button>Take Quiz</Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
