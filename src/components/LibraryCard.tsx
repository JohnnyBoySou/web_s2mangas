import { Play, Heart, BookOpen, CheckCircle, Clock } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"

interface LibraryCardProps {
  title: string
  author: string
  type: "liked" | "completed" | "following" | "reading"
  progress?: number
  totalChapters?: number
  currentChapter?: number
  gradient: "purple" | "blue" | "orange" | "pink" | "green" | "red"
  onClick?: () => void
}

const gradientClasses = {
  purple: "bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-600",
  blue: "bg-gradient-to-br from-blue-400 via-blue-600 to-cyan-600", 
  orange: "bg-gradient-to-br from-orange-400 via-orange-600 to-red-600",
  pink: "bg-gradient-to-br from-pink-400 via-pink-600 to-rose-600",
  green: "bg-gradient-to-br from-green-400 via-green-600 to-emerald-600",
  red: "bg-gradient-to-br from-red-400 via-red-600 to-pink-600"
}

const typeIcons = {
  liked: Heart,
  completed: CheckCircle,
  following: BookOpen,
  reading: Clock
}

const typeLabels = {
  liked: "Curtido",
  completed: "Completo", 
  following: "Seguindo",
  reading: "Lendo"
}

export function LibraryCard({ 
  title, 
  author, 
  type, 
  progress = 0, 
  totalChapters = 0, 
  currentChapter = 0,
  gradient,
  onClick 
}: LibraryCardProps) {
  const Icon = typeIcons[type]
  
  return (
    <div 
      className="group relative h-64 cursor-pointer overflow-hidden rounded-xl transition-all hover:scale-105"
      onClick={onClick}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${gradientClasses[gradient]}`} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-black/30" />
      
      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-6 text-white">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Icon className="mr-1 h-3 w-3" />
            {typeLabels[type]}
          </Badge>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/20 p-0 opacity-0 transition-all hover:bg-white/30 group-hover:opacity-100"
          >
            <Play className="h-4 w-4" fill="currentColor" />
          </Button>
        </div>

        {/* Progress Info */}
        {type === "reading" && progress > 0 && (
          <div className="space-y-2">
            <div className="rounded-lg bg-white/20 p-3">
              <div className="flex items-center justify-between text-sm">
                <span>Capítulo {currentChapter}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="mt-2 h-2 bg-white/20 [&>div]:bg-white"
              />
            </div>
          </div>
        )}

        {/* Stats for completed */}
        {type === "completed" && totalChapters > 0 && (
          <div className="rounded-lg bg-white/20 p-3">
            <div className="flex items-center justify-center text-sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>{totalChapters} capítulos completos</span>
            </div>
          </div>
        )}

        {/* Stats for following */}
        {type === "following" && (
          <div className="rounded-lg bg-white/20 p-3">
            <div className="text-center text-sm">
              <div className="flex items-center justify-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Acompanhando</span>
              </div>
              {totalChapters > 0 && (
                <div className="mt-1 text-xs opacity-80">
                  {totalChapters} capítulos disponíveis
                </div>
              )}
            </div>
          </div>
        )}

        {/* Title and Author */}
        <div className="space-y-1">
          <h3 className="line-clamp-2 font-semibold leading-tight">
            {title}
          </h3>
          <p className="text-sm opacity-90">
            por {author}
          </p>
        </div>
      </div>
    </div>
  )
}