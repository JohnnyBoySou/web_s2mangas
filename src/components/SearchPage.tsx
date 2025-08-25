import { useState, useEffect } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, Filter, X } from "lucide-react"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { toast } from "sonner@2.0.3"

interface SearchPageProps {
  onCategoryClick?: (category: string) => void
  onMangaClick?: () => void
  onUserClick?: (userId: string) => void
  onCollectionClick?: (collection: any) => void
  initialCategory?: string
}

export function SearchPage({ 
  onCategoryClick, 
  onMangaClick, 
  onUserClick, 
  onCollectionClick, 
  initialCategory = ""
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
      setIsSearching(true)
      toast.info(`Explorando mangás de ${initialCategory}`, {
        description: "Mostrando todos os mangás desta categoria."
      })
    }
  }, [initialCategory])

  const categories = [
    {
      name: "Ação",
      gradient: "from-red-600 to-red-800",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"
    },
    {
      name: "Romance",
      gradient: "from-pink-500 to-pink-700",
      image: "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=100&h=100&fit=crop"
    },
    {
      name: "Aventura",
      gradient: "from-orange-500 to-orange-700",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop"
    },
    {
      name: "Comédia",
      gradient: "from-yellow-500 to-yellow-700",
      image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=100&h=100&fit=crop"
    },
    {
      name: "Drama",
      gradient: "from-purple-600 to-purple-800",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Fantasia",
      gradient: "from-indigo-500 to-indigo-700",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac0?w=100&h=100&fit=crop"
    },
    {
      name: "Shounen",
      gradient: "from-blue-600 to-blue-800",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&h=100&fit=crop"
    },
    {
      name: "Shoujo",
      gradient: "from-rose-500 to-rose-700",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop"
    },
    {
      name: "Seinen",
      gradient: "from-slate-600 to-slate-800",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=100&h=100&fit=crop"
    },
    {
      name: "Horror",
      gradient: "from-gray-800 to-black",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c86a?w=100&h=100&fit=crop"
    },
    {
      name: "Slice of Life",
      gradient: "from-green-500 to-green-700",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=100&h=100&fit=crop"
    },
    {
      name: "Esportes",
      gradient: "from-emerald-600 to-emerald-800",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop"
    },
    {
      name: "Histórico",
      gradient: "from-amber-600 to-amber-800",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Sci-Fi",
      gradient: "from-cyan-600 to-cyan-800",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=100&h=100&fit=crop"
    },
    {
      name: "Mistério",
      gradient: "from-violet-600 to-violet-800",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop"
    },
    {
      name: "Thriller",
      gradient: "from-red-800 to-red-950",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac0?w=100&h=100&fit=crop"
    },
    {
      name: "Música",
      gradient: "from-fuchsia-600 to-fuchsia-800",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    },
    {
      name: "Culinária",
      gradient: "from-orange-600 to-orange-800",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop"
    },
    {
      name: "Escolar",
      gradient: "from-sky-500 to-sky-700",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop"
    },
    {
      name: "Mecha",
      gradient: "from-zinc-600 to-zinc-800",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac0?w=100&h=100&fit=crop"
    },
    {
      name: "Militar",
      gradient: "from-green-800 to-green-950",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"
    },
    {
      name: "Sobrenatural",
      gradient: "from-purple-800 to-purple-950",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
    },
    {
      name: "Psicológico",
      gradient: "from-indigo-800 to-indigo-950",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Artístico",
      gradient: "from-teal-600 to-teal-800",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop"
    }
  ]

  // Mock search results
  const mockResults = [
    {
      id: "1",
      title: "Attack on Titan",
      author: "Hajime Isayama",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      rating: 4.9,
      category: "Ação"
    },
    {
      id: "2",
      title: "Death Note",
      author: "Tsugumi Ohba",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      rating: 4.8,
      category: "Thriller"
    },
    {
      id: "3",
      title: "Kaguya-sama: Love Is War",
      author: "Aka Akasaka",
      image: "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=300&h=400&fit=crop",
      rating: 4.7,
      category: "Romance"
    }
  ]

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setIsSearching(true)
    if (onCategoryClick) {
      onCategoryClick(categoryName)
    }
    toast.success(`Categoria "${categoryName}" selecionada!`, {
      description: "Mostrando todos os mangás desta categoria."
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsSearching(true)
      toast.info(`Buscando por "${query}"...`, {
        description: "Encontrando os melhores resultados para você."
      })
    } else {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setIsSearching(false)
    toast.info("Busca limpa", {
      description: "Voltando à página de exploração."
    })
  }

  const filteredResults = selectedCategory 
    ? mockResults.filter(manga => manga.category === selectedCategory)
    : mockResults.filter(manga => 
        manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manga.author.toLowerCase().includes(searchQuery.toLowerCase())
      )

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Search Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {selectedCategory ? `Categoria: ${selectedCategory}` : 'Buscar'}
            </h1>
            <p className="text-muted-foreground">
              {selectedCategory 
                ? `Todos os mangás de ${selectedCategory}` 
                : 'Descubra mangás por categoria ou pesquise diretamente'
              }
            </p>
          </div>
          {(selectedCategory || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar mangás, autores, coleções..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground focus:bg-muted/30 rounded-full"
          />
        </div>

        {/* Active Filters */}
        {selectedCategory && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Filtros:</span>
            <Badge 
              variant="secondary" 
              className="bg-green-500/20 text-green-400 border-green-500/30"
            >
              {selectedCategory}
              <X 
                className="h-3 w-3 ml-2 cursor-pointer" 
                onClick={() => {
                  setSelectedCategory("")
                  setIsSearching(false)
                }}
              />
            </Badge>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-6">
        <div className="py-6">
          {isSearching ? (
            // Search Results
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedCategory 
                    ? `Mangás de ${selectedCategory} (${filteredResults.length})` 
                    : `Resultados para "${searchQuery}" (${filteredResults.length})`
                  }
                </h2>
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {filteredResults.map((manga) => (
                    <div
                      key={manga.id}
                      onClick={onMangaClick}
                      className="group cursor-pointer"
                    >
                      <div className="bg-muted/20 rounded-xl p-4 hover:bg-muted/30 transition-colors">
                        <div className="aspect-[3/4] mb-3 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={manga.image}
                            alt={manga.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="font-medium text-foreground truncate group-hover:text-green-400">
                          {manga.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">{manga.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-yellow-400">⭐ {manga.rating}</span>
                          <Badge variant="outline" className="text-xs">
                            {manga.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar sua busca ou explorar outras categorias
                  </p>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Categories Section */}
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Navegar por todas as categorias</h2>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${category.gradient} p-4 transition-all hover:scale-[1.02] hover:shadow-lg aspect-square min-h-[120px] flex flex-col justify-between`}
                    >
                      {/* Category Name */}
                      <div className="relative z-10">
                        <h3 className="font-bold text-white text-lg leading-tight">
                          {category.name}
                        </h3>
                      </div>
                      
                      {/* Background Image */}
                      <div className="absolute -bottom-2 -right-2 opacity-60 group-hover:opacity-80 transition-opacity rotate-12">
                        <ImageWithFallback
                          src={category.image}
                          alt={category.name}
                          className="w-16 h-16 rounded-lg object-cover shadow-lg"
                        />
                      </div>

                      {/* Overlay for better text readability */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Popular Searches */}
              <section className="mt-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Buscas populares</h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "One Piece",
                    "Naruto", 
                    "Attack on Titan",
                    "Death Note",
                    "Dragon Ball",
                    "My Hero Academia",
                    "Demon Slayer", 
                    "Tokyo Ghoul",
                    "Hunter x Hunter",
                    "Fullmetal Alchemist",
                    "Bleach",
                    "Chainsaw Man"
                  ].map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="group cursor-pointer rounded-xl bg-muted/20 p-4 transition-all hover:bg-muted/30 hover:scale-[1.01]"
                    >
                      <h3 className="font-medium text-foreground group-hover:text-green-400 transition-colors">
                        {search}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Mangá</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recently Searched - Empty State */}
              <section className="mt-12 mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Pesquisas recentes</h2>
                </div>
                
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <p className="text-muted-foreground">
                    Suas pesquisas recentes aparecerão aqui
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}