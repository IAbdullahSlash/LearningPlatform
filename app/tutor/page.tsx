"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI tutor. I can help you with Physics and Mathematics questions. What would you like to learn about today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Predefined responses for Phase 1 (no real AI yet)
  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("newton") || lowerQuestion.includes("force")) {
      return "Newton's laws are fundamental to understanding motion:\n\n1. First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.\n\n2. Second Law: F = ma (Force equals mass times acceleration)\n\n3. Third Law: For every action, there is an equal and opposite reaction.\n\nWould you like me to explain any of these in more detail?"
    }

    if (lowerQuestion.includes("quadratic") || lowerQuestion.includes("equation")) {
      return "A quadratic equation has the form ax² + bx + c = 0, where a ≠ 0.\n\nYou can solve it using:\n1. Factoring\n2. Completing the square\n3. Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\nThe discriminant (b²-4ac) tells us about the nature of roots:\n- Positive: Two real roots\n- Zero: One real root\n- Negative: Two complex roots\n\nWould you like to work through an example?"
    }

    if (lowerQuestion.includes("trigonometry") || lowerQuestion.includes("sin") || lowerQuestion.includes("cos")) {
      return "Trigonometry deals with relationships between angles and sides in triangles.\n\nBasic ratios:\n- sin θ = opposite/hypotenuse\n- cos θ = adjacent/hypotenuse\n- tan θ = opposite/adjacent\n\nKey angles to remember:\n- sin 30° = 1/2, cos 30° = √3/2\n- sin 45° = cos 45° = 1/√2\n- sin 60° = √3/2, cos 60° = 1/2\n\nWhat specific trigonometry topic would you like to explore?"
    }

    if (lowerQuestion.includes("energy") || lowerQuestion.includes("work")) {
      return "Work and Energy are closely related concepts:\n\nWork (W) = Force × Distance × cos(θ)\n- Measured in Joules (J)\n- Only done when there's displacement\n\nKinetic Energy (KE) = ½mv²\nPotential Energy (PE) = mgh\n\nWork-Energy Theorem: Work done = Change in kinetic energy\n\nConservation of Energy: Energy cannot be created or destroyed, only transformed.\n\nWould you like to solve some problems involving these concepts?"
    }

    if (lowerQuestion.includes("coordinate") || lowerQuestion.includes("geometry")) {
      return "Coordinate Geometry combines algebra and geometry:\n\nKey formulas:\n- Distance: d = √[(x₂-x₁)² + (y₂-y₁)²]\n- Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)\n- Slope: m = (y₂-y₁)/(x₂-x₁)\n\nLine equations:\n- Point-slope: y - y₁ = m(x - x₁)\n- Slope-intercept: y = mx + b\n- Standard form: Ax + By + C = 0\n\nWhat specific coordinate geometry problem are you working on?"
    }

    if (lowerQuestion.includes("friction")) {
      return "Friction is a force that opposes motion:\n\nTypes:\n1. Static friction (fs ≤ μsN) - prevents motion\n2. Kinetic friction (fk = μkN) - opposes motion\n\nWhere:\n- μs = coefficient of static friction\n- μk = coefficient of kinetic friction\n- N = normal force\n\nNote: μs > μk (static friction is usually greater than kinetic)\n\nFriction always acts parallel to the surface and opposite to the direction of motion or intended motion.\n\nWould you like to solve a friction problem?"
    }

    // Default response
    return "That's an interesting question! For Phase 1, I have predefined responses for topics like:\n\n📚 Physics:\n- Newton's Laws\n- Forces and Friction\n- Work and Energy\n\n📐 Mathematics:\n- Quadratic Equations\n- Trigonometry\n- Coordinate Geometry\n\nTry asking me about any of these topics, and I'll provide detailed explanations!"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(input),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">AI Tutor</h1>
          <p className="text-gray-600 mt-2">Get help with Physics and Mathematics concepts</p>
        </div>

        <Card className="max-w-4xl mx-auto h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              SmartPath AI Tutor
            </CardTitle>
            <CardDescription>Ask me anything about Physics or Mathematics!</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about Physics or Mathematics..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
