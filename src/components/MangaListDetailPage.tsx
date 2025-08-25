import { ArrowLeft, Play, Plus, Share2, MoreHorizontal, Book, Users, Heart, Clock } from "lucide-react"
import { Button } from "./ui/button"
import { MangaCard } from "./MangaCard"
import { Badge } from "./ui/badge"
import { useState } from "react"
import { ImageWithFallback } from './figma/ImageWithFallback'
import { toast } from "sonner@2.0.3"

interface MangaListDetailPageProps {
  mangaList: {
    id: string
    title: string
    description: string
    cover: string
    mangaCount: number
    curator: string
    tags: string[]
    isFollowing?: boolean
    createdAt: string
  }
  onBack: () => void
  onMangaClick: () => void
}

// Mock data para os mangás da lista
const mockMangaData = [
  {
    id: "1",
    title: "Attack on Titan",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.9,
    year: 2009,
    status: "Completed",
    chapters: 139,
    readChapters: 139,
    genres: ["Action", "Drama", "Fantasy"]
  },
  {
    id: "2", 
    title: "Death Note",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    rating: 4.8,
    year: 2003,
    status: "Completed", 
    chapters: 108,
    readChapters: 108,
    genres: ["Supernatural", "Thriller", "Psychological"]
  },
  {
    id: "3",
    title: "One Piece",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.7,
    year: 1997,
    status: "Ongoing",
    chapters: 1100,
    readChapters: 1050,
    genres: ["Adventure", "Comedy", "Action"]
  },
  {
    id: "4",
    title: "Naruto",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop", 
    rating: 4.6,
    year: 1999,
    status: "Completed",
    chapters: 700,
    readChapters: 700,
    genres: ["Action", "Martial Arts", "Ninja"]
  },
  {
    id: "5",
    title: "Demon Slayer",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.8,
    year: 2016,
    status: "Completed",
    chapters: 205,
    readChapters: 205,
    genres: ["Action", "Historical", "Supernatural"]
  },
  {
    id: "6",
    title: "My Hero Academia", 
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    rating: 4.5,
    year: 2014,
    status: "Ongoing",
    chapters: 400,
    readChapters: 350,
    genres: ["Action", "School", "Super Hero"]
  }
]

export function MangaListDetailPage({ mangaList, onBack, onMangaClick }: MangaListDetailPageProps) {
  const [isFollowing, setIsFollowing] = useState(mangaList.isFollowing || false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    if (!isFollowing) {
      toast.success(`Agora você está seguindo a lista "${mangaList.title}"!`, {
        description: "Você receberá notificações sobre atualizações nesta lista."
      })
    } else {
      toast.info(`Você parou de seguir "${mangaList.title}".`)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: mangaList.title,
          text: `Confira esta lista de mangás: ${mangaList.title}`,
          url: window.location.href,
        })
        toast.success("Lista compartilhada!")
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copiado para a área de transferência!", {
          description: "Você pode compartilhar esta lista com seus amigos."
        })
      }
    } catch (error) {
      toast.error("Erro ao compartilhar", {
        description: "Tente novamente mais tarde."
      })
    }
  }

  const handleStartReading = () => {
    toast.success("Iniciando leitura da lista...", {
      description: "Carregando o primeiro mangá da lista."
    })
  }

  const totalChapters = mockMangaData.reduce((acc, manga) => acc + manga.chapters, 0)
  const readChapters = mockMangaData.reduce((acc, manga) => acc + manga.readChapters, 0)
  const completionPercentage = Math.round((readChapters / totalChapters) * 100)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header with gradient background */}
      <div className="relative">
        <div 
          className="h-80 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${mangaList.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute top-6 left-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end gap-6">
              <div className="w-48 h-64 bg-card rounded-lg shadow-2xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={mangaList.cover}
                  alt={mangaList.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-white pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Lista Oficial
                  </Badge>
                </div>
                <h1 className="text-5xl font-bold mb-4">{mangaList.title}</h1>
                <p className="text-lg text-white/90 mb-4 max-w-2xl">
                  {mangaList.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
                  <span className="flex items-center gap-1">
                    <Book className="h-4 w-4" />
                    {mangaList.mangaCount} mangás
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {mangaList.curator}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {mangaList.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button 
                    className="bg-white text-black hover:bg-white/90"
                    size="lg"
                    onClick={handleStartReading}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Começar a ler
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleFollowToggle}
                    className={`border-white/30 text-white hover:bg-white/10 ${
                      isFollowing ? 'bg-white/20' : ''
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Heart className="h-4 w-4 mr-2 fill-current" />
                        Seguindo
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Seguir
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleShare}
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white hover:bg-white/20"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mangaList.mangaCount}</div>
            <div className="text-sm text-muted-foreground">Mangás</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalChapters.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Capítulos Total</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{readChapters.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Capítulos Lidos</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
            <div className="text-sm text-muted-foreground">Completado</div>
          </div>
        </div>

        {/* Tags */}
        {mangaList.tags && mangaList.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {mangaList.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Mangás List */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Mangás da Lista</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                Lista
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {mockMangaData.map((manga) => (
                <MangaCard
                  key={manga.id}
                  {...manga}
                  onClick={onMangaClick}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mockMangaData.map((manga, index) => (
                <div
                  key={manga.id}
                  className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={onMangaClick}
                >
                  <div className="text-sm text-muted-foreground w-8 text-center">
                    {index + 1}
                  </div>
                  <div className="w-12 h-16 bg-card rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={manga.cover}
                      alt={manga.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{manga.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {manga.genres.join(", ")} • {manga.year}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {manga.readChapters}/{manga.chapters}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ⭐ {manga.rating}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}