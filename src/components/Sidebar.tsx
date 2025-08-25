import { useState } from "react"
import { Home, Search, Library, Heart, Plus, BookOpen, Star, TrendingUp, Clock, FolderOpen, PanelLeftClose, PanelLeftOpen, Settings, Music, MoreHorizontal, ChevronDown, List, Grid, Grid3X3, ArrowUpDown, Image } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface SidebarProps {
  onNavigate?: (view: string) => void
  currentView?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  onCollectionClick?: (collection: any) => void
}

export function Sidebar({ onNavigate, currentView, isCollapsed = false, onToggleCollapse, onCollectionClick }: SidebarProps) {
  const [collectionsSort, setCollectionsSort] = useState("recentes")
  const [collectionsView, setCollectionsView] = useState("list")

  const mainNavItems = [
    { icon: Home, label: "Início", view: "home" },
    { icon: Search, label: "Buscar", view: "search" },
    { icon: Library, label: "Sua Biblioteca", view: "library" },
  ]

  const libraryItems = [
    { icon: Plus, label: "Criar Coleção", view: "create-collection" },
    { icon: Heart, label: "Mangás Curtidos", view: "liked" },
    { icon: FolderOpen, label: "Suas Coleções", view: "collections" },
    { icon: Music, label: "Playlists", view: "playlists" },
    { icon: Settings, label: "Configurações", view: "settings" },
  ]

  const discoverItems = [
    { icon: BookOpen, label: "Mangás", view: "mangas" },
    { icon: Star, label: "Autores", view: "authors" },
    { icon: TrendingUp, label: "Em Alta", view: "trending" },
    { icon: Clock, label: "Lidos Recentemente", view: "recent" },
    { icon: Image, label: "Wallpapers", view: "wallpapers" },
  ]

  const collections = [
    {
      name: "Ação Favoritos",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      color: "from-red-600 to-orange-600",
      type: "collection"
    },
    {
      name: "Romance Shojo",
      image: "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=100&h=100&fit=crop",
      color: "from-pink-500 to-rose-500",
      type: "collection"
    },
    {
      name: "Seinen Clássicos",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100&h=100&fit=crop",
      color: "from-gray-700 to-gray-900",
      type: "collection"
    },
    {
      name: "Aventura Épica",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&h=100&fit=crop",
      color: "from-blue-600 to-cyan-600",
      type: "collection"
    },
    {
      name: "Comédia Slice of Life",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=100&h=100&fit=crop",
      color: "from-yellow-500 to-orange-500",
      type: "collection"
    },
    {
      name: "Ação Épica • Batalhas",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      color: "from-purple-600 to-indigo-600",
      type: "playlist"
    },
    {
      name: "Romance Shoujo • Doces",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      color: "from-pink-500 to-rose-500",
      type: "playlist"
    }
  ]

  const sortOptions = [
    { value: "recentes", label: "Recentes" },
    { value: "adicionado", label: "Adicionado recentemente" },
    { value: "alfabetica", label: "Ordem alfabética" },
    { value: "criador", label: "Criador" },
    { value: "personalizada", label: "Ordem personalizada" }
  ]

  const viewOptions = [
    { value: "list", icon: List, label: "Lista" },
    { value: "compact", icon: Grid, label: "Compacto" },
    { value: "grid", icon: Grid3X3, label: "Grade" }
  ]

  const NavButton = ({ item, isMain = false }: { item: any, isMain?: boolean }) => {
    const buttonClass = `w-full justify-start gap-4 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-all border-0 ${
      currentView === item.view ? 'text-foreground bg-muted/30' : ''
    } ${isCollapsed ? 'justify-center px-2' : ''}`

    const iconSize = isMain ? "h-6 w-6" : "h-5 w-5"

    const button = (
      <Button
        variant="ghost"
        onClick={() => onNavigate?.(item.view)}
        className={buttonClass}
      >
        <item.icon className={iconSize} />
        {!isCollapsed && <span className={isMain ? "" : "text-sm"}>{item.label}</span>}
      </Button>
    )

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover text-popover-foreground border-border">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  }

  const CollectionItem = ({ collection }: { collection: any }) => {
    if (isCollapsed) return null

    const handleCollectionClick = () => {
      if (collection.type === "collection" && onCollectionClick) {
        onCollectionClick(collection)
      } else if (collection.type === "playlist") {
        // Navigate to playlists page for playlists
        onNavigate?.("playlists")
      }
    }

    if (collectionsView === "list") {
      return (
        <Button
          variant="ghost"
          onClick={handleCollectionClick}
          className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-all border-0 h-auto gap-3"
        >
          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
            {collection.image ? (
              <ImageWithFallback
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${collection.color} flex items-center justify-center`}>
                {collection.type === "playlist" ? (
                  <Music className="h-4 w-4 text-white/80" />
                ) : (
                  <BookOpen className="h-4 w-4 text-white/80" />
                )}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="truncate">{collection.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{collection.type}</p>
          </div>
        </Button>
      )
    }

    if (collectionsView === "compact") {
      return (
        <Button
          variant="ghost"
          onClick={handleCollectionClick}
          className="w-full justify-start px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-all border-0 gap-2"
        >
          <div className="w-8 h-8 rounded overflow-hidden shrink-0">
            {collection.image ? (
              <ImageWithFallback
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${collection.color} flex items-center justify-center`}>
                {collection.type === "playlist" ? (
                  <Music className="h-3 w-3 text-white/80" />
                ) : (
                  <BookOpen className="h-3 w-3 text-white/80" />
                )}
              </div>
            )}
          </div>
          <span className="truncate">{collection.name}</span>
        </Button>
      )
    }

    // Grid view
    return (
      <div 
        onClick={handleCollectionClick}
        className="group cursor-pointer rounded-lg bg-muted/20 p-3 transition-all hover:bg-muted/30"
      >
        <div className="aspect-square w-full rounded-lg overflow-hidden mb-2">
          {collection.image ? (
            <ImageWithFallback
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${collection.color} flex items-center justify-center`}>
              {collection.type === "playlist" ? (
                <Music className="h-6 w-6 text-white/80" />
              ) : (
                <BookOpen className="h-6 w-6 text-white/80" />
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{collection.name}</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with Logo and Collapse Button */}
      <div className={`flex items-center gap-2 px-6 py-6 ${isCollapsed ? 'px-3 justify-center' : ''}`}>
        {!isCollapsed && (
          <>
            <BookOpen className="h-8 w-8 text-green-500" />
            <h1 className="text-xl font-bold text-foreground">MangaStream</h1>
          </>
        )}
        {isCollapsed && <BookOpen className="h-8 w-8 text-green-500" />}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={`h-8 w-8 p-0 rounded-full hover:bg-muted/20 ml-auto ${isCollapsed ? 'ml-0' : ''}`}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Main Navigation */}
      <nav className={`px-6 ${isCollapsed ? 'px-3' : ''}`}>
        <ul className="space-y-1">
          {mainNavItems.map((item, index) => (
            <li key={index}>
              <NavButton item={item} isMain={true} />
            </li>
          ))}
        </ul>
        
        {/* Library Items */}
        <div className="mt-6">
          <ul className="space-y-1">
            {libraryItems.map((item, index) => (
              <li key={index}>
                <NavButton item={item} />
              </li>
            ))}
          </ul>
        </div>

        {/* Discover Items */}
        {!isCollapsed && (
          <div className="mt-6">
            <ul className="space-y-1">
              {discoverItems.map((item, index) => (
                <li key={index}>
                  <NavButton item={item} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Collections Section - Only show when not collapsed */}
      {!isCollapsed && (
        <div className="mt-6 flex-1 flex flex-col min-h-0">
          {/* Collections Header with Controls */}
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Suas Coleções</h3>
              <div className="flex items-center gap-1">
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-medium text-muted-foreground">Classificar por</p>
                    </div>
                    <DropdownMenuSeparator />
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setCollectionsSort(option.value)}
                        className={`cursor-pointer ${collectionsSort === option.value ? 'bg-muted' : ''}`}
                      >
                        {option.label}
                        {collectionsSort === option.value && (
                          <span className="ml-auto text-green-500">✓</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
                      {(() => {
                        const viewOption = viewOptions.find(v => v.value === collectionsView)
                        if (viewOption?.icon) {
                          const IconComponent = viewOption.icon
                          return <IconComponent className="h-3 w-3" />
                        }
                        return null
                      })()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36 bg-popover border-border">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-medium text-muted-foreground">Ver como</p>
                    </div>
                    <DropdownMenuSeparator />
                    {viewOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setCollectionsView(option.value)}
                        className={`cursor-pointer ${collectionsView === option.value ? 'bg-muted' : ''}`}
                      >
                        <option.icon className="h-4 w-4 mr-2" />
                        {option.label}
                        {collectionsView === option.value && (
                          <span className="ml-auto text-green-500">✓</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Collections List */}
          <ScrollArea className="flex-1 px-6">
            <div className={`space-y-1 ${collectionsView === "grid" ? "grid grid-cols-2 gap-3 space-y-0" : ""}`}>
              {collections.map((collection, index) => (
                <div key={index}>
                  <CollectionItem collection={collection} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}