import { Badge } from "./ui/badge"
import { BaseCard } from "./BaseCard"

interface Playlist {
  id: string
  title: string
  description: string
  cover: string
  creator: string
  trackCount: number
  duration: string
  likes: number
  genre: string
  isOfficial: boolean
}

interface PlaylistCardProps {
  playlist: Playlist
  onClick?: (playlist: Playlist) => void
  onPlayClick?: (playlist: Playlist) => void
  onMoreClick?: (playlist: Playlist) => void
}

export function PlaylistCard({ 
  playlist, 
  onClick,
  onPlayClick,
  onMoreClick
}: PlaylistCardProps) {
  
  const badges = []
  
  if (playlist.isOfficial) {
    badges.push(
      <Badge key="official" className="bg-green-500 text-black border-0">
        Oficial
      </Badge>
    )
  }
  
  return (
    <BaseCard
      title={playlist.title}
      subtitle={playlist.description}
      image={playlist.cover}
      aspectRatio="square"
      type="playlist"
      metadata={{
        trackCount: playlist.trackCount,
        duration: playlist.duration
      }}
      badges={badges}
      onClick={() => onClick?.(playlist)}
      onPlayClick={() => onPlayClick?.(playlist)}
      onMoreClick={() => onMoreClick?.(playlist)}
    />
  )
}