"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, Trophy, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const lessonsData = {
  "newtons-laws": {
    title: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    difficulty: "Beginner",
    duration: "45 min",
    sections: [
      {
        title: "Introduction to Forces",
        content:
          "Forces are interactions that cause objects to accelerate. In this section, we'll explore what forces are and how they affect motion. A force is a vector quantity, meaning it has both magnitude and direction. Forces can be contact forces (like friction) or non-contact forces (like gravity).",
      },
      {
        title: "Newton's First Law",
        content:
          "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force. This is also known as the Law of Inertia. Inertia is the tendency of objects to resist changes in their motion.",
      },
      {
        title: "Newton's Second Law",
        content:
          "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is expressed as F = ma, where F is force, m is mass, and a is acceleration. This law allows us to calculate forces and predict motion.",
      },
      {
        title: "Newton's Third Law",
        content:
          "Newton's Third Law states that for every action, there is an equal and opposite reaction. When object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A. This law explains phenomena like walking, swimming, and rocket propulsion.",
      },
    ],
  },
  "wave-optics": {
    title: "Wave Optics",
    description: "Understanding light as waves and interference",
    difficulty: "Intermediate",
    duration: "60 min",
    sections: [
      {
        title: "Wave Nature of Light",
        content:
          "Light exhibits wave properties such as wavelength, frequency, and amplitude. Unlike particle models, wave optics explains phenomena like interference, diffraction, and polarization. The wavelength of visible light ranges from about 400nm (violet) to 700nm (red).",
      },
      {
        title: "Interference Patterns",
        content:
          "When two or more light waves overlap, they create interference patterns. Constructive interference occurs when waves are in phase, creating bright spots. Destructive interference occurs when waves are out of phase, creating dark spots. Young's double-slit experiment demonstrates this beautifully.",
      },
      {
        title: "Diffraction Effects",
        content:
          "Diffraction is the bending of light waves around obstacles or through openings. When light passes through a narrow slit, it spreads out and creates a diffraction pattern. The amount of diffraction depends on the wavelength of light and the size of the opening.",
      },
      {
        title: "Applications in Technology",
        content:
          "Wave optics principles are used in many technologies including lasers, optical fibers, holography, and optical instruments. Understanding wave behavior is crucial for designing cameras, telescopes, microscopes, and modern optical communication systems.",
      },
    ],
  },
  "electromagnetic-induction": {
    title: "Electromagnetic Induction",
    description: "Faraday's law and electromagnetic phenomena",
    difficulty: "Advanced",
    duration: "75 min",
    sections: [
      {
        title: "Magnetic Fields and Flux",
        content:
          "Magnetic flux is a measure of the magnetic field passing through a surface. It depends on the strength of the magnetic field, the area of the surface, and the angle between them. Flux is measured in Weber (Wb) and is fundamental to understanding electromagnetic induction.",
      },
      {
        title: "Faraday's Law",
        content:
          "Faraday's Law states that a changing magnetic flux through a circuit induces an electromotive force (EMF). The induced EMF is proportional to the rate of change of magnetic flux. This law is the foundation of electric generators, transformers, and many other electrical devices.",
      },
      {
        title: "Lenz's Law",
        content:
          "Lenz's Law determines the direction of induced current. It states that the induced current flows in a direction that opposes the change causing it. This law is a consequence of energy conservation and explains why induced currents create magnetic fields that oppose the original change.",
      },
      {
        title: "Applications and Technology",
        content:
          "Electromagnetic induction is used in power generation, electric motors, transformers, induction heating, and wireless charging. Understanding these principles is essential for electrical engineering and explains how most of our electrical power is generated and distributed.",
      },
    ],
  },
}

export default function LessonPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const lessonId = params.id as string
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

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

  const lesson = lessonsData[lessonId as keyof typeof lessonsData]

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>The requested lesson could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentSection + 1) / lesson.sections.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{lesson.difficulty}</Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
              </div>
            </div>
            <Link href={`/quiz/${lessonId}`}>
              <Button>
                <Trophy className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">
              Section {currentSection + 1} of {lesson.sections.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Lesson Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                {lesson.sections[currentSection].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{lesson.sections[currentSection].content}</p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {lesson.sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSection ? "bg-blue-600" : index < currentSection ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {currentSection < lesson.sections.length - 1 ? (
              <Button onClick={() => setCurrentSection(Math.min(lesson.sections.length - 1, currentSection + 1))}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Link href={`/quiz/${lessonId}`}>
                <Button>
                  Complete Lesson
                  <Trophy className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
