import { BaseCard } from "./BaseCard"

interface MangaCardProps {
  title: string
  author: string
  image: string
  chapters?: number
  rating?: number
  isLiked?: boolean
  onClick?: () => void
  onPlayClick?: () => void
  onLikeClick?: () => void
  onMoreClick?: () => void
}

export function MangaCard({ 
  title, 
  author, 
  image, 
  chapters, 
  rating, 
  isLiked = false,
  onClick,
  onPlayClick,
  onLikeClick,
  onMoreClick
}: MangaCardProps) {
  return (
    <BaseCard
      title={title}
      subtitle={`por ${author}`}
      image={image}
      aspectRatio="portrait"
      type="manga"
      metadata={{
        chapters,
        rating
      }}
      isLiked={isLiked}
      onClick={onClick}
      onPlayClick={onPlayClick}
      onLikeClick={onLikeClick}
      onMoreClick={onMoreClick}
    />
  )
}