import { useState } from "react"
import { ArrowLeft, Filter, Grid, List, SortAsc } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { MangaCard } from "./MangaCard"
import { Badge } from "./ui/badge"

interface CategoryPageProps {
  category: string
  onBack?: () => void
  onMangaClick?: () => void
}

export function CategoryPage({ category, onBack, onMangaClick }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  // Mock data baseado na categoria
  const getCategoryData = (categoryName: string) => {
    const categories: Record<string, any> = {
      "Ação": {
        name: "Ação",
        description: "Mangás repletos de aventura, lutas épicas e adrenalina pura",
        color: "from-red-600 to-orange-600",
        icon: "⚔️",
        count: 1247
      },
      "Romance": {
        name: "Romance",
        description: "Histórias de amor que tocam o coração",
        color: "from-pink-500 to-rose-500",
        icon: "💕",
        count: 892
      },
      "Comédia": {
        name: "Comédia",
        description: "Mangás que vão te fazer rir até as lágrimas",
        color: "from-yellow-500 to-orange-500",
        icon: "😂",
        count: 634
      },
      "Drama": {
        name: "Drama",
        description: "Narrativas profundas e emocionalmente impactantes",
        color: "from-purple-600 to-indigo-600",
        icon: "🎭",
        count: 758
      },
      "Fantasia": {
        name: "Fantasia",
        description: "Mundos mágicos e criaturas extraordinárias",
        color: "from-violet-600 to-purple-600",
        icon: "🔮",
        count: 912
      },
      "Shounen": {
        name: "Shounen",
        description: "Aventuras para jovens com protagonistas determinados",
        color: "from-blue-600 to-cyan-600",
        icon: "👦",
        count: 567
      }
    }
    return categories[categoryName] || categories["Ação"]
  }

  const categoryData = getCategoryData(category)

  // Mock mangás da categoria
  const categoryMangas = [
    {
      title: "Attack on Titan",
      author: "Hajime Isayama",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 139,
      rating: 4.9,
      tags: ["Ação", "Drama", "Fantasia"],
      status: "Completo",
      year: 2023
    },
    {
      title: "One Piece",
      author: "Eiichiro Oda",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 1100,
      rating: 4.8,
      tags: ["Ação", "Aventura", "Comédia"],
      status: "Em andamento",
      year: 2023
    },
    {
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 205,
      rating: 4.7,
      tags: ["Ação", "Supernatural", "Drama"],
      status: "Completo",
      year: 2023
    },
    {
      title: "My Hero Academia",
      author: "Kohei Horikoshi",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.6,
      tags: ["Ação", "Shounen", "Escola"],
      status: "Em andamento",
      year: 2023
    },
    {
      title: "Naruto",
      author: "Masashi Kishimoto",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 700,
      rating: 4.8,
      tags: ["Ação", "Ninja", "Amizade"],
      status: "Completo",
      year: 2023
    },
    {
      title: "Dragon Ball",
      author: "Akira Toriyama",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 519,
      rating: 4.9,
      tags: ["Ação", "Aventura", "Martial Arts"],
      status: "Completo",
      year: 2023
    },
    {
      title: "Jujutsu Kaisen",
      author: "Gege Akutami",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 250,
      rating: 4.7,
      tags: ["Ação", "Supernatural", "Escola"],
      status: "Em andamento",
      year: 2023
    },
    {
      title: "Hunter x Hunter",
      author: "Yoshihiro Togashi",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.9,
      tags: ["Ação", "Aventura", "Estratégia"],
      status: "Hiato",
      year: 2023
    }
  ]

  const filterOptions = [
    { label: "Status", values: ["Completo", "Em andamento", "Hiato"] },
    { label: "Ano", values: ["2023", "2022", "2021", "2020"] },
    { label: "Rating", values: ["4.5+", "4.0+", "3.5+", "3.0+"] }
  ]

  const sortOptions = [
    { value: "popularity", label: "Popularidade" },
    { value: "rating", label: "Avaliação" },
    { value: "newest", label: "Mais novos" },
    { value: "oldest", label: "Mais antigos" },
    { value: "chapters", label: "Número de capítulos" },
    { value: "title", label: "Título A-Z" }
  ]

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Category Header */}
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br ${categoryData.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 rounded-full bg-black/50 p-0 hover:bg-black/70 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0">
              {categoryData.icon}
            </div>
            
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">Categoria</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{categoryData.name}</h1>
              <p className="text-lg text-white/80 mb-2">{categoryData.description}</p>
              <p className="text-sm text-white/60">{categoryData.count} mangás</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
              {selectedFilters.length > 0 && (
                <div className="flex gap-1">
                  {selectedFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {filter}
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFilters([])}
                    className="h-5 px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Limpar
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
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

            <div className="flex items-center border border-border rounded-lg bg-muted/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 p-0 rounded-none rounded-l-lg ${
                  viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 p-0 rounded-none rounded-r-lg ${
                  viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Manga Grid */}
      <ScrollArea className="flex-1 px-6">
        <div className="py-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">Mangás de {categoryData.name}</h2>
            <p className="text-muted-foreground">
              {categoryMangas.length} resultados encontrados
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {categoryMangas.map((manga, index) => (
                <div key={index} onClick={onMangaClick} className="cursor-pointer">
                  <MangaCard {...manga} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {categoryMangas.map((manga, index) => (
                <div
                  key={index}
                  onClick={onMangaClick}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={manga.image}
                      alt={manga.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{manga.title}</h3>
                    <p className="text-sm text-muted-foreground">{manga.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {manga.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {manga.chapters} capítulos
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ⭐ {manga.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}