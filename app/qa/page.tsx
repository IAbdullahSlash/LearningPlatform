"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Brain, Home, ArrowLeft, BookOpen, Lightbulb, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const qaData = [
  {
    id: 1,
    question: "What is Newton's First Law of Motion?",
    answer:
      "Newton's First Law, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force. This law explains why passengers in a car feel pushed backward when the car suddenly accelerates forward.",
    category: "Mechanics",
    tags: ["Newton's Laws", "Inertia", "Force"],
    difficulty: "Beginner",
  },
  {
    id: 2,
    question: "How do you calculate force using Newton's Second Law?",
    answer:
      "Newton's Second Law is expressed as F = ma, where F is the net force in Newtons, m is the mass in kilograms, and a is the acceleration in m/s². For example, if a 10 kg object accelerates at 5 m/s², the net force would be F = 10 × 5 = 50 N.",
    category: "Mechanics",
    tags: ["Newton's Laws", "Force", "Acceleration"],
    difficulty: "Beginner",
  },
  {
    id: 3,
    question: "What is the difference between constructive and destructive interference?",
    answer:
      "Constructive interference occurs when two waves meet in phase (crest meets crest), resulting in a wave with greater amplitude. Destructive interference occurs when waves meet out of phase (crest meets trough), resulting in reduced or zero amplitude. In Young's double-slit experiment, bright fringes result from constructive interference, while dark fringes result from destructive interference.",
    category: "Optics",
    tags: ["Wave Optics", "Interference", "Young's Experiment"],
    difficulty: "Intermediate",
  },
  {
    id: 4,
    question: "What is Faraday's Law of Electromagnetic Induction?",
    answer:
      "Faraday's Law states that the induced EMF in a closed circuit is equal to the negative rate of change of magnetic flux through the circuit. Mathematically, ε = -dΦ/dt, where ε is the induced EMF and Φ is the magnetic flux. This law is fundamental to the operation of generators, transformers, and many electrical devices.",
    category: "Electromagnetism",
    tags: ["Faraday's Law", "EMF", "Magnetic Flux"],
    difficulty: "Advanced",
  },
  {
    id: 5,
    question: "Why does diffraction occur?",
    answer:
      "Diffraction occurs when waves encounter obstacles or openings that are comparable in size to their wavelength. The wave bends around the obstacle or spreads out after passing through the opening. This is most pronounced when the obstacle or opening size is similar to the wavelength of the wave. Diffraction demonstrates the wave nature of light.",
    category: "Optics",
    tags: ["Wave Optics", "Diffraction", "Wavelength"],
    difficulty: "Intermediate",
  },
  {
    id: 6,
    question: "What is Lenz's Law and why is it important?",
    answer:
      "Lenz's Law states that the direction of induced current is such that it opposes the change that produced it. This law ensures energy conservation in electromagnetic systems. For example, when a magnet approaches a coil, the induced current creates a magnetic field that opposes the magnet's approach, requiring work to be done against this opposition.",
    category: "Electromagnetism",
    tags: ["Lenz's Law", "Induced Current", "Energy Conservation"],
    difficulty: "Advanced",
  },
  {
    id: 7,
    question: "What is the relationship between wavelength, frequency, and speed of light?",
    answer:
      "The relationship is given by c = λf, where c is the speed of light (3 × 10⁸ m/s in vacuum), λ (lambda) is the wavelength, and f is the frequency. This means that as frequency increases, wavelength decreases, and vice versa, while the speed remains constant in a given medium.",
    category: "Optics",
    tags: ["Wave Properties", "Speed of Light", "Frequency"],
    difficulty: "Beginner",
  },
  {
    id: 8,
    question: "How does polarization prove that light is a transverse wave?",
    answer:
      "Polarization can only occur with transverse waves, not longitudinal waves. Since light can be polarized (using polarizing filters), this proves that light waves are transverse. In polarized light, the electric field oscillations are restricted to a single plane perpendicular to the direction of wave propagation.",
    category: "Optics",
    tags: ["Polarization", "Transverse Waves", "Wave Nature"],
    difficulty: "Intermediate",
  },
  {
    id: 9,
    question: "What is motional EMF?",
    answer:
      "Motional EMF is the EMF induced in a conductor moving through a magnetic field. It's given by ε = BLv, where B is the magnetic field strength, L is the length of the conductor, and v is its velocity. All three quantities must be mutually perpendicular. This principle is used in generators to convert mechanical energy into electrical energy.",
    category: "Electromagnetism",
    tags: ["Motional EMF", "Magnetic Field", "Generators"],
    difficulty: "Advanced",
  },
  {
    id: 10,
    question: "What are action-reaction pairs in Newton's Third Law?",
    answer:
      "Newton's Third Law states that for every action, there is an equal and opposite reaction. These forces always act on different objects, are equal in magnitude, opposite in direction, and occur simultaneously. For example, when you walk, you push backward on the ground (action), and the ground pushes forward on you (reaction).",
    category: "Mechanics",
    tags: ["Newton's Laws", "Action-Reaction", "Force Pairs"],
    difficulty: "Beginner",
  },
  {
    id: 11,
    question: "What is self-inductance?",
    answer:
      "Self-inductance is the property of a coil to induce an EMF in itself when the current through it changes. It's measured in Henries (H) and given by ε = -L(dI/dt), where L is the self-inductance. It depends on the coil's geometry, number of turns, and the permeability of the core material.",
    category: "Electromagnetism",
    tags: ["Self-Inductance", "Inductance", "Coils"],
    difficulty: "Advanced",
  },
  {
    id: 12,
    question: "How does Young's double-slit experiment work?",
    answer:
      "In Young's experiment, light passes through two parallel slits and creates an interference pattern on a screen. When light from both slits arrives in phase at a point, constructive interference creates a bright fringe. When they arrive out of phase, destructive interference creates a dark fringe. This experiment demonstrates the wave nature of light.",
    category: "Optics",
    tags: ["Young's Experiment", "Interference", "Double Slit"],
    difficulty: "Intermediate",
  },
  {
    id: 13,
    question: "What is the difference between mass and weight?",
    answer:
      "Mass is the amount of matter in an object and is measured in kilograms. It remains constant regardless of location. Weight is the gravitational force acting on an object and is measured in Newtons. Weight = mg, where g is the acceleration due to gravity. Weight varies with location (different on Earth vs. Moon), but mass stays the same.",
    category: "Mechanics",
    tags: ["Mass", "Weight", "Gravity"],
    difficulty: "Beginner",
  },
  {
    id: 14,
    question: "How do transformers work?",
    answer:
      "Transformers work on the principle of mutual inductance. They consist of primary and secondary coils wound around a common iron core. When AC current flows through the primary coil, it creates a changing magnetic flux that induces EMF in the secondary coil. The voltage ratio equals the turns ratio: V₂/V₁ = N₂/N₁.",
    category: "Electromagnetism",
    tags: ["Transformers", "Mutual Inductance", "AC Current"],
    difficulty: "Advanced",
  },
  {
    id: 15,
    question: "What is Malus's Law?",
    answer:
      "Malus's Law describes the intensity of polarized light after passing through a polarizing filter. It states that I = I₀cos²θ, where I is the transmitted intensity, I₀ is the incident intensity, and θ is the angle between the transmission axes of the polarizer and analyzer. This law is fundamental in understanding polarization phenomena.",
    category: "Optics",
    tags: ["Malus's Law", "Polarization", "Light Intensity"],
    difficulty: "Intermediate",
  },
]

