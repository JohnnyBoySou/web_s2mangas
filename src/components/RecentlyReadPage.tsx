import { ArrowLeft, Clock, BookOpen } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface RecentlyReadPageProps {
  onBack: () => void
  onMangaClick: () => void
}

interface RecentRead {
  id: string
  title: string
  cover: string
  lastChapter: number
  totalChapters: number
  readAt: string
  progress: number
}

export function RecentlyReadPage({ onBack, onMangaClick }: RecentlyReadPageProps) {
  const recentReads: RecentRead[] = [
    {
      id: "1",
      title: "Attack on Titan",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      lastChapter: 45,
      totalChapters: 139,
      readAt: "2024-01-15T18:30:00Z",
      progress: 32
    },
    {
      id: "2", 
      title: "One Piece",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      lastChapter: 1095,
      totalChapters: 1100,
      readAt: "2024-01-15T14:15:00Z",
      progress: 99
    },
    {
      id: "3",
      title: "Demon Slayer",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      lastChapter: 23,
      totalChapters: 205,
      readAt: "2024-01-14T20:45:00Z",
      progress: 11
    },
    {
      id: "4",
      title: "Jujutsu Kaisen",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      lastChapter: 67,
      totalChapters: 240,
      readAt: "2024-01-14T16:20:00Z",
      progress: 28
    },
    {
      id: "5",
      title: "My Hero Academia",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      lastChapter: 156,
      totalChapters: 400,
      readAt: "2024-01-13T19:30:00Z",
      progress: 39
    },
    {
      id: "6",
      title: "Tokyo Ghoul",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      lastChapter: 89,
      totalChapters: 144,
      readAt: "2024-01-12T21:10:00Z",
      progress: 62
    }
  ]

  const formatReadTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Agora há pouco"
    if (diffInHours < 24) return `Há ${diffInHours}h`
    if (diffInHours < 48) return "Ontem"
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Há ${diffInDays} dias`
    
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'short' 
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 pb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-500" />
          <div>
            <h1>Lidos Recentemente</h1>
            <p className="text-muted-foreground">Seu histórico de leitura</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {recentReads.map(manga => (
              <div 
                key={manga.id} 
                className="flex gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors group"
                onClick={onMangaClick}
              >
                <div className="relative shrink-0">
                  <ImageWithFallback
                    src={manga.cover}
                    alt={manga.title}
                    className="w-16 h-20 rounded object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                    <BookOpen className="w-3 h-3" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate group-hover:text-blue-400 transition-colors">
                    {manga.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Capítulo {manga.lastChapter} de {manga.totalChapters}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatReadTime(manga.readAt)}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">Progresso</span>
                      <span className="text-xs">{manga.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${manga.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {recentReads.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Nenhum mangá lido recentemente</h3>
              <p className="text-muted-foreground">
                Comece a ler alguns mangás para ver seu histórico aqui
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}