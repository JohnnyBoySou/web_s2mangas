import { useState } from "react"
import { Bell, BellRing, BookOpen, Heart, MessageCircle, Users, Star, TrendingUp, Check, X, MoreHorizontal, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface NotificationsPageProps {
  onMangaClick?: () => void
  onUserClick?: (userId: string) => void
}

interface Notification {
  id: string
  type: "new_chapter" | "like" | "comment" | "follow" | "collection_like" | "manga_recommendation" | "milestone"
  title: string
  message: string
  time: string
  isRead: boolean
  avatar?: string
  image?: string
  actionable?: boolean
  data?: any
}

export function NotificationsPage({ onMangaClick, onUserClick }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_chapter",
      title: "Novo capítulo disponível!",
      message: "Attack on Titan - Capítulo 140 foi lançado",
      time: "há 5 minutos",
      isRead: false,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop",
      actionable: true,
      data: { mangaId: "1", chapterNumber: 140 }
    },
    {
      id: "2", 
      type: "like",
      title: "Sua coleção foi curtida",
      message: "MangaFan123 curtiu sua coleção 'Mangás Épicos de Ação'",
      time: "há 2 horas",
      isRead: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b775?w=50&h=50&fit=crop&crop=face",
      actionable: false,
      data: { userId: "user123", collectionId: "col1" }
    },
    {
      id: "3",
      type: "comment",
      title: "Novo comentário",
      message: "OtakuReader comentou na sua avaliação de 'One Piece'",
      time: "há 4 horas",
      isRead: false,
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=face",
      actionable: true,
      data: { userId: "user456", mangaId: "manga2" }
    },
    {
      id: "4",
      type: "follow",
      title: "Novo seguidor",
      message: "AnimeLover começou a seguir você",
      time: "há 6 horas",
      isRead: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      actionable: true,
      data: { userId: "user789" }
    },
    {
      id: "5",
      type: "new_chapter",
      title: "Novos capítulos disponíveis!",
      message: "3 mangás da sua lista de favoritos foram atualizados",
      time: "há 8 horas",
      isRead: true,
      actionable: true,
      data: { count: 3 }
    },
    {
      id: "6",
      type: "collection_like",
      title: "Coleção em alta!",
      message: "Sua coleção 'Romance Shoujo' alcançou 100 curtidas",
      time: "há 1 dia",
      isRead: true,
      actionable: false,
      data: { collectionId: "col2", milestone: 100 }
    },
    {
      id: "7",
      type: "manga_recommendation",
      title: "Recomendação personalizada",
      message: "Baseado no seu histórico, você pode gostar de 'Jujutsu Kaisen'",
      time: "há 1 dia",
      isRead: true,
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=80&h=80&fit=crop",
      actionable: true,
      data: { mangaId: "manga3" }
    },
    {
      id: "8",
      type: "milestone",
      title: "Conquista desbloqueada!",
      message: "Parabéns! Você leu 100 mangás diferentes. Ganhou o badge 'Leitor Voraz'",
      time: "há 2 dias",
      isRead: true,
      actionable: false,
      data: { achievement: "reader_100", badge: "Leitor Voraz" }
    }
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_chapter":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "like":
      case "collection_like":
        return <Heart className="h-5 w-5 text-red-500" />
      case "comment":
        return <MessageCircle className="h-5 w-5 text-green-500" />
      case "follow":
        return <Users className="h-5 w-5 text-purple-500" />
      case "manga_recommendation":
        return <TrendingUp className="h-5 w-5 text-orange-500" />
      case "milestone":
        return <Star className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }

    if (notification.actionable) {
      switch (notification.type) {
        case "new_chapter":
        case "manga_recommendation":
          onMangaClick?.()
          break
        case "follow":
        case "comment":
          onUserClick?.(notification.data?.userId)
          break
      }
    }
  }

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card 
      className={`group cursor-pointer transition-all duration-200 hover:bg-muted/30 ${
        notification.isRead ? 'bg-muted/10 border-border/50' : 'bg-muted/20 border-border'
      }`}
      onClick={() => handleNotificationClick(notification)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon or Avatar */}
          <div className="flex-shrink-0">
            {notification.avatar ? (
              <Avatar className="w-10 h-10">
                <AvatarImage src={notification.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : notification.image ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={notification.image}
                  alt="Notification"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                {getNotificationIcon(notification.type)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className={`font-medium ${notification.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {notification.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                  {!notification.isRead && (
                    <Badge variant="secondary" className="h-2 w-2 p-0 bg-blue-500 rounded-full" />
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notification.isRead && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      markAsRead(notification.id)
                    }}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(notification.id)
                  }}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BellRing className="h-8 w-8 text-foreground" />
              <div>
                <h1 className="text-3xl font-bold">Notificações</h1>
                {unreadCount > 0 && (
                  <p className="text-muted-foreground">
                    {unreadCount} {unreadCount === 1 ? 'nova notificação' : 'novas notificações'}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="border-border hover:bg-muted/20"
              >
                Marcar todas como lidas
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full h-10 w-10 p-0"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6">
        <Tabs defaultValue="all" className="py-6 space-y-6">
          <TabsList className="bg-muted/20 border-border rounded-full">
            <TabsTrigger value="all" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Todas {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Não lidas
            </TabsTrigger>
            <TabsTrigger value="mentions" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Menções
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Nenhuma notificação</h3>
                <p className="text-muted-foreground">
                  Você está em dia com tudo!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.isRead).length > 0 ? (
              <>
                {notifications
                  .filter(notification => !notification.isRead)
                  .map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Tudo em dia!</h3>
                <p className="text-muted-foreground">
                  Você não tem notificações não lidas
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mentions" className="space-y-4">
            {notifications.filter(n => n.type === "comment").length > 0 ? (
              <>
                {notifications
                  .filter(notification => notification.type === "comment")
                  .map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Nenhuma menção</h3>
                <p className="text-muted-foreground">
                  Ninguém te mencionou recentemente
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  )
}