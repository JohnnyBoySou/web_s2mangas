import { useState, useRef, useEffect } from "react"
import { Search, User, Bell, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { SearchDropdown } from "./SearchDropdown"

interface HeaderProps {
  onNotificationsClick?: () => void
  onProfileClick?: () => void
  onNavigateBack?: () => void
  onNavigateForward?: () => void
  canNavigateBack?: boolean
  canNavigateForward?: boolean
}

export function Header({ 
  onNotificationsClick, 
  onProfileClick, 
  onNavigateBack, 
  onNavigateForward,
  canNavigateBack = false,
  canNavigateForward = false 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false)
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    setShowSearchDropdown(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSearchDropdown(true)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Search submitted:", searchQuery)
      setShowSearchDropdown(false)
    }
  }

  const handleResultClick = (result: any) => {
    console.log("Search result clicked:", result)
    setShowSearchDropdown(false)
    setSearchQuery(result.title)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchDropdown(false)
  }

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNavigateBack}
            disabled={!canNavigateBack}
            className={`h-8 w-8 rounded-full bg-background/50 p-0 hover:bg-background/70 border-0 ${
              !canNavigateBack ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNavigateForward}
            disabled={!canNavigateForward}
            className={`h-8 w-8 rounded-full bg-background/50 p-0 hover:bg-background/70 border-0 ${
              !canNavigateForward ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </Button>
        </div>
        
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="O que você quer ler?"
              className={`w-96 bg-muted/20 border-border pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:bg-muted/30 rounded-full transition-all ${
                isSearchFocused ? 'ring-2 ring-green-500/50' : ''
              }`}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 h-6 w-6 p-0 -translate-y-1/2 rounded-full hover:bg-muted/30"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </Button>
            )}
          </form>

          <SearchDropdown
            isVisible={showSearchDropdown}
            searchQuery={searchQuery}
            onClose={() => setShowSearchDropdown(false)}
            onResultClick={handleResultClick}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-foreground hover:scale-105 hover:bg-muted/20 rounded-full px-4 border-0">
          Premium
        </Button>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNotificationsClick}
            className="h-8 w-8 rounded-full p-0 hover:bg-muted/20 border-0"
          >
            <Bell className="h-4 w-4 text-foreground" />
          </Button>
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full bg-red-500"
          >
            3
          </Badge>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={onProfileClick}
          className="gap-2 text-foreground hover:bg-muted/20 rounded-full px-3 border-0"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face" />
            <AvatarFallback className="bg-muted text-foreground text-xs border-0">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Otaku Reader</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}