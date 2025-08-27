"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, Circle, Brain, Home } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const lessonsData = {
  "newtons-laws": {
    title: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    duration: "45 min",
    difficulty: "Beginner",
    sections: [
      {
        id: 1,
        title: "Introduction to Forces",
        content: `Forces are interactions that cause objects to accelerate. A force is a vector quantity, meaning it has both magnitude and direction.

**Key Concepts:**
- Force is measured in Newtons (N)
- Forces can be contact forces (friction, normal force) or non-contact forces (gravity, electromagnetic)
- Net force determines the acceleration of an object

**Examples:**
- Pushing a book across a table (contact force)
- Earth pulling objects downward (gravitational force)
- Magnetic attraction between magnets (electromagnetic force)

Understanding forces is crucial for comprehending Newton's laws and their applications in real-world scenarios.`,
        keyPoints: [
          "Force is a vector quantity with magnitude and direction",
          "Contact forces require physical contact between objects",
          "Non-contact forces act at a distance",
          "Net force determines object's acceleration",
        ],
        completed: true,
      },
      {
        id: 2,
        title: "Newton's First Law (Law of Inertia)",
        content: `Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force.

**The Law of Inertia:**
"Every object persists in its state of rest or uniform motion in a straight line unless compelled to change by forces impressed upon it."

**Key Concepts:**
- Inertia is the tendency of objects to resist changes in motion
- Mass is a measure of inertia
- Equilibrium occurs when net force equals zero

**Real-world Examples:**
- Passengers in a car feel pushed back when the car accelerates
- A book on a table remains at rest until pushed
- A hockey puck slides on ice with minimal friction

This law explains why we need seatbelts and why objects don't spontaneously start or stop moving.`,
        keyPoints: [
          "Objects resist changes in their state of motion",
          "Inertia depends on mass",
          "Net force of zero means constant velocity",
          "Explains everyday phenomena like car safety",
        ],
        completed: true,
      },
      {
        id: 3,
        title: "Newton's Second Law (F = ma)",
        content: `Newton's Second Law quantifies the relationship between force, mass, and acceleration. It's expressed as F = ma.

**Mathematical Expression:**
F = ma
Where:
- F = Net force (Newtons)
- m = Mass (kilograms)
- a = Acceleration (m/s²)

**Key Insights:**
- Acceleration is directly proportional to net force
- Acceleration is inversely proportional to mass
- Force and acceleration are vector quantities in the same direction

**Problem-Solving Steps:**
1. Identify all forces acting on the object
2. Calculate net force (vector sum)
3. Apply F = ma to find acceleration
4. Use kinematic equations if needed

**Example:**
A 10 kg box is pushed with 50 N force. What's its acceleration?
a = F/m = 50 N / 10 kg = 5 m/s²`,
        keyPoints: [
          "F = ma is the fundamental equation of dynamics",
          "Acceleration is proportional to force, inversely proportional to mass",
          "Force and acceleration vectors point in same direction",
          "Essential for solving motion problems",
        ],
        completed: true,
      },
      {
        id: 4,
        title: "Newton's Third Law (Action-Reaction)",
        content: `Newton's Third Law states that for every action, there is an equal and opposite reaction. Forces always occur in pairs.

**The Action-Reaction Principle:**
"For every action, there is an equal and opposite reaction."

**Important Points:**
- Action and reaction forces act on different objects
- They are equal in magnitude but opposite in direction
- They occur simultaneously
- They are the same type of force

**Examples:**
- Walking: You push backward on the ground, ground pushes forward on you
- Swimming: You push water backward, water pushes you forward
- Rocket propulsion: Exhaust gases pushed down, rocket pushed up
- Book on table: Book pushes down on table, table pushes up on book

**Common Misconceptions:**
- Action-reaction pairs don't cancel because they act on different objects
- The forces are always equal, regardless of the masses involved

This law explains how we walk, how rockets work, and many other phenomena in our daily lives.`,
        keyPoints: [
          "Forces always occur in equal and opposite pairs",
          "Action and reaction act on different objects",
          "Forces are simultaneous and of the same type",
          "Explains locomotion and propulsion systems",
        ],
        completed: false,
      },
    ],
  },
  "wave-optics": {
    title: "Wave Optics",
    description: "Understanding light as a wave phenomenon",
    duration: "60 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: 1,
        title: "Wave Nature of Light",
        content: `Light exhibits both wave and particle properties, but wave optics focuses on its wave characteristics.

**Wave Properties of Light:**
- Wavelength (λ): Distance between consecutive crests
- Frequency (f): Number of waves passing a point per second
- Amplitude: Maximum displacement from equilibrium
- Speed: c = λf (in vacuum, c = 3 × 10⁸ m/s)

**Electromagnetic Spectrum:**
Light is part of the electromagnetic spectrum, with visible light ranging from approximately 400-700 nm wavelength.

**Wave Equation:**
The wave equation describes how light propagates through space and time.

Understanding light as a wave helps explain phenomena like interference, diffraction, and polarization.`,
        keyPoints: [
          "Light has wave properties: wavelength, frequency, amplitude",
          "Speed of light c = λf = 3 × 10⁸ m/s in vacuum",
          "Visible light is part of electromagnetic spectrum",
          "Wave model explains interference and diffraction",
        ],
        completed: true,
      },
      {
        id: 2,
        title: "Interference of Light",
        content: `Interference occurs when two or more light waves overlap, resulting in constructive or destructive interference.

**Types of Interference:**

**Constructive Interference:**
- Waves are in phase (crest meets crest)
- Amplitudes add up
- Results in brighter regions
- Path difference = nλ (where n = 0, 1, 2, ...)

**Destructive Interference:**
- Waves are out of phase (crest meets trough)
- Amplitudes cancel out
- Results in darker regions
- Path difference = (n + 1/2)λ

**Young's Double Slit Experiment:**
- Demonstrates wave nature of light
- Creates interference pattern with bright and dark fringes
- Fringe width β = λD/d

**Applications:**
- Anti-reflective coatings
- Interferometry for precise measurements
- Holography`,
        keyPoints: [
          "Constructive interference: waves in phase, amplitudes add",
          "Destructive interference: waves out of phase, amplitudes cancel",
          "Path difference determines interference type",
          "Young's experiment proves wave nature of light",
        ],
        completed: true,
      },
      {
        id: 3,
        title: "Diffraction of Light",
        content: `Diffraction is the bending of light waves around obstacles or through openings.

**Single Slit Diffraction:**
When light passes through a narrow slit, it spreads out and creates a diffraction pattern with a central bright fringe and alternating dark and bright fringes.

**Conditions for Diffraction:**
- Obstacle/opening size comparable to wavelength
- More pronounced with smaller openings
- Occurs with all types of waves

**Diffraction Pattern:**
- Central maximum: brightest and widest
- Secondary maxima: dimmer and narrower
- Minima occur at specific angles

**Mathematical Analysis:**
For single slit: a sin θ = nλ (for minima)
Where a = slit width, θ = angle, n = 1, 2, 3...

**Applications:**
- Diffraction gratings for spectroscopy
- Optical instruments design
- Understanding resolution limits`,
        keyPoints: [
          "Diffraction is bending of waves around obstacles",
          "Most pronounced when obstacle size ≈ wavelength",
          "Creates characteristic pattern with central maximum",
          "Important for optical instrument design",
        ],
        completed: false,
      },
      {
        id: 4,
        title: "Polarization of Light",
        content: `Polarization describes the orientation of light wave oscillations in space.

**Types of Polarization:**

**Linear Polarization:**
- Electric field oscillates in one plane
- Can be horizontal, vertical, or at any angle
- Produced by polarizing filters

**Circular Polarization:**
- Electric field rotates as wave propagates
- Can be left-handed or right-handed
- Produced by quarter-wave plates

**Unpolarized Light:**
- Natural light with random orientations
- Can be partially or completely polarized

**Malus's Law:**
I = I₀ cos²θ
Where I = transmitted intensity, I₀ = incident intensity, θ = angle between polarizers

**Applications:**
- Sunglasses reduce glare
- LCD displays
- 3D movie technology
- Stress analysis in materials
- Photography filters`,
        keyPoints: [
          "Polarization describes orientation of wave oscillations",
          "Linear, circular, and elliptical polarization types",
          "Malus's law: I = I₀ cos²θ",
          "Applications in displays, photography, and analysis",
        ],
        completed: false,
      },
    ],
  },
  "electromagnetic-induction": {
    title: "Electromagnetic Induction",
    description: "Faraday's law and electromagnetic phenomena",
    duration: "75 min",
    difficulty: "Advanced",
    sections: [
      {
        id: 1,
        title: "Faraday's Law of Electromagnetic Induction",
        content: `Faraday's law describes how changing magnetic fields induce electric fields and currents.

**Faraday's Law Statement:**
"The induced EMF in a closed circuit is equal to the negative rate of change of magnetic flux through the circuit."

**Mathematical Expression:**
ε = -dΦ/dt

Where:
- ε = induced EMF (volts)
- Φ = magnetic flux (Wb)
- t = time (s)

**Magnetic Flux:**
Φ = B·A·cos θ = BA cos θ

Where:
- B = magnetic field strength
- A = area of the loop
- θ = angle between B and normal to the surface

**Ways to Change Magnetic Flux:**
1. Change magnetic field strength (B)
2. Change area of the loop (A)
3. Change orientation (θ)
4. Move the conductor in the field

This fundamental law is the basis for generators, transformers, and many electrical devices.`,
        keyPoints: [
          "EMF induced by changing magnetic flux",
          "ε = -dΦ/dt (Faraday's law)",
          "Flux Φ = BA cos θ",
          "Foundation for electrical power generation",
        ],
        completed: false,
      },
      {
        id: 2,
        title: "Lenz's Law and Energy Conservation",
        content: `Lenz's law determines the direction of induced current and ensures energy conservation.

**Lenz's Law Statement:**
"The direction of induced current is such that it opposes the change that produced it."

**Physical Interpretation:**
- Induced current creates magnetic field opposing the change
- Ensures energy conservation in electromagnetic systems
- Explains the negative sign in Faraday's law

**Examples:**
1. **Magnet approaching coil:** Induced current creates field opposing approach
2. **Magnet moving away:** Induced current creates field opposing departure
3. **Expanding loop in field:** Current opposes flux increase
4. **Contracting loop:** Current opposes flux decrease

**Energy Considerations:**
- Work must be done against induced EMF
- Mechanical energy converts to electrical energy
- No violation of energy conservation

**Applications:**
- Eddy current brakes
- Induction heating
- Electromagnetic damping
- Generator back-EMF`,
        keyPoints: [
          "Induced current opposes the change causing it",
          "Ensures energy conservation",
          "Explains negative sign in Faraday's law",
          "Applications in braking and damping systems",
        ],
        completed: false,
      },
      {
        id: 3,
        title: "Motional EMF and Generators",
        content: `When conductors move through magnetic fields, motional EMF is induced.

**Motional EMF:**
ε = BLv

Where:
- B = magnetic field strength
- L = length of conductor
- v = velocity of conductor
- All three must be mutually perpendicular

**Derivation:**
- Moving charges experience magnetic force
- Charge separation creates electric field
- EMF develops across conductor ends

**AC Generators:**
- Rotating coil in magnetic field
- EMF varies sinusoidally: ε = ε₀ sin ωt
- Converts mechanical energy to electrical energy

**DC Generators:**
- Use commutator to reverse connections
- Produces pulsating DC output
- Requires smoothing for steady DC

**Generator Equation:**
ε = NABω sin ωt

Where:
- N = number of turns
- A = area of coil
- ω = angular velocity

**Efficiency Factors:**
- Resistance losses (I²R)
- Eddy current losses
- Hysteresis losses
- Mechanical friction`,
        keyPoints: [
          "Motional EMF: ε = BLv for moving conductors",
          "AC generators use rotating coils",
          "DC generators need commutators",
          "Multiple loss mechanisms affect efficiency",
        ],
        completed: false,
      },
      {
        id: 4,
        title: "Self and Mutual Inductance",
        content: `Inductance describes the ability of circuits to oppose changes in current.

**Self-Inductance (L):**
- Coil's ability to induce EMF in itself
- ε = -L(dI/dt)
- Measured in Henries (H)
- Depends on coil geometry and core material

**Factors Affecting Self-Inductance:**
- Number of turns (N²)
- Cross-sectional area (A)
- Length of coil (l)
- Permeability of core material (μ)

**Formula for Solenoid:**
L = μ₀n²Al = μ₀N²A/l

**Mutual Inductance (M):**
- One coil inducing EMF in another
- ε₂ = -M(dI₁/dt)
- Basis for transformers
- M₁₂ = M₂₁ (reciprocity)

**Energy Stored in Inductor:**
U = ½LI²

**Applications:**
- Transformers (mutual inductance)
- Inductors in circuits
- Energy storage devices
- Induction motors
- Wireless power transfer

**Transformer Principles:**
- Primary and secondary coils
- Voltage ratio = turns ratio
- Power conservation (ideal case)
- Step-up and step-down transformers`,
        keyPoints: [
          "Self-inductance opposes current changes in same coil",
          "Mutual inductance enables transformer operation",
          "Energy stored: U = ½LI²",
          "Applications in power systems and electronics",
        ],
        completed: false,
      },
    ],
  },
}

