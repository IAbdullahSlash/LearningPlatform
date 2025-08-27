# SmartPath Learning Platform

A modern, personalized learning platform designed for Class 12 Science students, featuring interactive lessons, smart quizzes, and comprehensive analytics.

## ✨ Features

- **Personalized Dashboard** - Track progress, streaks, and achievements
- **Interactive Physics Lessons** - Comprehensive content with progress tracking
- **Smart Quizzes** - Adaptive testing with detailed analytics
- **Study Analytics** - Weekly activity charts and performance insights
- **Q&A Helper** - Instant answers to physics questions
- **Achievement System** - Gamified learning with badges and streaks
- **Responsive Design** - Works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 8.0 or later

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd smartpath-learning-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
smartpath-learning-platform/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Student dashboard
│   ├── lessons/           # Interactive lessons
│   ├── quiz/              # Quiz system
│   ├── qa/                # Q&A helper
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── public/               # Static assets
\`\`\`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🎨 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Icons**: Lucide React
- **Animations**: Tailwind CSS + Custom CSS

## 📊 Features Overview

### Dashboard
- Personal welcome with student info
- Study streak tracking
- Weekly activity charts
- Performance analytics
- Recent achievements

### Lessons
- Interactive physics content
- Progress tracking
- Section-based learning
- Difficulty levels

### Quizzes
- Adaptive questioning
- Score tracking
- Retry functionality
- Performance analytics

### Analytics
- Study time tracking
- Progress visualization
- Achievement system
- Goal setting

## 🎯 Student Profile

The platform is currently configured for:
- **Student**: Abdullah
- **Class**: 12 Science Stream
- **Subjects**: Physics (Phase 1)
- **Progress**: Active learning with streak tracking

## 🔧 Customization

The platform can be easily customized for different:
- Students and classes
- Subjects and curricula
- Learning paths
- Assessment types

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

The platform is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting service

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the repository.
