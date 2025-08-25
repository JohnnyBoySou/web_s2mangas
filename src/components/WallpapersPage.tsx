import { useState } from "react"
import { ArrowLeft, Download, Search, Image as ImageIcon, Grid, List } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import type { WallpaperCollection, Wallpaper } from "../types/schemas"

interface WallpapersPageProps {
  onBack: () => void
}

export function WallpapersPage({ onBack }: WallpapersPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const wallpaperCollections: WallpaperCollection[] = [
    {
      id: "1",
      mangaTitle: "Attack on Titan",
      mangaCover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      wallpapers: [
        {
          id: "w1",
          title: "Eren Titan Form",
          mangaId: "1",
          mangaTitle: "Attack on Titan",
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
          resolution: "1920x1080",
          downloadUrl: "https://example.com/wallpaper1.jpg",
          tags: ["eren", "titan", "action"]
        },
        {
          id: "w2",
          title: "Survey Corps",
          mangaId: "1",
          mangaTitle: "Attack on Titan",
          imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
          resolution: "2560x1440",
          downloadUrl: "https://example.com/wallpaper2.jpg",
          tags: ["survey corps", "wings of freedom"]
        },
        {
          id: "w3",
          title: "Levi vs Beast Titan",
          mangaId: "1",
          mangaTitle: "Attack on Titan",
          imageUrl: "https://images.unsplash.com/photo-1577985759186-0854dfd3f218?w=800&h=600&fit=crop",
          resolution: "3840x2160",
          downloadUrl: "https://example.com/wallpaper3.jpg",
          tags: ["levi", "beast titan", "battle"]
        }
      ]
    },
    {
      id: "2",
      mangaTitle: "Demon Slayer",
      mangaCover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      wallpapers: [
        {
          id: "w4",
          title: "Tanjiro Water Breathing",
          mangaId: "2",
          mangaTitle: "Demon Slayer",
          imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=800&h=600&fit=crop",
          resolution: "1920x1080",
          downloadUrl: "https://example.com/wallpaper4.jpg",
          tags: ["tanjiro", "water breathing", "sword"]
        },
        {
          id: "w5",
          title: "Nezuko Demon Form",
          mangaId: "2",
          mangaTitle: "Demon Slayer",
          imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
          resolution: "2560x1440",
          downloadUrl: "https://example.com/wallpaper5.jpg",
          tags: ["nezuko", "demon", "pink"]
        }
      ]
    },
    {
      id: "3",
      mangaTitle: "One Piece",
      mangaCover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      wallpapers: [
        {
          id: "w6",
          title: "Straw Hat Pirates",
          mangaId: "3",
          mangaTitle: "One Piece",
          imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&h=600&fit=crop",
          resolution: "1920x1080",
          downloadUrl: "https://example.com/wallpaper6.jpg",
          tags: ["straw hat", "crew", "adventure"]
        }
      ]
    }
  ]

  const allWallpapers = wallpaperCollections.flatMap(collection => collection.wallpapers)

  const filteredCollections = wallpaperCollections.filter(collection =>
    collection.mangaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.wallpapers.some(wallpaper => 
      wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  )

  const filteredWallpapers = allWallpapers.filter(wallpaper =>
    wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wallpaper.mangaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleDownload = (wallpaper: Wallpaper) => {
    // Simulate download
    console.log("Downloading:", wallpaper.title)
  }

  const WallpaperCard = ({ wallpaper, showMangaTitle = false }: { wallpaper: Wallpaper; showMangaTitle?: boolean }) => (
    <div className="group relative bg-secondary/30 rounded-lg overflow-hidden hover:bg-secondary/50 transition-colors">
      <div className="aspect-video relative">
        <ImageWithFallback
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDownload(wallpaper)
            }}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-white">
            <h4 className="font-medium truncate">{wallpaper.title}</h4>
            {showMangaTitle && (
              <p className="text-sm text-white/80 truncate">{wallpaper.mangaTitle}</p>
            )}
            <p className="text-xs text-white/70">{wallpaper.resolution}</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-medium truncate mb-1">{wallpaper.title}</h4>
        {showMangaTitle && (
          <p className="text-sm text-muted-foreground truncate mb-2">{wallpaper.mangaTitle}</p>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {wallpaper.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{wallpaper.resolution}</span>
          <Button size="sm" onClick={() => handleDownload(wallpaper)}>
            <Download className="w-3 h-3 mr-1" />
            Baixar
          </Button>
        </div>
      </div>
    </div>
  )

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
          <ImageIcon className="w-6 h-6 text-purple-500" />
          <div>
            <h1>Wallpapers</h1>
            <p className="text-muted-foreground">Wallpapers de alta qualidade dos seus mangás favoritos</p>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center gap-4 px-6 pb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar wallpapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        <Tabs defaultValue="collections" className="h-full flex flex-col px-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="collections">Por Mangá</TabsTrigger>
            <TabsTrigger value="all">Todos</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 min-h-0">
            <TabsContent value="collections" className="h-full mt-0">
              <ScrollArea className="h-full">
                <div className="space-y-8 pb-6">
                  {filteredCollections.map(collection => (
                    <div key={collection.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <ImageWithFallback
                          src={collection.mangaCover}
                          alt={collection.mangaTitle}
                          className="w-12 h-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{collection.mangaTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            {collection.wallpapers.length} wallpapers
                          </p>
                        </div>
                      </div>
                      <div className={viewMode === "grid" 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
                        : "space-y-4"
                      }>
                        {collection.wallpapers.map(wallpaper => (
                          <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="all" className="h-full mt-0">
              <ScrollArea className="h-full">
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6" 
                  : "space-y-4 pb-6"
                }>
                  {filteredWallpapers.map(wallpaper => (
                    <WallpaperCard 
                      key={wallpaper.id} 
                      wallpaper={wallpaper} 
                      showMangaTitle={true}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}