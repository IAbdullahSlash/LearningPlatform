"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, Trophy, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const quizData = {
  "newtons-laws": {
    title: "Newton's Laws of Motion Quiz",
    description: "Test your understanding of Newton's three laws",
    timeLimit: 10,
    questions: [
      {
        question: "What is Newton's First Law also known as?",
        options: ["Law of Inertia", "Law of Acceleration", "Law of Action-Reaction", "Law of Gravity"],
        correct: 0,
        explanation:
          "Newton's First Law is also known as the Law of Inertia, which describes the tendency of objects to resist changes in motion.",
      },
      {
        question:
          "According to Newton's Second Law, what happens to acceleration if mass increases while force remains constant?",
        options: [
          "Acceleration increases",
          "Acceleration decreases",
          "Acceleration stays the same",
          "Acceleration becomes zero",
        ],
        correct: 1,
        explanation:
          "Since F = ma, if force is constant and mass increases, acceleration must decrease to maintain the equation.",
      },
      {
        question: "Newton's Third Law states that forces always occur in:",
        options: ["Single actions", "Pairs", "Groups of three", "Random patterns"],
        correct: 1,
        explanation:
          "Newton's Third Law states that forces always occur in pairs - for every action, there is an equal and opposite reaction.",
      },
      {
        question: "If you push on a wall with 50N of force, how much force does the wall push back on you?",
        options: ["0N", "25N", "50N", "100N"],
        correct: 2,
        explanation:
          "According to Newton's Third Law, the wall pushes back with exactly the same force - 50N in the opposite direction.",
      },
      {
        question: "What is required to change the motion of an object according to Newton's First Law?",
        options: ["Time", "An unbalanced force", "Velocity", "Mass"],
        correct: 1,
        explanation:
          "Newton's First Law states that an unbalanced (net) force is required to change an object's motion.",
      },
      {
        question: "In the equation F = ma, what does 'a' represent?",
        options: ["Area", "Acceleration", "Amplitude", "Angle"],
        correct: 1,
        explanation: "In Newton's Second Law (F = ma), 'a' represents acceleration, the rate of change of velocity.",
      },
      {
        question: "Which of the following is an example of Newton's Third Law?",
        options: ["A ball rolling down a hill", "Walking forward", "A car braking", "An object at rest"],
        correct: 1,
        explanation:
          "Walking forward demonstrates Newton's Third Law - you push backward on the ground, and the ground pushes forward on you.",
      },
    ],
  },
  "wave-optics": {
    title: "Wave Optics Quiz",
    description: "Test your knowledge of light waves and interference",
    timeLimit: 12,
    questions: [
      {
        question: "What is the approximate wavelength range of visible light?",
        options: ["100-200 nm", "400-700 nm", "800-900 nm", "1000-1200 nm"],
        correct: 1,
        explanation: "Visible light has wavelengths approximately between 400 nm (violet) and 700 nm (red).",
      },
      {
        question: "What happens when two light waves are in phase and overlap?",
        options: ["Destructive interference", "Constructive interference", "No interference", "Reflection"],
        correct: 1,
        explanation:
          "When waves are in phase and overlap, they undergo constructive interference, creating brighter regions.",
      },
      {
        question: "Young's double-slit experiment demonstrates:",
        options: ["Particle nature of light", "Wave nature of light", "Speed of light", "Polarization"],
        correct: 1,
        explanation:
          "Young's double-slit experiment demonstrates the wave nature of light through interference patterns.",
      },
      {
        question: "Diffraction is the:",
        options: ["Reflection of light", "Bending of light around obstacles", "Speed of light", "Color of light"],
        correct: 1,
        explanation: "Diffraction is the bending or spreading of light waves around obstacles or through openings.",
      },
      {
        question: "What determines the amount of diffraction?",
        options: ["Only wavelength", "Only opening size", "Both wavelength and opening size", "Neither"],
        correct: 2,
        explanation:
          "The amount of diffraction depends on both the wavelength of light and the size of the opening or obstacle.",
      },
      {
        question: "In destructive interference, what happens to the light intensity?",
        options: ["Increases", "Decreases", "Stays the same", "Becomes polarized"],
        correct: 1,
        explanation:
          "In destructive interference, waves cancel each other out, resulting in decreased light intensity or dark regions.",
      },
      {
        question: "Which technology does NOT primarily use wave optics principles?",
        options: ["Lasers", "Optical fibers", "Holography", "Electric motors"],
        correct: 3,
        explanation: "Electric motors primarily use electromagnetic induction principles, not wave optics.",
      },
      {
        question: "What creates the colors in soap bubbles?",
        options: ["Absorption", "Interference", "Polarization", "Scattering"],
        correct: 1,
        explanation:
          "The colors in soap bubbles are created by interference between light waves reflected from the top and bottom surfaces of the thin film.",
      },
    ],
  },
  "electromagnetic-induction": {
    title: "Electromagnetic Induction Quiz",
    description: "Test your understanding of Faraday's law and electromagnetic phenomena",
    timeLimit: 15,
    questions: [
      {
        question: "What is magnetic flux measured in?",
        options: ["Tesla", "Weber", "Ampere", "Volt"],
        correct: 1,
        explanation: "Magnetic flux is measured in Weber (Wb), named after physicist Wilhelm Weber.",
      },
      {
        question: "According to Faraday's Law, EMF is induced when:",
        options: ["Magnetic field is constant", "Magnetic flux changes", "Current is steady", "Voltage is applied"],
        correct: 1,
        explanation:
          "Faraday's Law states that EMF is induced when there is a change in magnetic flux through a circuit.",
      },
      {
        question: "Lenz's Law determines:",
        options: [
          "Magnitude of induced EMF",
          "Direction of induced current",
          "Strength of magnetic field",
          "Speed of induction",
        ],
        correct: 1,
        explanation:
          "Lenz's Law determines the direction of induced current, stating it opposes the change that caused it.",
      },
      {
        question: "What principle do electric generators primarily use?",
        options: ["Ohm's Law", "Coulomb's Law", "Faraday's Law", "Newton's Laws"],
        correct: 2,
        explanation:
          "Electric generators primarily use Faraday's Law of electromagnetic induction to convert mechanical energy to electrical energy.",
      },
      {
        question: "If you move a magnet toward a coil, the induced current creates a magnetic field that:",
        options: ["Attracts the magnet", "Repels the magnet", "Has no effect", "Doubles the flux"],
        correct: 1,
        explanation:
          "According to Lenz's Law, the induced current creates a magnetic field that opposes the change, so it repels the approaching magnet.",
      },
      {
        question: "Transformers work on the principle of:",
        options: ["Electrostatics", "Electromagnetic induction", "Thermal effects", "Photoelectric effect"],
        correct: 1,
        explanation:
          "Transformers work on the principle of electromagnetic induction, using changing magnetic flux to transfer energy between circuits.",
      },
      {
        question: "What happens to induced EMF if the rate of change of flux doubles?",
        options: ["EMF halves", "EMF doubles", "EMF stays same", "EMF becomes zero"],
        correct: 1,
        explanation:
          "According to Faraday's Law, EMF is proportional to the rate of change of flux, so doubling the rate doubles the EMF.",
      },
      {
        question: "Which device does NOT use electromagnetic induction?",
        options: ["Electric motor", "Transformer", "Induction cooktop", "Solar panel"],
        correct: 3,
        explanation:
          "Solar panels use the photoelectric effect to convert light directly to electricity, not electromagnetic induction.",
      },
      {
        question: "The direction of induced current can be found using:",
        options: ["Right-hand rule only", "Left-hand rule only", "Lenz's Law", "Ohm's Law"],
        correct: 2,
        explanation:
          "Lenz's Law is used to determine the direction of induced current, stating it opposes the change causing it.",
      },
    ],
  },
}

