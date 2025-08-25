import { useState } from "react"
import { Plus, Search, Grid3X3, List, MoreHorizontal, Play, Users, Lock } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"
import { ImageWithFallback } from "./figma/ImageWithFallback"

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

interface CollectionsPageProps {
  onCreateCollection?: () => void
  onCollectionClick?: (collection: Collection) => void
}

export function CollectionsPage({ onCreateCollection, onCollectionClick }: CollectionsPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data para coleções criadas pelo usuário
  const userCollections: Collection[] = [
    {
      id: "1",
      name: "Mangás Curtidos",
      description: "Seus mangás favoritos",
      cover: "",
      gradient: "from-purple-500 to-pink-500",
      mangaCount: 42,
      isPublic: false,
      author: "Você",
      isOwner: true
    },
    {
      id: "2",
      name: "Ação Épica",
      description: "Os melhores mangás de ação",
      coverUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      coverType: "url",
      gradient: "from-red-600 to-orange-600",
      mangaCount: 28,
      isPublic: true,
      author: "Você",
      isOwner: true
    },
    {
      id: "3",
      name: "Romance Shojo",
      description: "Histórias de amor inesquecíveis",
      cover: "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=300&h=300&fit=crop",
      gradient: "from-pink-500 to-rose-500",
      mangaCount: 15,
      isPublic: true,
      author: "Você",
      isOwner: true
    },
    {
      id: "4",
      name: "Seinen Clássicos",
      description: "Obras-primas do gênero seinen",
      cover: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop",
      gradient: "from-gray-700 to-gray-900",
      mangaCount: 22,
      isPublic: false,
      author: "Você",
      isOwner: true
    },
    {
      id: "5",
      name: "Aventura Fantástica",
      description: "Mundos mágicos e aventuras épicas",
      cover: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
      gradient: "from-blue-600 to-cyan-600",
      mangaCount: 31,
      isPublic: true,
      author: "Você",
      isOwner: true
    },
    {
      id: "6",
      name: "Comédia Slice of Life",
      description: "Momentos divertidos do dia a dia",
      cover: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=300&h=300&fit=crop",
      gradient: "from-yellow-500 to-orange-500",
      mangaCount: 18,
      isPublic: false,
      author: "Você",
      isOwner: true
    }
  ]

  // Mock data para coleções seguidas
  const followedCollections: Collection[] = [
    {
      id: "7",
      name: "Best of Shounen",
      description: "Curadoria dos melhores shounen",
      cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=300&fit=crop",
      gradient: "from-orange-600 to-red-600",
      mangaCount: 67,
      isPublic: true,
      author: "MangaExpert",
      isOwner: false
    },
    {
      id: "8",
      name: "Hidden Gems",
      description: "Mangás subestimados que merecem atenção",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      gradient: "from-emerald-600 to-teal-600",
      mangaCount: 45,
      isPublic: true,
      author: "OtakuCollector",
      isOwner: false
    },
    {
      id: "9",
      name: "Romance Perfeito",
      description: "Os romances mais bem escritos",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
      gradient: "from-pink-600 to-purple-600",
      mangaCount: 33,
      isPublic: true,
      author: "RomanceFan",
      isOwner: false
    }
  ]

  const filteredUserCollections = userCollections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFollowedCollections = followedCollections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const CollectionCard = ({ collection }: { collection: Collection }) => (
    <div
      onClick={() => onCollectionClick?.(collection)}
      className="group cursor-pointer rounded-xl bg-muted/20 p-4 transition-all hover:bg-muted/30 hover:scale-[1.02]"
    >
      <div className="relative mb-4">
        {(collection.cover || collection.coverUrl) ? (
          <ImageWithFallback
            src={collection.cover || collection.coverUrl || ""}
            alt={collection.name}
            className="aspect-square w-full rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className={`aspect-square w-full rounded-lg bg-gradient-to-br ${collection.gradient} shadow-lg flex items-center justify-center`}>
            <div className="text-4xl text-white">❤️</div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/40 rounded-lg" />
        <Button
          size="sm"
          className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-green-500 p-0 opacity-0 shadow-lg transition-all hover:scale-105 hover:bg-green-400 group-hover:opacity-100"
        >
          <Play className="h-4 w-4 text-black" fill="currentColor" />
        </Button>
      </div>
      
      <div className="space-y-1">
        <h3 className="truncate font-medium text-foreground">{collection.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {collection.mangaCount} mangás • {collection.author}
          </div>
          
          <div className="flex items-center gap-1">
            {!collection.isPublic && (
              <Lock className="h-3 w-3 text-muted-foreground" />
            )}
            {collection.isPublic && !collection.isOwner && (
              <Users className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Suas Coleções</h1>
            <p className="text-muted-foreground mt-2">
              {filteredUserCollections.length + filteredFollowedCollections.length} coleções
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={onCreateCollection}
              className="bg-green-500 text-black hover:bg-green-400 hover:scale-105 rounded-full px-6 font-semibold"
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar
            </Button>
            
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full h-8 w-8 p-0 border-0"
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full h-8 w-8 p-0 border-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar em coleções..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md bg-muted/20 border-border pl-10 text-foreground placeholder:text-muted-foreground focus:bg-muted/30 rounded-full"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-6">
        <Tabs defaultValue="created" className="space-y-8">
          <TabsList className="bg-muted/20 border-border rounded-full">
            <TabsTrigger value="created" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Criadas por você
            </TabsTrigger>
            <TabsTrigger value="following" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Seguindo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created" className="space-y-8">
            {filteredUserCollections.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {filteredUserCollections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Nenhuma coleção encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Tente uma busca diferente" : "Crie sua primeira coleção de mangás"}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={onCreateCollection}
                    className="bg-green-500 text-black hover:bg-green-400 rounded-full px-6"
                  >
                    Criar Coleção
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="following" className="space-y-8">
            {filteredFollowedCollections.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {filteredFollowedCollections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Nenhuma coleção seguida</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Tente uma busca diferente" : "Explore e siga coleções de outros usuários"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  )
}