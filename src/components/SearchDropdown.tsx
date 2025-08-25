import { X } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface SearchResult {
  id: string
  type: "manga" | "author" | "recent"
  title: string
  subtitle: string
  image?: string
}

interface SearchDropdownProps {
  isVisible: boolean
  searchQuery: string
  onClose: () => void
  onResultClick: (result: SearchResult) => void
}

export function SearchDropdown({ isVisible, searchQuery, onClose, onResultClick }: SearchDropdownProps) {
  if (!isVisible) return null

  // Mock recent searches
  const recentSearches: SearchResult[] = [
    {
      id: "1",
      type: "recent",
      title: "Attack on Titan",
      subtitle: "Pesquisa recente",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=40&h=40&fit=crop"
    },
    {
      id: "2",
      type: "recent", 
      title: "One Piece",
      subtitle: "Pesquisa recente",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=40&h=40&fit=crop"
    },
    {
      id: "3",
      type: "recent",
      title: "Naruto",
      subtitle: "Pesquisa recente",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=40&h=40&fit=crop"
    }
  ]

  // Mock search results based on query
  const searchResults: SearchResult[] = searchQuery.length > 0 ? [
    {
      id: "4",
      type: "manga",
      title: "Attack on Titan",
      subtitle: "Hajime Isayama • 139 capítulos",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=40&h=40&fit=crop"
    },
    {
      id: "5",
      type: "author",
      title: "Hajime Isayama",
      subtitle: "Autor",
    },
    {
      id: "6",
      type: "manga",
      title: "Tokyo Ghoul",
      subtitle: "Sui Ishida • 143 capítulos",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=40&h=40&fit=crop"
    }
  ] : []

  const displayResults = searchQuery.length > 0 ? searchResults : recentSearches

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-2xl border border-border z-[9999] overflow-hidden backdrop-blur-sm" style={{
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 10px 20px -6px rgba(0, 0, 0, 0.5)'
    }}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium text-foreground">
          {searchQuery.length > 0 ? 'Resultados da busca' : 'Pesquisas recentes'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 rounded-full hover:bg-muted/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="max-h-96">
        <div className="p-2">
          {displayResults.length > 0 ? (
            displayResults.map((result) => (
              <div
                key={result.id}
                onClick={() => onResultClick(result)}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors group"
              >
                {result.image ? (
                  <ImageWithFallback
                    src={result.image}
                    alt={result.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate group-hover:text-green-400 transition-colors">
                    {result.title}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {result.subtitle}
                  </p>
                </div>

                {result.type === "recent" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-muted/30"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchQuery.length > 0 ? 'Nenhum resultado encontrado' : 'Nenhuma pesquisa recente'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {searchQuery.length === 0 && recentSearches.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            Limpar pesquisas recentes
          </Button>
        </div>
      )}
    </div>
  )
}