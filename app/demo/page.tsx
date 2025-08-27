import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Play, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartPath Demo
            </span>
          </Link>
        </div>
      </header>

      {/* Demo Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">🎯 Interactive Demo</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Experience SmartPath
            <br />
            Learning Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore our AI-powered features, take sample quizzes, and see how SmartPath can transform your learning
            experience.
          </p>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>AI Tutor Demo</CardTitle>
                <CardDescription>
                  Chat with our AI tutor and ask questions about Physics or Mathematics concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Try AI Tutor
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Sample Quiz</CardTitle>
                <CardDescription>
                  Take a sample quiz on Newton's Laws of Motion and see your instant results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Lesson Preview</CardTitle>
                <CardDescription>Explore a complete lesson with interactive content and explanations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  View Lesson
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Demo Coming Soon!</h2>
            <p className="text-gray-600 mb-8">
              We're putting the finishing touches on our interactive demo. In the meantime, you can explore the features
              and see what SmartPath has to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Homepage
                </Button>
              </Link>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Get Notified When Ready
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
