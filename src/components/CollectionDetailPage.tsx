import { useState } from "react"
import { ArrowLeft, Play, Shuffle, MoreHorizontal, Heart, Share, Download, Edit, Trash2, Lock, Users, UserPlus } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { MangaCard } from "./MangaCard"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { UserSearchDialog } from "./UserSearchDialog"
import { CollaboratorsManager } from "./CollaboratorsManager"
import { Card } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

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
  createdAt: string
  collaborators?: Collaborator[]
}

interface Collaborator {
  id: string
  name: string
  username: string
  avatar?: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: string
}

interface CollectionDetailPageProps {
  collection: Collection
  onBack?: () => void
  onMangaClick?: () => void
  onEdit?: (collection?: Collection) => void
}

export function CollectionDetailPage({ collection, onBack, onMangaClick, onEdit }: CollectionDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false)

  // Mock current user
  const currentUser = {
    id: "current-user",
    name: "Usuário Atual",
    username: "usuario_atual"
  }

  // Mock collaborators data if not provided
  const mockCollaborators: Collaborator[] = collection.collaborators || [
    {
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      role: 'owner' as const,
      joinedAt: "2024-01-01"
    },
    {
      id: "2",
      name: "Ana Silva",
      username: "ana_silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: 'editor' as const,
      joinedAt: "2024-01-15"
    },
    {
      id: "3",
      name: "Carlos Santos",
      username: "carlos_santos", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: 'viewer' as const,
      joinedAt: "2024-02-01"
    }
  ]

  const handleAddCollaborator = (user: any, role: 'viewer' | 'editor') => {
    // In a real app, this would make an API call
    console.log("Adding collaborator:", user, role)
  }

  const handleRoleChange = (collaboratorId: string, newRole: 'editor' | 'viewer') => {
    // In a real app, this would make an API call
    console.log("Changing role:", collaboratorId, newRole)
  }

  const handleRemoveCollaborator = (collaboratorId: string) => {
    // In a real app, this would make an API call
    console.log("Removing collaborator:", collaboratorId)
  }

  // Mock data para mangás na coleção
  const collectionMangas = [
    {
      title: "Attack on Titan",
      author: "Hajime Isayama",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 139,
      rating: 4.9
    },
    {
      title: "One Piece",
      author: "Eiichiro Oda",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 1100,
      rating: 4.8
    },
    {
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=400&h=600&fit=crop",
      chapters: 205,
      rating: 4.7
    },
    {
      title: "Naruto",
      author: "Masashi Kishimoto",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
      chapters: 700,
      rating: 4.6
    },
    {
      title: "My Hero Academia",
      author: "Kohei Horikoshi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      chapters: 400,
      rating: 4.5
    },
    {
      title: "Death Note",
      author: "Tsugumi Ohba",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      chapters: 108,
      rating: 4.8
    }
  ]

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card z-10" />
        <div className={`h-80 bg-gradient-to-br ${collection.gradient} relative`}>
          {(collection.cover || collection.coverUrl) && (
            <ImageWithFallback
              src={collection.cover || collection.coverUrl || ""}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 rounded-full bg-black/50 p-0 hover:bg-black/70 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-end gap-6">
            {/* Collection Cover */}
            <div className="w-52 h-52 rounded-lg overflow-hidden shadow-2xl shrink-0">
              {(collection.cover || collection.coverUrl) ? (
                <ImageWithFallback
                  src={collection.cover || collection.coverUrl || ""}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${collection.gradient} flex items-center justify-center`}>
                  <div className="text-6xl text-white">📚</div>
                </div>
              )}
            </div>

            {/* Collection Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Coleção</span>
                {collection.isPublic ? (
                  <Users className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </div>
              <h1 className="text-5xl font-bold mb-4">{collection.name}</h1>
              {collection.description && (
                <p className="text-lg text-white/80 mb-4 max-w-2xl">{collection.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span className="font-medium text-white">{collection.author}</span>
                <span>•</span>
                <span>{collection.mangaCount} mangás</span>
                <span>•</span>
                <span>{collection.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 bg-card">
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-green-500 p-0 hover:scale-105 hover:bg-green-400 text-black"
          >
            <Play className="h-6 w-6" fill="currentColor" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
          >
            <Shuffle className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsLiked(!isLiked)}
            className="h-12 w-12 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
          >
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-green-500 text-green-500' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
          >
            <Download className="h-6 w-6" />
          </Button>
          
          <div className="ml-auto flex gap-2">
            {collection.isOwner && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(collection)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-12 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
            >
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <ScrollArea className="flex-1 px-6">
        <div className="pb-6">
          <Tabs defaultValue="mangas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/20">
              <TabsTrigger value="mangas" className="data-[state=active]:bg-[var(--accent-primary)] data-[state=active]:text-white">
                Mangás ({collectionMangas.length})
              </TabsTrigger>
              <TabsTrigger value="collaborators" className="data-[state=active]:bg-[var(--accent-primary)] data-[state=active]:text-white">
                Colaboradores ({mockCollaborators.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mangas" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {collectionMangas.map((manga, index) => (
                  <div key={index} onClick={onMangaClick} className="cursor-pointer">
                    <MangaCard {...manga} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="collaborators" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground">Pessoas com acesso</h3>
                  <p className="text-sm text-muted-foreground">
                    Gerencie quem pode ver e editar esta coleção
                  </p>
                </div>
                
                {collection.isOwner && (
                  <UserSearchDialog
                    trigger={
                      <Button variant="outline" className="border-border hover:bg-muted/20">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar Colaborador
                      </Button>
                    }
                    onAddCollaborator={handleAddCollaborator}
                    existingCollaborators={mockCollaborators}
                  />
                )}
              </div>

              <Card className="p-6 border-border">
                <CollaboratorsManager
                  collaborators={mockCollaborators}
                  currentUserId={currentUser.id}
                  onRoleChange={handleRoleChange}
                  onRemoveCollaborator={handleRemoveCollaborator}
                  canManage={collection.isOwner}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}