import { Lock, Users } from "lucide-react"
import { Badge } from "./ui/badge"
import { BaseCard } from "./BaseCard"

interface Collection {
  id: string
  name: string
  description: string
  cover?: string
  coverUrl?: string
  coverType?: "upload" | "url" | "gradient" | "color"
  gradient: string
  mangaCount: number
  isPublic: boolean
  author: string
  isOwner: boolean
}

interface CollectionCardProps {
  collection: Collection
  onClick?: (collection: Collection) => void
  onPlayClick?: (collection: Collection) => void
  onLikeClick?: (collection: Collection) => void
  onMoreClick?: (collection: Collection) => void
}

export function CollectionCard({ 
  collection, 
  onClick,
  onPlayClick,
  onLikeClick,
  onMoreClick
}: CollectionCardProps) {
  
  const badges = []
  
  if (!collection.isPublic) {
    badges.push(
      <Badge key="private" variant="secondary" className="bg-black/60 text-white border-0">
        <Lock className="h-3 w-3 mr-1" />
        Privada
      </Badge>
    )
  }
  
  if (collection.isPublic && !collection.isOwner) {
    badges.push(
      <Badge key="public" variant="secondary" className="bg-black/60 text-white border-0">
        <Users className="h-3 w-3 mr-1" />
        Pública
      </Badge>
    )
  }
  
  return (
    <BaseCard
      title={collection.name}
      subtitle={collection.description}
      image={collection.cover || collection.coverUrl}
      gradient={collection.gradient}
      aspectRatio="square"
      type="collection"
      metadata={{
        mangaCount: collection.mangaCount,
        author: collection.author
      }}
      badges={badges}
      onClick={() => onClick?.(collection)}
      onPlayClick={() => onPlayClick?.(collection)}
      onLikeClick={() => onLikeClick?.(collection)}
      onMoreClick={() => onMoreClick?.(collection)}
    />
  )
}