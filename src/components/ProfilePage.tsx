import { useState } from "react"
import { Edit, Settings, Share, MoreHorizontal, MapPin, Calendar, BookOpen, Heart, Users, Eye, Lock, Play, Crown, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface ProfilePageProps {
  onCollectionClick?: (collection: any) => void
  onMangaClick?: () => void
  onEditProfile?: () => void
  onPlansClick?: () => void
  onLogout?: () => void
}

interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  coverImage: string
  location: string
  joinDate: string
  stats: {
    mangasRead: number
    chaptersRead: number
    collections: number
    followers: number
    following: number
    favorites: number
  }
  badges: string[]
  isFollowing: boolean
  isOwnProfile: boolean
}

interface Collection {
  id: string
  name: string
  description: string
  cover: string
  gradient: string
  mangaCount: number
  isPublic: boolean
  likes: number
  views: number
}

interface RecentActivity {
  id: string
  type: "read" | "favorite" | "collection_created" | "collection_updated"
  title: string
  subtitle: string
  image: string
  date: string
}

export function ProfilePage({ onCollectionClick, onMangaClick, onEditProfile, onPlansClick, onLogout }: ProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock user profile data
  const profile: UserProfile = {
    id: "1",
    username: "otaku_reader",
    displayName: "Otaku Reader",
    bio: "Apaixonado por mangás desde sempre! 📚 Leitor voraz de Shounen, Seinen e tudo que tenha uma boa história. Sempre em busca das próximas grandes obras! #MangaLife",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop",
    location: "São Paulo, Brasil",
    joinDate: "Janeiro 2022",
    stats: {
      mangasRead: 247,
      chaptersRead: 12543,
      collections: 15,
      followers: 1234,
      following: 567,
      favorites: 89
    },
    badges: ["Leitor Voraz", "Colecionador", "Descobridor"],
    isFollowing: false,
    isOwnProfile: true
  }

  // Mock collections data
  const publicCollections: Collection[] = [
    {
      id: "1",
      name: "Mangás Épicos de Ação",
      description: "Os melhores mangás de ação que já li",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      gradient: "from-red-600 to-orange-600",
      mangaCount: 28,
      isPublic: true,
      likes: 156,
      views: 2341
    },
    {
      id: "2",
      name: "Romance Shoujo Favoritos",
      description: "Histórias de amor que tocaram meu coração",
      cover: "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=300&h=300&fit=crop",
      gradient: "from-pink-500 to-rose-500",
      mangaCount: 22,
      isPublic: true,
      likes: 89,
      views: 1567
    },
    {
      id: "3",
      name: "Seinen Masterpieces",
      description: "Obras-primas do gênero seinen",
      cover: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop",
      gradient: "from-gray-700 to-gray-900",
      mangaCount: 31,
      isPublic: true,
      likes: 234,
      views: 3456
    }
  ]

  // Mock recent activity
  const recentActivity: RecentActivity[] = [
    {
      id: "1",
      type: "read",
      title: "Attack on Titan - Capítulo 139",
      subtitle: "Terminou a leitura",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      date: "Há 2 horas"
    },
    {
      id: "2",
      type: "favorite",
      title: "One Piece",
      subtitle: "Adicionou aos favoritos",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&h=100&fit=crop",
      date: "Há 1 dia"
    },
    {
      id: "3",
      type: "collection_created",
      title: "Mangás de Aventura",
      subtitle: "Criou uma nova coleção",
      image: "",
      date: "Há 2 dias"
    },
    {
      id: "4",
      type: "read",
      title: "Demon Slayer - Capítulo 205",
      subtitle: "Terminou a leitura",
      image: "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=100&h=100&fit=crop",
      date: "Há 3 dias"
    }
  ]

  const CollectionCard = ({ collection }: { collection: Collection }) => (
    <Card 
      onClick={() => onCollectionClick?.(collection)}
      className="group cursor-pointer bg-muted/20 border-border hover:bg-muted/30 transition-all duration-300 hover:scale-[1.02]"
    >
      <CardContent className="p-0">
        <div className="relative">
          {collection.cover ? (
            <ImageWithFallback
              src={collection.cover}
              alt={collection.name}
              className="aspect-square w-full object-cover rounded-t-lg"
            />
          ) : (
            <div className={`aspect-square w-full bg-gradient-to-br ${collection.gradient} rounded-t-lg flex items-center justify-center`}>
              <div className="text-4xl text-white/80">📚</div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-t-lg transition-all" />
          <Button
            size="sm"
            className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-green-500 p-0 opacity-0 shadow-lg transition-all hover:scale-105 hover:bg-green-400 group-hover:opacity-100"
          >
            <Play className="h-4 w-4 text-black" fill="currentColor" />
          </Button>
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-foreground truncate">{collection.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{collection.mangaCount} mangás</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{collection.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{collection.views}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ActivityIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "read":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "favorite":
        return <Heart className="h-4 w-4 text-red-500" />
      case "collection_created":
      case "collection_updated":
        return <Users className="h-4 w-4 text-blue-500" />
      default:
        return <BookOpen className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Cover and Profile Header */}
      <div className="relative">
        <div className="h-60 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 relative overflow-hidden">
          <ImageWithFallback
            src={profile.coverImage}
            alt="Profile cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Profile Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-card shadow-2xl">
                <AvatarImage src={profile.avatar} alt={profile.displayName} />
                <AvatarFallback className="text-2xl bg-muted">
                  {profile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold">{profile.displayName}</h1>
                <div className="flex gap-1">
                  {profile.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <p className="text-lg text-white/80 mb-2">@{profile.username}</p>
              
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde {profile.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {profile.isOwnProfile ? (
                <>
                  <Button
                    onClick={onEditProfile}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>
                  <Button
                    onClick={onPlansClick}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Planos
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 h-10 w-10 p-0"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    size="sm"
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 h-10 w-10 p-0"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? "bg-muted text-foreground hover:bg-muted/80" : "bg-green-500 text-black hover:bg-green-400"}
                  >
                    {isFollowing ? "Seguindo" : "Seguir"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 h-10 w-10 p-0"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 h-10 w-10 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Mangás Lidos", value: profile.stats.mangasRead },
              { label: "Capítulos", value: profile.stats.chaptersRead.toLocaleString() },
              { label: "Coleções", value: profile.stats.collections },
              { label: "Seguidores", value: profile.stats.followers.toLocaleString() },
              { label: "Seguindo", value: profile.stats.following },
              { label: "Favoritos", value: profile.stats.favorites }
            ].map((stat, index) => (
              <Card key={index} className="bg-muted/20 border-border">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Sobre</h2>
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="collections" className="space-y-6">
            <TabsList className="bg-muted/20 border-border rounded-full">
              <TabsTrigger value="collections" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
                Coleções Públicas
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
                Atividade Recente
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collections" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Coleções Públicas</h2>
                <span className="text-sm text-muted-foreground">
                  {publicCollections.length} coleções
                </span>
              </div>
              
              {publicCollections.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {publicCollections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Nenhuma coleção pública</h3>
                  <p className="text-muted-foreground">
                    {profile.isOwnProfile ? "Crie e torne públicas suas coleções" : "Este usuário não possui coleções públicas"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <h2 className="text-xl font-bold">Atividade Recente</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id} className="bg-muted/20 border-border hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <ActivityIcon type={activity.type} />
                        
                        {activity.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={activity.image}
                              alt={activity.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {activity.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}