import { useState } from "react"
import { TrendingUp, Filter, Grid, List, Star, Eye, Clock, Calendar } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { MangaCard } from "./MangaCard"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface TrendingPageProps {
  onMangaClick?: () => void
}

export function TrendingPage({ onMangaClick }: TrendingPageProps) {
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [timeFilter, setTimeFilter] = useState("today")

  // Mock trending data
  const trendingMangas = [
    {
      title: "Attack on Titan",
      author: "Hajime Isayama",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 139,
      rating: 4.9,
      views: 1250000,
      trend: "+15%",
      status: "Completo",
      genre: ["Ação", "Drama", "Fantasia"]
    },
    {
      title: "One Piece",
      author: "Eiichiro Oda",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 1100,
      rating: 4.8,
      views: 2100000,
      trend: "+22%",
      status: "Em andamento",
      genre: ["Ação", "Aventura", "Comédia"]
    },
    {
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 205,
      rating: 4.7,
      views: 980000,
      trend: "+18%",
      status: "Completo",
      genre: ["Ação", "Supernatural", "Drama"]
    },
    {
      title: "Jujutsu Kaisen",
      author: "Gege Akutami",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 250,
      rating: 4.6,
      views: 1450000,
      trend: "+31%",
      status: "Em andamento",
      genre: ["Ação", "Supernatural", "Escola"]
    },
    {
      title: "My Hero Academia",
      author: "Kohei Horikoshi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.5,
      views: 1120000,
      trend: "+12%",
      status: "Em andamento",
      genre: ["Ação", "Shounen", "Escola"]
    },
    {
      title: "Death Note",
      author: "Tsugumi Ohba",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 108,
      rating: 4.8,
      views: 890000,
      trend: "+8%",
      status: "Completo",
      genre: ["Psychological", "Supernatural", "Thriller"]
    },
    {
      title: "Tokyo Ghoul",
      author: "Sui Ishida",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 143,
      rating: 4.4,
      views: 760000,
      trend: "+25%",
      status: "Completo",
      genre: ["Ação", "Horror", "Supernatural"]
    },
    {
      title: "Naruto",
      author: "Masashi Kishimoto",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 700,
      rating: 4.7,
      views: 1800000,
      trend: "+5%",
      status: "Completo",
      genre: ["Ação", "Ninja", "Amizade"]
    },
    {
      title: "Hunter x Hunter",
      author: "Yoshihiro Togashi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.9,
      views: 1330000,
      trend: "+19%",
      status: "Hiato",
      genre: ["Ação", "Aventura", "Estratégia"]
    },
    {
      title: "Bleach",
      author: "Tite Kubo",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 686,
      rating: 4.3,
      views: 920000,
      trend: "+14%",
      status: "Completo",
      genre: ["Ação", "Supernatural", "Shounen"]
    },
    {
      title: "Fullmetal Alchemist",
      author: "Hiromu Arakawa",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 108,
      rating: 4.9,
      views: 1100000,
      trend: "+11%",
      status: "Completo",
      genre: ["Ação", "Aventura", "Drama"]
    },
    {
      title: "Dragon Ball",
      author: "Akira Toriyama",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 519,
      rating: 4.8,
      views: 1650000,
      trend: "+7%",
      status: "Completo",
      genre: ["Ação", "Aventura", "Martial Arts"]
    }
  ]

  const timeFilters = [
    { value: "today", label: "Hoje" },
    { value: "week", label: "Esta semana" },
    { value: "month", label: "Este mês" },
    { value: "year", label: "Este ano" },
    { value: "all", label: "Todos os tempos" }
  ]

  const sortOptions = [
    { value: "popularity", label: "Popularidade" },
    { value: "views", label: "Visualizações" },
    { value: "rating", label: "Avaliação" },
    { value: "trend", label: "Tendência" },
    { value: "newest", label: "Mais novos" },
    { value: "chapters", label: "Capítulos" }
  ]

  const getTrendColor = (trend: string) => {
    const value = parseInt(trend.replace('%', '').replace('+', ''))
    if (value >= 20) return "text-green-400"
    if (value >= 10) return "text-yellow-400"
    return "text-blue-400"
  }

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-3xl font-bold">Em Alta</h1>
              <p className="text-muted-foreground">
                Os mangás mais populares do momento
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40 bg-muted/20 border-border">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {timeFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-muted/20 border-border">
                <Filter className="w-4 h-4 mr-2" />
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

      <ScrollArea className="flex-1 px-6">
        <div className="py-6 pb-12">
          <Tabs defaultValue="trending" className="space-y-6">
            <TabsList className="bg-muted/20 border-border">
              <TabsTrigger value="trending" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />
                Em Alta
              </TabsTrigger>
              <TabsTrigger value="rising" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
                <Star className="w-4 h-4 mr-2" />
                Em Ascensão
              </TabsTrigger>
              <TabsTrigger value="most-viewed" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
                <Eye className="w-4 h-4 mr-2" />
                Mais Vistos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">Mangás em Destaque {timeFilter !== "all" && `- ${timeFilters.find(f => f.value === timeFilter)?.label}`}</h2>
                <p className="text-muted-foreground">
                  {trendingMangas.length} mangás encontrados
                </p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {trendingMangas.map((manga, index) => (
                    <div key={index} onClick={onMangaClick} className="cursor-pointer group">
                      <div className="relative">
                        <MangaCard {...manga} />
                        <div className="absolute top-2 right-2">
                          <Badge 
                            variant="secondary" 
                            className={`${getTrendColor(manga.trend)} bg-black/80 backdrop-blur-sm text-xs`}
                          >
                            {manga.trend}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-black/80 backdrop-blur-sm text-xs">
                            #{index + 1}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {trendingMangas.map((manga, index) => (
                    <div
                      key={index}
                      onClick={onMangaClick}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/40 text-sm font-medium">
                        {index + 1}
                      </div>
                      
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
                      
                      <div className="text-right space-y-1">
                        <div className={`text-sm font-medium ${getTrendColor(manga.trend)}`}>
                          {manga.trend}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {manga.views.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rising" className="space-y-6">
              <div className="text-center py-12">
                <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground mb-2">Em Ascensão</h3>
                <p className="text-muted-foreground">
                  Mangás que estão ganhando popularidade rapidamente
                </p>
              </div>
            </TabsContent>

            <TabsContent value="most-viewed" className="space-y-6">
              <div className="text-center py-12">
                <Eye className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground mb-2">Mais Vistos</h3>
                <p className="text-muted-foreground">
                  Os mangás com mais visualizações
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}