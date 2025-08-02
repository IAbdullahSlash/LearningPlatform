"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { useQuizResults } from "@/hooks/useQuizResults"
import { useProgress } from "@/hooks/useProgress"

export default function QuizPage({ params }: { params: { subject: string; chapter: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false)

  const { saveQuizResult } = useQuizResults()
  const { updateProgress } = useProgress()

  const questions = [
    {
      id: 1,
      question: "What is the principle behind the working of optical fibers?",
      options: ["Total internal reflection", "Refraction", "Diffraction", "Interference"],
      correct: 0,
      explanation:
        "Optical fibers work on the principle of total internal reflection, where light rays are trapped inside the fiber core and transmitted with minimal loss.",
    },
    {
      id: 2,
      question:
        "In Young's double slit experiment, what happens to the fringe width when the distance between slits is increased?",
      options: ["Increases", "Decreases", "Remains same", "First increases then decreases"],
      correct: 1,
      explanation:
        "Fringe width is inversely proportional to the distance between slits. When distance between slits increases, fringe width decreases.",
    },
    {
      id: 3,
      question: "Which phenomenon is responsible for the blue color of the sky?",
      options: ["Reflection", "Refraction", "Scattering", "Absorption"],
      correct: 2,
      explanation:
        "The blue color of the sky is due to Rayleigh scattering of sunlight by small particles in the atmosphere. Blue light scatters more than other colors.",
    },
    {
      id: 4,
      question: "What is the condition for constructive interference in thin films?",
      options: ["2nt = mλ", "2nt = (m + 1/2)λ", "nt = mλ", "nt = (m + 1/2)λ"],
      correct: 0,
      explanation:
        "For constructive interference in thin films, the optical path difference should be an integral multiple of wavelength: 2nt = mλ",
    },
    {
      id: 5,
      question: "In a polaroid, what percentage of unpolarized light is transmitted?",
      options: ["100%", "75%", "50%", "25%"],
      correct: 2,
      explanation:
        "When unpolarized light passes through a polaroid, only 50% of the light is transmitted as the polaroid blocks one component of the electric field.",
    },
  ]

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizStarted, showResults])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setTimeLeft(600)
    setSelectedAnswer("")
  }

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    setSelectedAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handleSubmitQuiz = async () => {
    const finalAnswers = [...answers]
    if (selectedAnswer) {
      finalAnswers[currentQuestion] = selectedAnswer
    }
    setAnswers(finalAnswers)

    // Calculate score
    let correctCount = 0
    finalAnswers.forEach((answer, index) => {
      if (Number.parseInt(answer) === questions[index].correct) {
        correctCount++
      }
    })

    const score = correctCount
    const percentage = Math.round((score / questions.length) * 100)

    // Save quiz result to database
    await saveQuizResult(
      params.subject,
      params.chapter,
      score,
      questions.length,
      finalAnswers.map((answer, index) => ({
        questionId: questions[index].id,
        selectedAnswer: Number.parseInt(answer),
        correctAnswer: questions[index].correct,
        isCorrect: Number.parseInt(answer) === questions[index].correct,
      })),
    )

    // Update progress - mark as completed if score >= 70%
    const passed = percentage >= 70
    await updateProgress(params.subject, params.chapter, passed, score)

    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (Number.parseInt(answer) === questions[index].correct) {
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

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Link href={`/subjects/${params.subject}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Subject
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {params.chapter.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Quiz
                </CardTitle>
                <CardDescription>
                  Test your understanding of {params.chapter.replace(/-/g, " ")} concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">70%</div>
                    <div className="text-sm text-gray-600">Pass Mark</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Instructions:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>You have 10 minutes to complete the quiz</li>
                    <li>Each question has only one correct answer</li>
                    <li>You need 70% to pass and complete this chapter</li>
                    <li>Your progress will be saved automatically</li>
                    <li>Click "Start Quiz" when you're ready</li>
                  </ul>
                </div>

                <Button onClick={startQuiz} className="w-full" size="lg">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    passed ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {passed ? (
                    <Trophy className="w-8 h-8 text-green-600" />
                  ) : (
                    <RotateCcw className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {passed ? "Congratulations! Chapter Completed!" : "Keep Learning!"}
                </CardTitle>
                <CardDescription>
                  You scored {score} out of {questions.length} questions ({percentage}%)
                  {passed ? " - Your progress has been saved!" : " - Try again to complete this chapter"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {score}/{questions.length}
                    </div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{percentage}%</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatTime(600 - timeLeft)}</div>
                    <div className="text-sm text-gray-600">Time Taken</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Review Your Answers</h3>
                  {questions.map((question, index) => {
                    const userAnswer = Number.parseInt(answers[index] || "-1")
                    const isCorrect = userAnswer === question.correct

                    return (
                      <Card
                        key={question.id}
                        className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">
                              Q{index + 1}. {question.question}
                            </h4>
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            )}
                          </div>

                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded text-sm ${
                                  optionIndex === question.correct
                                    ? "bg-green-100 text-green-800"
                                    : optionIndex === userAnswer
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                                  <span>{option}</span>
                                  {optionIndex === question.correct && (
                                    <Badge variant="default" className="ml-auto">
                                      Correct
                                    </Badge>
                                  )}
                                  {optionIndex === userAnswer && optionIndex !== question.correct && (
                                    <Badge variant="destructive" className="ml-auto">
                                      Your Answer
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <Link href={`/subjects/${params.subject}`}>
                    <Button variant="outline">Back to Subject</Button>
                  </Link>
                  {!passed && <Button onClick={startQuiz}>Retake Quiz</Button>}
                  {passed && (
                    <Link href="/dashboard">
                      <Button>Continue Learning</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {params.chapter.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Quiz
              </h1>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className={`font-mono ${timeLeft < 60 ? "text-red-600" : "text-gray-600"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Badge variant="outline">
                {currentQuestion + 1}/{questions.length}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-8" />

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{questions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RadioGroupItem value={optionIndex.toString()} id={`option-${optionIndex}`} />
                      <Label htmlFor={`option-${optionIndex}`} className="flex-1 cursor-pointer">
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
                  {currentQuestion === questions.length - 1 ? "Submit Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