export default function LessonPage() {
  const params = useParams()
  const subject = params.subject as string
  const lesson = lessonsData[subject as keyof typeof lessonsData]

  const [currentSection, setCurrentSection] = useState(0)

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedSections = lesson.sections.filter((s) => s.completed).length
  const progressPercentage = (completedSections / lesson.sections.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
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
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <Badge variant="outline">{lesson.difficulty}</Badge>
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              {lesson.duration}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-gray-600 mb-4">{lesson.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>
                  {completedSections}/{lesson.sections.length} sections
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentSection === index ? "bg-blue-100 border-blue-200 border" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {section.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>
                        Section {currentSection + 1}: {lesson.sections[currentSection].title}
                      </span>
                      {lesson.sections[currentSection].completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </CardTitle>
                  </div>
                  <Badge variant={lesson.sections[currentSection].completed ? "default" : "secondary"}>
                    {lesson.sections[currentSection].completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {lesson.sections[currentSection].content}
                  </div>
                </div>

                {/* Key Points */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Key Points to Remember:
                  </h4>
                  <ul className="space-y-2">
                    {lesson.sections[currentSection].keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-blue-800">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
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
                          index === currentSection
                            ? "bg-blue-600"
                            : index < currentSection
                              ? "bg-green-500"
                              : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    {!lesson.sections[currentSection].completed && (
                      <Button variant="outline">
                        Mark as Complete
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {currentSection < lesson.sections.length - 1 ? (
                      <Button
                        onClick={() => setCurrentSection(Math.min(lesson.sections.length - 1, currentSection + 1))}
                      >
                        Next Section
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Link href={`/quiz/${subject}`}>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Take Quiz
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
