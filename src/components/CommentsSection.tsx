import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"
import { MessageSquare, Reply, Heart } from "lucide-react"
import type { Comment } from "../types/schemas"

interface CommentsSectionProps {
  mangaId: string
}

export function CommentsSection({ mangaId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "Este mangá é incrível! A arte é simplesmente perfeita e a história me prende a cada capítulo.",
      mangaId: mangaId,
      userId: "user1",
      userName: "João Silva",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      createdAt: "2024-01-15T10:30:00Z",
      replies: [
        {
          id: "2",
          content: "Concordo! Mal posso esperar pelo próximo capítulo.",
          mangaId: mangaId,
          parentId: "1",
          userId: "user2",
          userName: "Ana Costa",
          userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          createdAt: "2024-01-15T11:00:00Z"
        }
      ]
    },
    {
      id: "3",
      content: "Os personagens são muito bem desenvolvidos. Cada um tem sua própria personalidade única.",
      mangaId: mangaId,
      userId: "user3",
      userName: "Pedro Santos",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      createdAt: "2024-01-14T16:45:00Z"
    }
  ])
  
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "agora há pouco"
    if (diffInHours < 24) return `há ${diffInHours}h`
    if (diffInHours < 48) return "ontem"
    return date.toLocaleDateString('pt-BR')
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      mangaId: mangaId,
      userId: "current-user",
      userName: "Você",
      createdAt: new Date().toISOString(),
      replies: []
    }
    
    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleAddReply = (parentId: string) => {
    if (!replyContent.trim()) return
    
    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent,
      mangaId: mangaId,
      parentId: parentId,
      userId: "current-user",
      userName: "Você",
      createdAt: new Date().toISOString()
    }
    
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          }
        }
        return comment
      })
    )
    
    setReplyContent("")
    setReplyTo(null)
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 pt-3' : 'pb-4'}`}>
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage src={comment.userAvatar} />
          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.userName}</span>
            <span className="text-muted-foreground text-sm">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="text-sm mb-2">{comment.content}</p>
          {!isReply && (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              >
                <Reply className="w-4 h-4 mr-1" />
                Responder
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
              >
                <Heart className="w-4 h-4 mr-1" />
                Curtir
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {replyTo === comment.id && (
        <div className="mt-3 ml-11">
          <div className="flex gap-2">
            <Textarea
              placeholder="Escreva uma resposta..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={() => handleAddReply(comment.id)}>
              Responder
            </Button>
          </div>
        </div>
      )}
      
      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Add Comment */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3>Comentários ({comments.reduce((total, c) => total + 1 + (c.replies?.length || 0), 0)})</h3>
        </div>
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Comentar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}