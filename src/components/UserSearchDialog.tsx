import { useState, useEffect } from "react"
import { Search, Plus, UserCheck, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { toast } from "sonner@2.0.3"

interface User {
  id: string
  name: string
  username: string
  avatar?: string
  isFollowing?: boolean
  isCollaborator?: boolean
}

interface UserSearchDialogProps {
  trigger: React.ReactNode
  onAddCollaborator: (user: User, role: 'viewer' | 'editor') => void
  existingCollaborators?: User[]
  title?: string
  description?: string
}

export function UserSearchDialog({ 
  trigger, 
  onAddCollaborator, 
  existingCollaborators = [],
  title = "Adicionar Colaborador",
  description = "Pesquise e adicione colaboradores à sua coleção"
}: UserSearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<'viewer' | 'editor'>('viewer')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<User[]>([])

  // Mock users database
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Ana Silva",
      username: "ana_silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      isFollowing: true
    },
    {
      id: "2", 
      name: "Carlos Santos",
      username: "carlos_santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      isFollowing: false
    },
    {
      id: "3",
      name: "Maria Oliveira", 
      username: "maria_oliveira",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      isFollowing: true
    },
    {
      id: "4",
      name: "João Ferreira",
      username: "joao_ferreira",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isFollowing: false
    },
    {
      id: "5",
      name: "Lucas Costa",
      username: "lucas_costa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      isFollowing: true
    },
    {
      id: "6",
      name: "Beatriz Lima",
      username: "beatriz_lima", 
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      isFollowing: false
    }
  ]

  // Search users
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const existingIds = existingCollaborators.map(c => c.id)
      const results = mockUsers
        .filter(user => 
          !existingIds.includes(user.id) &&
          (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.username.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice(0, 6)
      
      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, existingCollaborators])

  const handleAddCollaborator = (user: User) => {
    onAddCollaborator(user, selectedRole)
    setOpen(false)
    setSearchTerm("")
    setSearchResults([])
    toast.success(`${user.name} foi adicionado como ${selectedRole === 'editor' ? 'editor' : 'visualizador'}`)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSearchTerm("")
      setSearchResults([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/20 border-border"
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nível de permissão</label>
            <Select value={selectedRole} onValueChange={(value: 'viewer' | 'editor') => setSelectedRole(value)}>
              <SelectTrigger className="bg-muted/20 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="viewer">
                  <div className="flex flex-col items-start">
                    <span>Visualizador</span>
                    <span className="text-xs text-muted-foreground">Pode ver a coleção</span>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex flex-col items-start">
                    <span>Editor</span>
                    <span className="text-xs text-muted-foreground">Pode editar e adicionar mangás</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Results */}
          <div className="space-y-2">
            {searchTerm.length >= 2 && (
              <>
                <h4 className="text-sm font-medium text-foreground">Resultados da busca</h4>
                <ScrollArea className="max-h-64">
                  <div className="space-y-2">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent-primary)]" />
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border hover:bg-muted/20 transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-muted text-muted-foreground">
                                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">@{user.username}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {user.isFollowing && (
                              <Badge variant="outline" className="text-xs">
                                <UserCheck className="h-3 w-3 mr-1" />
                                Seguindo
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              onClick={() => handleAddCollaborator(user)}
                              className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/90 text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Nenhum usuário encontrado</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}