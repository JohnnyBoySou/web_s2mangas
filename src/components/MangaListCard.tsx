import { Crown } from "lucide-react"
import { Badge } from "./ui/badge"
import { BaseCard } from "./BaseCard"

interface MangaList {
  id: string
  name: string
  description: string
  cover?: string
  gradient: string
  mangaCount: number
  category: string
  curatedBy: string
  featured: boolean
}

interface MangaListCardProps {
  mangaList: MangaList
  onClick?: (mangaList: MangaList) => void
  onPlayClick?: (mangaList: MangaList) => void
  onMoreClick?: (mangaList: MangaList) => void
}

export function MangaListCard({ 
  mangaList, 
  onClick,
  onPlayClick,
  onMoreClick
}: MangaListCardProps) {
  
  const badges = []
  
  if (mangaList.featured) {
    badges.push(
      <Badge key="featured" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0">
        <Crown className="h-3 w-3 mr-1" />
        Destaque
      </Badge>
    )
  }
  
  return (
    <BaseCard
      title={mangaList.name}
      subtitle={mangaList.description}
      image={mangaList.cover}
      gradient={mangaList.gradient}
      aspectRatio="square"
      type="mangalist"
      metadata={{
        mangaCount: mangaList.mangaCount,
        author: `Admin • ${mangaList.curatedBy}`
      }}
      badges={badges}
      onClick={() => onClick?.(mangaList)}
      onPlayClick={() => onPlayClick?.(mangaList)}
      onMoreClick={() => onMoreClick?.(mangaList)}
    />
  )
}