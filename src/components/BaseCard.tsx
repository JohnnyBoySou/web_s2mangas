import { ReactNode, useState } from "react"
import { Play, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { toast } from "sonner@2.0.3"

interface BaseCardProps {
  title: string
  subtitle: string
  image?: string
  gradient?: string
  aspectRatio?: "square" | "portrait" // square (1:1) or portrait (3:4)
  type?: "manga" | "collection" | "playlist" | "mangalist"
  metadata?: {
    chapters?: number
    rating?: number
    mangaCount?: number
    trackCount?: number
    duration?: string
    author?: string
  }
  badges?: ReactNode[]
  isLiked?: boolean
  onClick?: () => void
  onPlayClick?: () => void
  onLikeClick?: () => void
  onMoreClick?: () => void
}

export function BaseCard({ 
  title, 
  subtitle, 
  image, 
  gradient, 
  aspectRatio = "portrait",
  type = "manga",
  metadata = {},
  badges = [],
  isLiked = false,
  onClick,
  onPlayClick,
  onLikeClick,
  onMoreClick
}: BaseCardProps) {
  const [liked, setLiked] = useState(isLiked)
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    
    if (!liked) {
      if (type === "manga") {
        toast.success(`${title} foi curtido!`, {
          description: "Adicionado à sua lista de favoritos."
        })
      } else if (type === "collection") {
        toast.success(`Coleção "${title}" curtida!`, {
          description: "Isso nos ajuda a recomendar conteúdo similar."
        })
      }
    } else {
      toast.info("Curtida removida")
    }
    
    onLikeClick?.()
  }
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (type === "manga") {
      toast.success("Iniciando leitura...", {
        description: `Carregando ${title} para você.`
      })
    } else if (type === "playlist") {
      toast.success("Reproduzindo playlist...", {
        description: `Iniciando ${title}.`
      })
    } else if (type === "collection") {
      toast.success("Abrindo coleção...", {
        description: `Explorando ${title}.`
      })
    } else if (type === "mangalist") {
      toast.success("Abrindo lista...", {
        description: `Carregando ${title}.`
      })
    }
    
    onPlayClick?.()
  }
  
  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast.info("Menu de opções", {
      description: "Mais ações disponíveis."
    })
    onMoreClick?.()
  }
  
  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-[3/4]"
  
  const renderMetadata = () => {
    const { chapters, rating, mangaCount, trackCount, duration, author } = metadata
    
    let metadataText = ""
    
    if (type === "manga" && chapters) {
      metadataText = `${chapters} capítulos`
      if (rating) metadataText += ` • ${rating}★`
    } else if (type === "collection" && mangaCount) {
      metadataText = `${mangaCount} mangás`
      if (author) metadataText += ` • ${author}`
    } else if (type === "playlist" && trackCount) {
      metadataText = `${trackCount} faixas`
      if (duration) metadataText += ` • ${duration}`
    } else if (type === "mangalist" && mangaCount) {
      metadataText = `${mangaCount} mangás`
      if (author) metadataText += ` • ${author}`
    }
    
    return metadataText
  }

  const defaultIcon = type === "playlist" ? "🎵" : type === "mangalist" ? "📋" : "❤️"
  
  return (
    <Card 
      className="group relative cursor-pointer overflow-hidden bg-muted/20 p-4 transition-all hover:bg-muted/30 hover:scale-[1.02] rounded-xl border-0"
      onClick={onClick}
    >
      <div className="relative mb-4">
        {image ? (
          <ImageWithFallback
            src={image}
            alt={title}
            className={`${aspectClass} w-full rounded-lg object-cover shadow-lg`}
          />
        ) : (
          <div className={`${aspectClass} w-full rounded-lg bg-gradient-to-br ${gradient || 'from-purple-500 to-pink-500'} shadow-lg flex items-center justify-center`}>
            <div className="text-4xl text-white">{defaultIcon}</div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/40 rounded-lg" />
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-2 right-2 space-y-1">
            {badges}
          </div>
        )}
        
        {/* Play Button */}
        <Button
          size="sm"
          onClick={handlePlay}
          className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-green-500 p-0 opacity-0 shadow-lg transition-all hover:scale-105 hover:bg-green-400 group-hover:opacity-100"
        >
          <Play className="h-4 w-4 text-black" fill="currentColor" />
        </Button>
      </div>
      
      <div className="space-y-1">
        <h3 className="truncate font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
        
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-muted-foreground">
            {renderMetadata()}
          </div>
          
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {(type === "manga" || type === "collection") && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0 rounded-full hover:bg-muted/50"
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-green-500 text-green-500' : 'text-muted-foreground hover:text-green-400'}`} />
              </Button>
            )}
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0 rounded-full hover:bg-muted/50"
              onClick={handleMore}
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}