"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, HelpCircle, BookOpen, Zap, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const qaData = [
  {
    id: 1,
    question: "What is the difference between mass and weight?",
    answer:
      "Mass is the amount of matter in an object and remains constant everywhere. Weight is the force of gravity acting on that mass and varies with gravitational field strength. Mass is measured in kilograms, weight in Newtons.",
    category: "Mechanics",
    tags: ["mass", "weight", "gravity", "force"],
  },
  {
    id: 2,
    question: "How do you calculate acceleration using Newton's Second Law?",
    answer:
      "Acceleration is calculated using a = F/m, where F is the net force and m is the mass. This comes from rearranging Newton's Second Law (F = ma). The units are m/s².",
    category: "Mechanics",
    tags: ["acceleration", "force", "newton", "calculation"],
  },
  {
    id: 3,
    question: "What causes objects to fall at the same rate in a vacuum?",
    answer:
      "In a vacuum, all objects fall at the same rate because there's no air resistance. The acceleration due to gravity (9.8 m/s²) is independent of mass, as shown by Galileo's experiments.",
    category: "Mechanics",
    tags: ["gravity", "vacuum", "galileo", "falling"],
  },
  {
    id: 4,
    question: "What is the wavelength of red light?",
    answer:
      "Red light has a wavelength of approximately 700 nanometers (nm). This is at the longer wavelength end of the visible light spectrum.",
    category: "Optics",
    tags: ["wavelength", "red", "light", "spectrum"],
  },
  {
    id: 5,
    question: "How does Young's double-slit experiment work?",
    answer:
      "Light passes through two parallel slits and creates an interference pattern on a screen. Where waves from both slits arrive in phase, you get bright fringes (constructive interference). Where they arrive out of phase, you get dark fringes (destructive interference).",
    category: "Optics",
    tags: ["young", "interference", "double-slit", "waves"],
  },
  {
    id: 6,
    question: "What is diffraction and when does it occur?",
    answer:
      "Diffraction is the bending of waves around obstacles or through openings. It's most noticeable when the wavelength is comparable to the size of the obstacle or opening. This explains why you can hear around corners but not see around them.",
    category: "Optics",
    tags: ["diffraction", "waves", "bending", "obstacles"],
  },
  {
    id: 7,
    question: "What is Faraday's Law of Electromagnetic Induction?",
    answer:
      "Faraday's Law states that the induced EMF in a circuit is proportional to the rate of change of magnetic flux through the circuit. Mathematically: EMF = -dΦ/dt, where Φ is magnetic flux.",
    category: "Electromagnetism",
    tags: ["faraday", "induction", "emf", "flux"],
  },
  {
    id: 8,
    question: "What determines the direction of induced current?",
    answer:
      "Lenz's Law determines the direction of induced current. It states that the induced current flows in a direction that opposes the change that caused it. This is a consequence of energy conservation.",
    category: "Electromagnetism",
    tags: ["lenz", "current", "direction", "opposition"],
  },
  {
    id: 9,
    question: "How do electric generators work?",
    answer:
      "Electric generators convert mechanical energy to electrical energy using electromagnetic induction. A coil rotates in a magnetic field (or vice versa), changing the magnetic flux and inducing an EMF according to Faraday's Law.",
    category: "Electromagnetism",
    tags: ["generator", "mechanical", "electrical", "rotation"],
  },
  {
    id: 10,
    question: "What is magnetic flux?",
    answer:
      "Magnetic flux is a measure of the magnetic field passing through a surface. It depends on the field strength, the area, and the angle between them. Flux = B × A × cos(θ), measured in Weber (Wb).",
    category: "Electromagnetism",
    tags: ["flux", "magnetic", "field", "weber"],
  },
  {
    id: 11,
    question: "Why do we see colors in soap bubbles?",
    answer:
      "Colors in soap bubbles result from thin-film interference. Light reflects from both the top and bottom surfaces of the soap film. Depending on the film thickness, different wavelengths interfere constructively or destructively, creating the colorful patterns.",
    category: "Optics",
    tags: ["colors", "interference", "thin-film", "bubbles"],
  },
  {
    id: 12,
    question: "What is the relationship between frequency and wavelength?",
    answer:
      "Frequency and wavelength are inversely related: c = fλ, where c is the speed of light, f is frequency, and λ is wavelength. Higher frequency means shorter wavelength, and vice versa.",
    category: "Optics",
    tags: ["frequency", "wavelength", "speed", "light"],
  },
  {
    id: 13,
    question: "How do transformers work?",
    answer:
      "Transformers use electromagnetic induction to change voltage levels. An alternating current in the primary coil creates a changing magnetic field, which induces a voltage in the secondary coil. The voltage ratio equals the turns ratio.",
    category: "Electromagnetism",
    tags: ["transformer", "voltage", "coil", "turns"],
  },
  {
    id: 14,
    question: "What is inertia?",
    answer:
      "Inertia is the tendency of objects to resist changes in their motion. Objects at rest tend to stay at rest, and objects in motion tend to stay in motion at constant velocity, unless acted upon by an unbalanced force.",
    category: "Mechanics",
    tags: ["inertia", "motion", "rest", "resistance"],
  },
  {
    id: 15,
    question: "Why can't you see light waves with the naked eye?",
    answer:
      "You can't see individual light waves because their wavelength (400-700 nm) is much smaller than what our eyes can resolve. We see the overall effect of many waves, but not the wave structure itself. Special equipment is needed to observe wave properties directly.",
    category: "Optics",
    tags: ["waves", "wavelength", "vision", "resolution"],
  },
]

export default function QAPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

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

  const categories = ["All", ...Array.from(new Set(qaData.map((item) => item.category)))]

  const filteredQA = qaData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                <h1 className="text-2xl font-bold">Q&A Helper</h1>
                <p className="text-gray-600">Find answers to common Physics questions</p>
              </div>
            </div>
            <Badge variant="secondary">{filteredQA.length} Questions</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search questions, answers, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
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

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{qaData.length}</div>
              <p className="text-xs text-muted-foreground">Predefined answers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length - 1}</div>
              <p className="text-xs text-muted-foreground">Physics topics</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Search Results</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredQA.length}</div>
              <p className="text-xs text-muted-foreground">Matching questions</p>
            </CardContent>
          </Card>
        </div>

        {/* Q&A List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Physics Q&A Database
            </CardTitle>
            <CardDescription>
              Browse through our collection of commonly asked Physics questions and detailed answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredQA.length === 0 ? (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredQA.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start justify-between w-full mr-4">
                        <span className="font-medium">{item.question}</span>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {item.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
