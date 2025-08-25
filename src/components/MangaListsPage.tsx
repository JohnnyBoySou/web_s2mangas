import { useState } from "react"
import { Search, Filter, Crown, Bookmark, TrendingUp, Star, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { MangaListCard } from "./MangaListCard"

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
  tags: string[]
}

interface MangaListsPageProps {
  onMangaListClick?: (mangaList: MangaList) => void
}

export function MangaListsPage({ onMangaListClick }: MangaListsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  // Mock data para manga lists administrativas
  const mangaLists: MangaList[] = [
    {
      id: "1",
      name: "Clássicos Essenciais",
      description: "Os mangás mais importantes da história que todo otaku deveria ler",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      gradient: "from-amber-600 to-yellow-600",
      mangaCount: 50,
      category: "Clássicos",
      curatedBy: "Editor Chefe",
      featured: true,
      tags: ["Clássicos", "Essenciais", "História"]
    },
    {
      id: "2", 
      name: "Shounen de Ouro",
      description: "Os melhores mangás shounen que definiram uma geração",
      cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=300&fit=crop",
      gradient: "from-orange-600 to-red-600",
      mangaCount: 75,
      category: "Shounen",
      curatedBy: "Especialista Shounen",
      featured: true,
      tags: ["Shounen", "Ação", "Aventura"]
    },
    {
      id: "3",
      name: "Seinen Masterpieces",
      description: "Obras maduras e complexas para leitores experientes",
      cover: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop",
      gradient: "from-gray-700 to-slate-900",
      mangaCount: 40,
      category: "Seinen",
      curatedBy: "Curador Seinen",
      featured: false,
      tags: ["Seinen", "Maduro", "Psicológico"]
    },
    {
      id: "4",
      name: "Romance Perfeito",
      description: "Histórias de amor que tocam o coração",
      cover: "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=300&h=300&fit=crop",
      gradient: "from-pink-500 to-rose-500",
      mangaCount: 65,
      category: "Romance",
      curatedBy: "Expert Romance",
      featured: true,
      tags: ["Romance", "Shoujo", "Drama"]
    },
    {
      id: "5",
      name: "Horror & Suspense",
      description: "Para aqueles que gostam de histórias arrepiantes",
      cover: "https://images.unsplash.com/photo-1578662015017-6dbb0fe85208?w=300&h=300&fit=crop",
      gradient: "from-red-900 to-black",
      mangaCount: 30,
      category: "Horror",
      curatedBy: "Master do Terror",
      featured: false,
      tags: ["Horror", "Suspense", "Thriller"]
    },
    {
      id: "6",
      name: "Fantasia Épica",
      description: "Mundos mágicos e aventuras extraordinárias",
      cover: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
      gradient: "from-purple-600 to-blue-600",
      mangaCount: 55,
      category: "Fantasia",
      curatedBy: "Arquimago",
      featured: false,
      tags: ["Fantasia", "Magia", "Aventura"]
    },
    {
      id: "7",
      name: "Slice of Life Premium",
      description: "O melhor do cotidiano japonês em mangá",
      cover: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=300&h=300&fit=crop",
      gradient: "from-green-400 to-cyan-400",
      mangaCount: 45,
      category: "Slice of Life",
      curatedBy: "Life Curator",
      featured: true,
      tags: ["Slice of Life", "Comédia", "Cotidiano"]
    },
    {
      id: "8",
      name: "Esportes Champions",
      description: "Os mangás esportivos mais inspiradores",
      cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop",
      gradient: "from-blue-600 to-cyan-600",
      mangaCount: 35,
      category: "Esportes",
      curatedBy: "Coach Manga",
      featured: false,
      tags: ["Esportes", "Inspiração", "Superação"]
    },
    {
      id: "9",
      name: "Isekai Adventures",
      description: "Transportado para outro mundo - as melhores aventuras",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      gradient: "from-indigo-600 to-purple-600",
      mangaCount: 42,
      category: "Isekai",
      curatedBy: "Portal Master",
      featured: false,
      tags: ["Isekai", "Fantasia", "Aventura"]
    }
  ]

  const categories = [
    { value: "all", label: "Todas as Categorias" },
    { value: "Clássicos", label: "Clássicos" },
    { value: "Shounen", label: "Shounen" },
    { value: "Seinen", label: "Seinen" },
    { value: "Romance", label: "Romance" },
    { value: "Horror", label: "Horror" },
    { value: "Fantasia", label: "Fantasia" },
    { value: "Slice of Life", label: "Slice of Life" },
    { value: "Esportes", label: "Esportes" },
    { value: "Isekai", label: "Isekai" }
  ]

  const sortOptions = [
    { value: "featured", label: "Destaques Primeiro" },
    { value: "popular", label: "Mais Populares" },
    { value: "newest", label: "Mais Recentes" },
    { value: "mangaCount", label: "Mais Mangás" },
    { value: "alphabetic", label: "Ordem Alfabética" }
  ]

  const filteredLists = mangaLists
    .filter(list => {
      const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          list.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          list.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "all" || list.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured !== b.featured) return a.featured ? -1 : 1
          return b.mangaCount - a.mangaCount
        case "mangaCount":
          return b.mangaCount - a.mangaCount
        case "alphabetic":
          return a.name.localeCompare(b.name)
        default:
          return b.mangaCount - a.mangaCount
      }
    })

  const featuredLists = filteredLists.filter(list => list.featured)
  const regularLists = filteredLists.filter(list => !list.featured)

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
              <Crown className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Listas Oficiais</h1>
              <p className="text-muted-foreground">
                Coleções curadas por especialistas para você descobrir os melhores mangás
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar listas oficiais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground focus:bg-muted/30 rounded-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-muted/20 border-border rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-muted/20 border-border rounded-full">
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
        <div className="py-6 space-y-8">
          {/* Featured Lists */}
          {featuredLists.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <h2 className="text-2xl font-bold">Em Destaque</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {featuredLists.map((mangaList) => (
                  <MangaListCard
                    key={mangaList.id}
                    mangaList={mangaList}
                    onClick={onMangaListClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Lists */}
          {regularLists.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-green-500" />
                <h2 className="text-2xl font-bold">Todas as Listas</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {regularLists.map((mangaList) => (
                  <MangaListCard
                    key={mangaList.id}
                    mangaList={mangaList}
                    onClick={onMangaListClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredLists.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                <Crown className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Nenhuma lista encontrada</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "all" 
                  ? "Tente ajustar seus filtros ou termos de busca"
                  : "As listas oficiais estão sendo preparadas"}
              </p>
            </div>
          )}

          {/* Stats Footer */}
          <div className="flex items-center justify-center gap-8 py-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{mangaLists.length} listas disponíveis</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>{mangaLists.reduce((total, list) => total + list.mangaCount, 0)} mangás curados</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}