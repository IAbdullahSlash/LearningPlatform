"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Trophy,
  CheckCircle,
  XCircle,
  Brain,
  Home,
  RotateCcw,
  BookOpen,
  Play,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const quizData = {
  "newtons-laws": {
    title: "Newton's Laws of Motion Quiz",
    description: "Test your understanding of Newton's three laws",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "According to Newton's First Law, an object at rest will:",
        options: [
          "Always remain at rest",
          "Remain at rest unless acted upon by an unbalanced force",
          "Start moving after some time",
          "Move with constant acceleration",
        ],
        correct: 1,
        explanation:
          "Newton's First Law states that an object at rest stays at rest unless acted upon by an unbalanced force. This is the law of inertia.",
      },
      {
        id: 2,
        question: "If the net force acting on an object is zero, the object will:",
        options: ["Accelerate", "Decelerate", "Move with constant velocity", "Come to rest immediately"],
        correct: 2,
        explanation:
          "When net force is zero, there's no acceleration. The object continues with constant velocity (which could be zero if it was at rest).",
      },
      {
        id: 3,
        question: "Newton's Second Law is mathematically expressed as:",
        options: ["F = mv", "F = ma", "F = m/a", "F = a/m"],
        correct: 1,
        explanation: "Newton's Second Law states that Force equals mass times acceleration: F = ma.",
      },
      {
        id: 4,
        question: "If you double the mass of an object while keeping the force constant, the acceleration will:",
        options: ["Double", "Remain the same", "Be halved", "Become zero"],
        correct: 2,
        explanation:
          "From F = ma, if F is constant and m doubles, then a = F/m becomes half. Acceleration is inversely proportional to mass.",
      },
      {
        id: 5,
        question: "Newton's Third Law states that:",
        options: [
          "Force equals mass times acceleration",
          "Objects at rest stay at rest",
          "For every action, there is an equal and opposite reaction",
          "Acceleration is proportional to force",
        ],
        correct: 2,
        explanation:
          "Newton's Third Law is the action-reaction principle: for every action, there is an equal and opposite reaction.",
      },
      {
        id: 6,
        question:
          "When you walk forward, you push backward on the ground. The ground pushes forward on you. This is an example of:",
        options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Conservation of Energy"],
        correct: 2,
        explanation:
          "This is Newton's Third Law in action. Your push backward on the ground (action) results in the ground pushing forward on you (reaction).",
      },
      {
        id: 7,
        question: "A 10 kg object experiences a net force of 20 N. Its acceleration is:",
        options: ["2 m/s²", "10 m/s²", "20 m/s²", "200 m/s²"],
        correct: 0,
        explanation: "Using F = ma: a = F/m = 20 N / 10 kg = 2 m/s²",
      },
    ],
  },
  "wave-optics": {
    title: "Wave Optics Quiz",
    description: "Test your knowledge of wave properties of light",
    timeLimit: 20,
    questions: [
      {
        id: 1,
        question: "The speed of light in vacuum is:",
        options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10¹² m/s"],
        correct: 1,
        explanation: "The speed of light in vacuum is approximately 3 × 10⁸ m/s, a fundamental constant in physics.",
      },
      {
        id: 2,
        question: "In Young's double slit experiment, the bright fringes are formed due to:",
        options: ["Destructive interference", "Constructive interference", "Diffraction only", "Reflection"],
        correct: 1,
        explanation:
          "Bright fringes occur where waves from both slits arrive in phase, causing constructive interference.",
      },
      {
        id: 3,
        question: "The path difference for constructive interference is:",
        options: ["nλ", "(n + 1/2)λ", "nλ/2", "2nλ"],
        correct: 0,
        explanation:
          "For constructive interference, the path difference must be an integer multiple of wavelength: nλ where n = 0, 1, 2, ...",
      },
      {
        id: 4,
        question: "Diffraction is most pronounced when:",
        options: [
          "Obstacle size >> wavelength",
          "Obstacle size << wavelength",
          "Obstacle size ≈ wavelength",
          "Obstacle size = 2 × wavelength",
        ],
        correct: 2,
        explanation:
          "Diffraction effects are most noticeable when the obstacle or opening size is comparable to the wavelength.",
      },
      {
        id: 5,
        question: "Polarization of light proves that light waves are:",
        options: [
          "Longitudinal",
          "Transverse",
          "Both longitudinal and transverse",
          "Neither longitudinal nor transverse",
        ],
        correct: 1,
        explanation:
          "Only transverse waves can be polarized. The fact that light can be polarized proves it's a transverse wave.",
      },
      {
        id: 6,
        question:
          "According to Malus's law, if unpolarized light passes through two polarizers with axes at 60°, the transmitted intensity is:",
        options: ["I₀/4", "I₀/2", "I₀/8", "I₀/16"],
        correct: 2,
        explanation:
          "For unpolarized light: first polarizer reduces intensity to I₀/2, then Malus's law gives (I₀/2)cos²60° = (I₀/2)(1/4) = I₀/8",
      },
      {
        id: 7,
        question: "The central maximum in single slit diffraction is:",
        options: [
          "Narrower than secondary maxima",
          "Same width as secondary maxima",
          "Twice as wide as secondary maxima",
          "Four times as wide as secondary maxima",
        ],
        correct: 2,
        explanation: "In single slit diffraction, the central maximum is twice as wide as the secondary maxima.",
      },
      {
        id: 8,
        question: "Which phenomenon cannot be explained by ray optics?",
        options: ["Reflection", "Refraction", "Interference", "Image formation by mirrors"],
        correct: 2,
        explanation:
          "Interference requires the wave nature of light and cannot be explained by ray optics, which treats light as straight-line rays.",
      },
    ],
  },
  "electromagnetic-induction": {
    title: "Electromagnetic Induction Quiz",
    description: "Test your understanding of Faraday's law and electromagnetic phenomena",
    timeLimit: 25,
    questions: [
      {
        id: 1,
        question: "Faraday's law of electromagnetic induction states that induced EMF is proportional to:",
        options: ["Magnetic flux", "Rate of change of magnetic flux", "Magnetic field strength", "Area of the coil"],
        correct: 1,
        explanation:
          "Faraday's law states that induced EMF equals the negative rate of change of magnetic flux: ε = -dΦ/dt",
      },
      {
        id: 2,
        question: "The direction of induced current is given by:",
        options: ["Faraday's law", "Lenz's law", "Ohm's law", "Kirchhoff's law"],
        correct: 1,
        explanation: "Lenz's law determines the direction of induced current: it opposes the change that produced it.",
      },
      {
        id: 3,
        question: "Magnetic flux is measured in:",
        options: ["Tesla (T)", "Weber (Wb)", "Henry (H)", "Ampere (A)"],
        correct: 1,
        explanation: "Magnetic flux is measured in Weber (Wb), where 1 Wb = 1 T⋅m²",
      },
      {
        id: 4,
        question: "The motional EMF in a conductor of length L moving with velocity v in a magnetic field B is:",
        options: ["BLv", "BL/v", "Bv/L", "B/Lv"],
        correct: 0,
        explanation: "Motional EMF is given by ε = BLv, where B, L, and v are mutually perpendicular.",
      },
      {
        id: 5,
        question: "Self-inductance of a coil depends on:",
        options: [
          "Current through the coil",
          "Rate of change of current",
          "Geometry and material of the coil",
          "Resistance of the coil",
        ],
        correct: 2,
        explanation:
          "Self-inductance depends only on the physical properties: geometry of the coil and permeability of the core material.",
      },
      {
        id: 6,
        question: "The unit of inductance is:",
        options: ["Weber (Wb)", "Tesla (T)", "Henry (H)", "Farad (F)"],
        correct: 2,
        explanation: "Inductance is measured in Henry (H), where 1 H = 1 Wb/A = 1 V⋅s/A",
      },
      {
        id: 7,
        question: "In a transformer, the voltage ratio is equal to:",
        options: ["Current ratio", "Power ratio", "Turns ratio", "Resistance ratio"],
        correct: 2,
        explanation: "In an ideal transformer, the voltage ratio equals the turns ratio: V₂/V₁ = N₂/N₁",
      },
      {
        id: 8,
        question: "Energy stored in an inductor is given by:",
        options: ["½LI²", "½L²I", "LI²", "L²I²"],
        correct: 0,
        explanation: "Energy stored in an inductor is U = ½LI², similar to the energy formula for capacitors.",
      },
      {
        id: 9,
        question: "Eddy currents are reduced by:",
        options: [
          "Using solid iron cores",
          "Using laminated cores",
          "Increasing the frequency",
          "Increasing the magnetic field",
        ],
        correct: 1,
        explanation: "Laminated cores reduce eddy currents by breaking up the current paths, reducing energy losses.",
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const subject = params.subject as string
  const quiz = quizData[subject as keyof typeof quizData]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (quiz && quizStarted && !quizCompleted) {
      setTimeLeft(quiz.timeLimit * 60) // Convert minutes to seconds
    }
  }, [quiz, quizStarted, quizCompleted])

  useEffect(() => {
    if (timeLeft > 0 && quizStarted && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizStarted, quizCompleted])

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1))
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleSubmitQuiz = () => {
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
    return Math.round((correct / quiz.questions.length) * 100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const retakeQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setQuizStarted(false)
    setQuizCompleted(false)
    setShowResults(false)
    setTimeLeft(0)
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
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

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
            <p className="text-gray-600 mb-8">{quiz.description}</p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{quiz.questions.length}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{quiz.timeLimit} min</div>
                    <div className="text-sm text-gray-600">Time Limit</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Previous Best</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-yellow-800 mb-2">Quiz Instructions:</h3>
              <ul className="text-sm text-yellow-700 text-left space-y-1">
                <li>• Read each question carefully before selecting your answer</li>
                <li>• You can navigate between questions using the Next/Previous buttons</li>
                <li>• Your answers are automatically saved</li>
                <li>• Submit the quiz before time runs out</li>
                <li>• You can retake the quiz to improve your score</li>
              </ul>
            </div>

            <Button
              size="lg"
              onClick={startQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Results Screen
  if (showResults) {
    const score = calculateScore()
    const correctAnswers = quiz.questions.filter((q, i) => selectedAnswers[i] === q.correct).length

    return (
      <div className="min-h-screen bg-gray-50">
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
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  score >= 80 ? "bg-green-100" : score >= 60 ? "bg-yellow-100" : "bg-red-100"
                }`}
              >
                <Trophy
                  className={`w-10 h-10 ${
                    score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600"
                  }`}
                />
              </div>
              <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
              <p className="text-gray-600">Here are your results for {quiz.title}</p>
            </div>

            {/* Score Card */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div
                      className={`text-4xl font-bold mb-2 ${
                        score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600"
                      }`}
                    >
                      {score}%
                    </div>
                    <div className="text-sm text-gray-600">Final Score</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {quiz.questions.length - correctAnswers}
                    </div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      {formatTime(quiz.timeLimit * 60 - timeLeft)}
                    </div>
                    <div className="text-sm text-gray-600">Time Taken</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Message */}
            <Card
              className={`mb-8 ${
                score >= 80
                  ? "bg-green-50 border-green-200"
                  : score >= 60
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <CardContent className="p-6 text-center">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    score >= 80 ? "text-green-800" : score >= 60 ? "text-yellow-800" : "text-red-800"
                  }`}
                >
                  {score >= 80 ? "Excellent Work!" : score >= 60 ? "Good Job!" : "Keep Practicing!"}
                </h3>
                <p className={`${score >= 80 ? "text-green-700" : score >= 60 ? "text-yellow-700" : "text-red-700"}`}>
                  {score >= 80
                    ? "You have a strong understanding of the concepts. Great job!"
                    : score >= 60
                      ? "You're on the right track. Review the explanations below to improve."
                      : "Don't worry! Review the lesson material and try again."}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold">Detailed Results</h2>
              {quiz.questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correct
                const userAnswer = selectedAnswers[index]

                return (
                  <Card
                    key={question.id}
                    className={`${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCorrect ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">Question {index + 1}</h3>
                          <p className="mb-4">{question.question}</p>

                          <div className="space-y-2 mb-4">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded ${
                                  optionIndex === question.correct
                                    ? "bg-green-100 border border-green-300"
                                    : optionIndex === userAnswer && !isCorrect
                                      ? "bg-red-100 border border-red-300"
                                      : "bg-white border border-gray-200"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                                  <span className="text-sm">{option}</span>
                                  {optionIndex === question.correct && (
                                    <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <h4 className="font-medium text-blue-900 mb-1">Explanation:</h4>
                            <p className="text-sm text-blue-800">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={retakeQuiz} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake Quiz
              </Button>
              <Link href={`/lessons/${subject}`}>
                <Button variant="outline" size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Review Lesson
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Back to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Taking Screen
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100
  const currentQ = quiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartPath
                </span>
              </div>
              <Badge variant="outline">{quiz.title}</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className={`font-mono font-bold ${timeLeft < 300 ? "text-red-600" : "text-orange-600"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
              <CardDescription className="text-lg">{currentQ.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion]?.toString() || ""}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  {currentQuestion < quiz.questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      disabled={
                        selectedAnswers[currentQuestion] === undefined || selectedAnswers[currentQuestion] === -1
                      }
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswers.some((answer) => answer === -1 || answer === undefined)}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      Submit Quiz
                      <Trophy className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigation */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Question Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg border-2 font-medium transition-colors ${
                      index === currentQuestion
                        ? "border-blue-500 bg-blue-500 text-white"
                        : selectedAnswers[index] !== undefined && selectedAnswers[index] !== -1
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-500 bg-blue-500 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-green-500 bg-green-50 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
