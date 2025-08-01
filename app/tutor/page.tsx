"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, ArrowLeft, BookOpen, Lightbulb, Calculator, Beaker } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { useChat } from "ai/react"

export default function TutorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm your AI tutor, trained specifically on the CBSE curriculum. I can help you with Physics, Chemistry, Mathematics, and Biology. What would you like to learn today?",
      },
    ],
  })

  const quickQuestions = [
    { text: "Explain Newton's laws of motion", subject: "Physics", icon: Calculator },
    { text: "What is photosynthesis?", subject: "Biology", icon: BookOpen },
    { text: "Solve quadratic equations", subject: "Mathematics", icon: Calculator },
    { text: "Explain chemical bonding", subject: "Chemistry", icon: Beaker },
  ]

  const handleQuickQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
  }

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
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <span>AI Tutor</span>
            </h1>
            <p className="text-gray-600">Your personal AI assistant for CBSE curriculum</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Quick Questions</span>
                </CardTitle>
                <CardDescription>Popular questions to get you started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleQuickQuestion(question.text)}
                    >
                      <div className="flex items-start space-x-2">
                        <question.icon className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{question.text}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {question.subject}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tips for Better Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Ask specific questions about topics</p>
                  <p>• Request step-by-step solutions</p>
                  <p>• Ask for real-world examples</p>
                  <p>• Get help with problem-solving strategies</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Chat with AI Tutor</CardTitle>
                <CardDescription>Ask questions, get explanations, and receive personalized help</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-600">AI Tutor</span>
                            </div>
                          )}
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Brain className="w-4 h-4 text-blue-600 animate-pulse" />
                            <span className="text-sm text-gray-600">AI Tutor is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
