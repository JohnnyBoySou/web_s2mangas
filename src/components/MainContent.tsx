import { MangaCard } from "./MangaCard"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Music, Play } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface MainContentProps {
  onMangaClick?: () => void
  onShowAllTrending?: () => void
  onShowAllRecent?: () => void
  onShowAllAuthors?: () => void
  onPlaylistClick?: () => void
}

export function MainContent({ 
  onMangaClick, 
  onShowAllTrending, 
  onShowAllRecent, 
  onShowAllAuthors,
  onPlaylistClick 
}: MainContentProps) {
  // Dados mock de mangás populares
  const featuredMangas = [
    {
      title: "Attack on Titan",
      author: "Hajime Isayama",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 139,
      rating: 4.9
    },
    {
      title: "One Piece",
      author: "Eiichiro Oda",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 1100,
      rating: 4.8
    },
    {
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 205,
      rating: 4.7
    },
    {
      title: "Naruto",
      author: "Masashi Kishimoto",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 700,
      rating: 4.6
    },
    {
      title: "My Hero Academia",
      author: "Kohei Horikoshi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.5
    },
    {
      title: "Death Note",
      author: "Tsugumi Ohba",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 108,
      rating: 4.8
    }
  ]

  const recentlyRead = [
    {
      title: "Tokyo Ghoul",
      author: "Sui Ishida",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 143,
      rating: 4.4
    },
    {
      title: "Fullmetal Alchemist",
      author: "Hiromu Arakawa",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 108,
      rating: 4.9
    },
    {
      title: "Hunter x Hunter",
      author: "Yoshihiro Togashi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.7
    },
    {
      title: "Bleach",
      author: "Tite Kubo", 
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 686,
      rating: 4.3
    }
  ]

  // Mock playlists data
  const featuredPlaylists = [
    {
      id: "1",
      title: "Ação Épica • Batalhas Intensas",
      description: "Trilhas sonoras épicas para mangás de ação",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "MangaBeats",
      trackCount: 45
    },
    {
      id: "2", 
      title: "Romance Shoujo • Momentos Doces",
      description: "Melodias suaves para shoujos românticos",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "AnimeLofi",
      trackCount: 32
    },
    {
      id: "3",
      title: "Aventura Shounen • Jornada Heroica",
      description: "Música energética para aventuras shounen",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "HeroSounds",
      trackCount: 52
    },
    {
      id: "4",
      title: "Slice of Life • Momentos Cotidianos",
      description: "Trilhas calmas para mangás do dia a dia",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "CalmVibes",
      trackCount: 38
    }
  ]

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <main className="px-6 py-6 pb-12 space-y-8">
          {/* Hero Section */}
          <section>
            <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 p-8">
              <div className="relative z-10">
                <h1 className="mb-2 text-4xl font-bold text-white">Bem-vindo de volta!</h1>
                <p className="mb-6 text-lg text-purple-100">Continue lendo seus mangás favoritos</p>
                <Button className="bg-green-500 text-black hover:bg-green-400 hover:scale-105 rounded-full px-6 font-semibold">
                  Continuar Leitura
                </Button>
              </div>
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5" />
            </div>
          </section>

          {/* Quick Access */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-white">Boa tarde</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Mangás Curtidos",
                "Leitura Recente", 
                "Em Alta",
                "Ação",
                "Romance",
                "Aventura"
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-16 justify-start gap-4 rounded-xl bg-muted/20 p-4 text-white hover:bg-muted/30 hover:scale-[1.02] transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600" />
                  <span className="font-medium">{item}</span>
                </Button>
              ))}
            </div>
          </section>

          {/* Featured Mangas */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Mangás em destaque</h2>
              <Button 
                variant="ghost" 
                onClick={onShowAllTrending}
                className="text-muted-foreground hover:text-white hover:bg-muted/20 rounded-full"
              >
                Mostrar tudo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {featuredMangas.map((manga, index) => (
                <div key={index} onClick={onMangaClick} className="cursor-pointer">
                  <MangaCard {...manga} />
                </div>
              ))}
            </div>
          </section>

          {/* Playlists Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-green-500" />
                <h2 className="text-2xl font-bold text-white">Playlists para Leitura</h2>
              </div>
              <Button 
                variant="ghost" 
                onClick={onPlaylistClick}
                className="text-muted-foreground hover:text-white hover:bg-muted/20 rounded-full"
              >
                Ver todas
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPlaylists.map((playlist) => (
                <div 
                  key={playlist.id}
                  onClick={onPlaylistClick}
                  className="group cursor-pointer rounded-xl bg-muted/20 p-4 transition-all hover:bg-muted/30 hover:scale-[1.02]"
                >
                  <div className="relative mb-4">
                    <ImageWithFallback
                      src={playlist.cover}
                      alt={playlist.title}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-green-500 p-0 opacity-0 shadow-lg transition-all hover:scale-105 hover:bg-green-400 group-hover:opacity-100"
                    >
                      <Play className="h-4 w-4 text-black" fill="currentColor" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-white truncate">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {playlist.trackCount} faixas • {playlist.creator}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recently Read */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Lidos recentemente</h2>
              <Button 
                variant="ghost" 
                onClick={onShowAllRecent}
                className="text-muted-foreground hover:text-white hover:bg-muted/20 rounded-full"
              >
                Mostrar tudo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              {recentlyRead.map((manga, index) => (
                <div key={index} onClick={onMangaClick} className="cursor-pointer">
                  <MangaCard {...manga} isLiked={index % 2 === 0} />
                </div>
              ))}
            </div>
          </section>

          {/* Popular Authors */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Autores populares</h2>
              <Button 
                variant="ghost" 
                onClick={onShowAllAuthors}
                className="text-muted-foreground hover:text-white hover:bg-muted/20 rounded-full"
              >
                Mostrar tudo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {[
                "Hajime Isayama",
                "Eiichiro Oda", 
                "Masashi Kishimoto",
                "Tite Kubo",
                "Kohei Horikoshi",
                "Sui Ishida"
              ].map((author, index) => (
                <div key={index} className="group cursor-pointer rounded-xl bg-muted/20 p-4 text-center transition-all hover:bg-muted/30 hover:scale-[1.02]">
                  <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                  <h3 className="font-medium text-white group-hover:text-green-400">{author}</h3>
                  <p className="text-sm text-muted-foreground">Autor</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>
    </div>
  )
}