export default function QuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const quizId = params.id as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const quiz = quizData[quizId as keyof typeof quizData]

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      handleQuizComplete()
    }
  }, [timeLeft, quizStarted, quizCompleted])

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(quiz.timeLimit * 60) // Convert minutes to seconds
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1))
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

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

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Quiz Not Found</CardTitle>
            <CardDescription>The requested quiz could not be found.</CardDescription>
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

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Trophy className="w-6 h-6 mr-2" />
                {quiz.title}
              </CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{quiz.questions.length}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{quiz.timeLimit}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">70%</div>
                  <div className="text-sm text-gray-600">Pass Score</div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={startQuiz} size="lg">
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  {passed ? (
                    <CheckCircle className="w-8 h-8 mr-2 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 mr-2 text-red-600" />
                  )}
                  Quiz Results
                </CardTitle>
                <CardDescription>
                  You scored {score} out of {quiz.questions.length} questions ({percentage}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Badge variant={passed ? "default" : "destructive"} className="text-lg px-4 py-2">
                    {passed ? "Passed!" : "Try Again"}
                  </Badge>
                </div>
                <Progress value={percentage} className="h-4 mb-4" />
                <div className="flex justify-center space-x-4">
                  <Link href={`/lessons/${quizId}`}>
                    <Button variant="outline">Review Lesson</Button>
                  </Link>
                  <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index]
                const isCorrect = userAnswer === question.correct

                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 mr-2 text-red-600" />
                        )}
                        Question {index + 1}
                      </CardTitle>
                      <CardDescription>{question.question}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correct
                                ? "bg-green-100 border border-green-300"
                                : optionIndex === userAnswer && !isCorrect
                                  ? "bg-red-100 border border-red-300"
                                  : "bg-gray-50"
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">{quiz.title}</h1>
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-lg font-mono">
                <Clock className="w-5 h-5 mr-2" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{quiz.questions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              >
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm ${
                    index === currentQuestion
                      ? "bg-blue-600 text-white"
                      : selectedAnswers[index] !== undefined && selectedAnswers[index] !== -1
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                disabled={selectedAnswers[currentQuestion] === undefined || selectedAnswers[currentQuestion] === -1}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleQuizComplete}
                disabled={selectedAnswers.some((answer) => answer === undefined || answer === -1)}
              >
                Complete Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
