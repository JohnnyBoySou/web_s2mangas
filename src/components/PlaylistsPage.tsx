import { useState } from "react"
import { Play, Pause, ExternalLink, Music, Volume2, Heart, Share, MoreHorizontal, Shuffle, Filter } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface PlaylistsPageProps {
  onPlaylistClick?: (playlistId: string) => void
}

export function PlaylistsPage({ onPlaylistClick }: PlaylistsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [playingId, setPlayingId] = useState<string | null>(null)

  // Mock playlists data
  const playlists = [
    {
      id: "1",
      title: "Ação Épica • Batalhas Intensas",
      description: "Trilhas sonoras épicas para acompanhar suas batalhas favoritas em mangás de ação",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "MangaBeats",
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
      trackCount: 45,
      duration: "2h 30min",
      likes: 12500,
      genre: "Epic",
      spotifyUrl: "https://open.spotify.com/playlist/example1",
      isOfficial: true,
      tags: ["Ação", "Batalha", "Épico", "Orquestal"]
    },
    {
      id: "2", 
      title: "Romance Shoujo • Momentos Doces",
      description: "Melodias suaves e românticas para acompanhar seus shoujos favoritos",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "AnimeLofi",
      creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b775?w=50&h=50&fit=crop&crop=face",
      trackCount: 32,
      duration: "1h 45min",
      likes: 8200,
      genre: "Lo-fi",
      spotifyUrl: "https://open.spotify.com/playlist/example2",
      isOfficial: true,
      tags: ["Romance", "Shoujo", "Lo-fi", "Relaxante"]
    },
    {
      id: "3",
      title: "Suspense & Terror • Atmosfera Sombria",
      description: "Sons obscuros e tensos para mangás de horror e suspense",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "DarkBeats",
      creatorAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=face",
      trackCount: 28,
      duration: "1h 55min", 
      likes: 5600,
      genre: "Dark Ambient",
      spotifyUrl: "https://open.spotify.com/playlist/example3",
      isOfficial: false,
      tags: ["Horror", "Suspense", "Dark", "Atmosférico"]
    },
    {
      id: "4",
      title: "Aventura Shounen • Jornada Heroica",
      description: "Música energética para acompanhar aventuras shounen emocionantes",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "HeroSounds",
      creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      trackCount: 52,
      duration: "3h 10min",
      likes: 15300,
      genre: "Adventure",
      spotifyUrl: "https://open.spotify.com/playlist/example4",
      isOfficial: true,
      tags: ["Shounen", "Aventura", "Energético", "Heroico"]
    },
    {
      id: "5",
      title: "Slice of Life • Momentos Cotidianos",
      description: "Trilhas calmas e aconchegantes para mangás do dia a dia",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "CalmVibes",
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
      trackCount: 38,
      duration: "2h 15min",
      likes: 7800,
      genre: "Chill",
      spotifyUrl: "https://open.spotify.com/playlist/example5",
      isOfficial: false,
      tags: ["Slice of Life", "Chill", "Cotidiano", "Relaxante"]
    },
    {
      id: "6",
      title: "Fantasia Mágica • Mundos Encantados",
      description: "Música mística e encantadora para mangás de fantasia",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "MysticMelodies",
      creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b775?w=50&h=50&fit=crop&crop=face",
      trackCount: 41,
      duration: "2h 45min",
      likes: 9500,
      genre: "Fantasy",
      spotifyUrl: "https://open.spotify.com/playlist/example6",
      isOfficial: true,
      tags: ["Fantasia", "Mágico", "Orquestal", "Épico"]
    }
  ]

  const genres = [
    { value: "all", label: "Todos os Gêneros" },
    { value: "Epic", label: "Épico" },
    { value: "Lo-fi", label: "Lo-fi" },
    { value: "Dark Ambient", label: "Dark Ambient" },
    { value: "Adventure", label: "Aventura" },
    { value: "Chill", label: "Chill" },
    { value: "Fantasy", label: "Fantasia" }
  ]

  const sortOptions = [
    { value: "popular", label: "Mais Populares" },
    { value: "newest", label: "Mais Recentes" },
    { value: "duration", label: "Duração" },
    { value: "tracks", label: "Número de Faixas" }
  ]

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesGenre = selectedGenre === "all" || playlist.genre === selectedGenre
    
    return matchesSearch && matchesGenre
  })

  const handlePlayPause = (playlistId: string) => {
    if (playingId === playlistId) {
      setPlayingId(null)
    } else {
      setPlayingId(playlistId)
    }
  }

  const handleSpotifyOpen = (spotifyUrl: string) => {
    window.open(spotifyUrl, '_blank')
  }

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-3xl font-bold">Playlists para Leitura</h1>
              <p className="text-muted-foreground">
                Trilhas sonoras perfeitas para acompanhar seus mangás favoritos
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar playlists, gêneros ou tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/20 border-border text-foreground"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48 bg-muted/20 border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {genres.map((genre) => (
                  <SelectItem key={genre.value} value={genre.value}>
                    {genre.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-muted/20 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6">
        <div className="py-6 space-y-6">
          {/* Featured Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Playlists em Destaque</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlaylists.slice(0, 3).map((playlist) => (
                <Card key={playlist.id} className="group bg-muted/20 border-border hover:bg-muted/30 transition-all duration-300 cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={playlist.cover}
                          alt={playlist.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="lg"
                          onClick={() => handlePlayPause(playlist.id)}
                          className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-400 text-black hover:scale-105 transition-transform"
                        >
                          {playingId === playlist.id ? (
                            <Pause className="h-8 w-8" fill="currentColor" />
                          ) : (
                            <Play className="h-8 w-8 ml-1" fill="currentColor" />
                          )}
                        </Button>
                      </div>

                      {playlist.isOfficial && (
                        <Badge className="absolute top-3 right-3 bg-green-500 text-black">
                          Oficial
                        </Badge>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-medium text-foreground line-clamp-1">{playlist.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {playlist.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={playlist.creatorAvatar} />
                          <AvatarFallback className="text-xs">
                            {playlist.creator.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{playlist.creator}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{playlist.trackCount} faixas • {playlist.duration}</span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{playlist.likes.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-1">
                          {playlist.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpotifyOpen(playlist.spotifyUrl)}
                            className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Playlists */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Todas as Playlists</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted/20"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Tocar Aleatório
              </Button>
            </div>

            <div className="space-y-3">
              {filteredPlaylists.map((playlist, index) => (
                <Card key={playlist.id} className="group bg-muted/20 border-border hover:bg-muted/30 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Index/Play Button */}
                      <div className="w-8 flex items-center justify-center">
                        <span className="text-muted-foreground group-hover:hidden text-sm">
                          {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePlayPause(playlist.id)}
                          className="h-8 w-8 p-0 hidden group-hover:flex text-foreground hover:text-green-500"
                        >
                          {playingId === playlist.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {/* Cover */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={playlist.cover}
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground truncate">{playlist.title}</h3>
                          {playlist.isOfficial && (
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-300">
                              Oficial
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={playlist.creatorAvatar} />
                            <AvatarFallback className="text-xs">
                              {playlist.creator.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{playlist.creator}</span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="hidden md:block text-sm text-muted-foreground">
                        {playlist.duration}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSpotifyOpen(playlist.spotifyUrl)}
                          className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {filteredPlaylists.length === 0 && (
            <div className="text-center py-12">
              <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground mb-2">Nenhuma playlist encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros ou termos de busca
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}