const categories = ["All", "Mechanics", "Optics", "Electromagnetism"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function QAPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredQA = qaData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || item.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mechanics":
        return <BookOpen className="w-4 h-4" />
      case "Optics":
        return <Lightbulb className="w-4 h-4" />
      case "Electromagnetism":
        return <Brain className="w-4 h-4" />
      default:
        return <HelpCircle className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartPath
              </span>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Physics Q&A Database</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common physics questions covering mechanics, optics, and electromagnetism. Perfect for Class
            12 students preparing for exams.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search questions, answers, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <div className="flex space-x-1">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Difficulty:</span>
                  <div className="flex space-x-1">
                    {difficulties.map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredQA.length} of {qaData.length} questions
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedDifficulty !== "All" && ` (${selectedDifficulty} level)`}
          </p>
        </div>

        {/* Q&A List */}
        {filteredQA.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredQA.map((item) => (
              <AccordionItem key={item.id} value={item.id.toString()}>
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-start space-x-4 text-left w-full">
                      <div className="flex-shrink-0 mt-1">{getCategoryIcon(item.category)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="flex items-center space-x-1">
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                          </Badge>
                          <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-6 pb-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Answer:</h4>
                        <p className="text-blue-800 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedDifficulty("All")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Need More Help?
            </CardTitle>
            <CardDescription>
              Can't find the answer you're looking for? Here are some additional resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Review Lessons
                </Button>
              </Link>
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
