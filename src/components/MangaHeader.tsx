import { useState } from "react"
import { Play, Heart, MoreHorizontal, Share, Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { toast } from "sonner@2.0.3"

interface MangaHeaderProps {
  title: string
  author: string
  image: string
  status: string
  genres: string[]
  rating: number
  totalChapters: number
  monthlyReaders: string
  description: string
  onCategoryClick?: (category: string) => void
}

export function MangaHeader({ 
  title, 
  author, 
  image, 
  status, 
  genres, 
  rating, 
  totalChapters, 
  monthlyReaders,
  description,
  onCategoryClick
}: MangaHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    if (!isFollowing) {
      toast.success(`Agora você está seguindo ${title}!`, {
        description: "Você receberá notificações sobre novos capítulos."
      })
    } else {
      toast.info(`Você parou de seguir ${title}.`, {
        description: "Não receberá mais notificações sobre este mangá."
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    if (!isBookmarked) {
      toast.success(`${title} foi adicionado aos salvos!`, {
        description: "Acesse seus mangás salvos na sua biblioteca."
      })
    } else {
      toast.info(`${title} foi removido dos salvos.`)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      toast.success("Mangá curtido!", {
        description: "Isso nos ajuda a recomendar conteúdo similar."
      })
    } else {
      toast.info("Curtida removida.")
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `Confira este mangá incrível: ${title}`,
          url: window.location.href,
        })
        toast.success("Mangá compartilhado!")
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copiado para a área de transferência!", {
          description: "Você pode compartilhar este mangá com seus amigos."
        })
      }
    } catch (error) {
      toast.error("Erro ao compartilhar", {
        description: "Tente novamente mais tarde."
      })
    }
  }

  const handleGenreClick = (genre: string) => {
    if (onCategoryClick) {
      onCategoryClick(genre)
      toast.info(`Explorando mangás de ${genre}`, {
        description: "Redirecionando para a página de busca..."
      })
    }
  }

  const handleRead = () => {
    toast.success("Iniciando leitura...", {
      description: "Carregando o primeiro capítulo disponível."
    })
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />
      
      <div className="relative px-8 pb-8 pt-6">
        <div className="flex items-end gap-6">
          {/* Manga Cover */}
          <div className="relative">
            <ImageWithFallback
              src={image}
              alt={title}
              className="h-60 w-44 rounded-lg object-cover shadow-2xl"
            />
            <div className="absolute inset-0 rounded-lg shadow-inner" />
          </div>

          {/* Manga Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                Mangá
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {status}
              </Badge>
            </div>

            <h1 className="text-5xl font-bold text-white leading-tight">{title}</h1>
            
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-white font-medium">por {author}</span>
              <span>•</span>
              <span>{totalChapters} capítulos</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                ⭐ {rating}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300 max-w-2xl leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="font-medium text-white">{monthlyReaders}</span>
              <span>leitores mensais</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center gap-4">
          <Button 
            size="lg" 
            onClick={handleRead}
            className="bg-green-500 text-black font-semibold hover:bg-green-400 hover:scale-105 transition-all"
          >
            <Play className="mr-2 h-5 w-5" fill="currentColor" />
            Ler
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleFollow}
            className={`border-gray-600 text-white hover:bg-gray-800 ${
              isFollowing ? 'bg-green-500/20 border-green-500 text-green-400' : ''
            }`}
          >
            <Heart className={`mr-2 h-5 w-5 ${isFollowing ? 'fill-current' : ''}`} />
            {isFollowing ? 'Seguindo' : 'Seguir'}
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={handleLike}
            className={`text-gray-400 hover:text-white ${
              isLiked ? 'text-red-400 hover:text-red-300' : ''
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={handleShare}
            className="text-gray-400 hover:text-white"
          >
            <Share className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={handleBookmark}
            className={`text-gray-400 hover:text-white ${
              isBookmarked ? 'text-blue-400 hover:text-blue-300' : ''
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>

          <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}