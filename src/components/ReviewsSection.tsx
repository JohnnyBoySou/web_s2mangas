import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"
import { Label } from "./ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Star, ThumbsUp, Edit3 } from "lucide-react"
import type { Review } from "../types/schemas"

interface ReviewsSectionProps {
  mangaId: string
}

export function ReviewsSection({ mangaId }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      mangaId: mangaId,
      userId: "user1",
      userName: "Maria Oliveira",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      rating: 9.2,
      title: "Uma obra-prima do gênero",
      content: "Este mangá superou todas as minhas expectativas. A narrativa é envolvente, os personagens são complexos e a arte é simplesmente deslumbrante. Cada capítulo traz algo novo e surpreendente.",
      createdAt: "2024-01-10T14:30:00Z",
      art: 10,
      story: 9,
      characters: 9,
      worldbuilding: 8,
      pacing: 9,
      emotion: 10,
      originality: 9,
      dialogues: 8,
      likes: 24,
      isLiked: false
    },
    {
      id: "2",
      mangaId: mangaId,
      userId: "user2",
      userName: "Carlos Lima",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 8.5,
      title: "Muito bom, com alguns pontos a melhorar",
      content: "Gostei muito da história e dos personagens principais. A arte é consistente e bonita. Apenas sinto que o ritmo poderia ser um pouco mais acelerado em alguns momentos.",
      createdAt: "2024-01-08T09:15:00Z",
      art: 8,
      story: 8,
      characters: 9,
      worldbuilding: 7,
      pacing: 7,
      emotion: 8,
      originality: 8,
      dialogues: 9,
      likes: 12,
      isLiked: true
    }
  ])
  
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    title: "",
    content: "",
    art: 5,
    story: 5,
    characters: 5,
    worldbuilding: 5,
    pacing: 5,
    emotion: 5,
    originality: 5,
    dialogues: 5
  })

  const ratingCategories = [
    { key: 'art' as keyof typeof reviewForm, label: 'Arte' },
    { key: 'story' as keyof typeof reviewForm, label: 'História' },
    { key: 'characters' as keyof typeof reviewForm, label: 'Personagens' },
    { key: 'worldbuilding' as keyof typeof reviewForm, label: 'Worldbuilding' },
    { key: 'pacing' as keyof typeof reviewForm, label: 'Ritmo' },
    { key: 'emotion' as keyof typeof reviewForm, label: 'Impacto Emocional' },
    { key: 'originality' as keyof typeof reviewForm, label: 'Originalidade' },
    { key: 'dialogues' as keyof typeof reviewForm, label: 'Diálogos' }
  ]

  const calculateOverallRating = () => {
    const total = ratingCategories.reduce((sum, cat) => sum + reviewForm[cat.key], 0)
    return (total / ratingCategories.length).toFixed(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const handleSubmitReview = () => {
    if (!reviewForm.title.trim() || !reviewForm.content.trim()) return
    
    const newReview: Review = {
      id: Date.now().toString(),
      mangaId: mangaId,
      userId: "current-user",
      userName: "Você",
      rating: parseFloat(calculateOverallRating()),
      title: reviewForm.title,
      content: reviewForm.content,
      createdAt: new Date().toISOString(),
      art: reviewForm.art,
      story: reviewForm.story,
      characters: reviewForm.characters,
      worldbuilding: reviewForm.worldbuilding,
      pacing: reviewForm.pacing,
      emotion: reviewForm.emotion,
      originality: reviewForm.originality,
      dialogues: reviewForm.dialogues,
      likes: 0
    }
    
    setReviews([newReview, ...reviews])
    setReviewForm({
      title: "",
      content: "",
      art: 5,
      story: 5,
      characters: 5,
      worldbuilding: 5,
      pacing: 5,
      emotion: 5,
      originality: 5,
      dialogues: 5
    })
    setIsWritingReview(false)
  }

  const toggleLike = (reviewId: string) => {
    setReviews(prevReviews =>
      prevReviews.map(review => {
        if (review.id === reviewId) {
          const isLiked = !review.isLiked
          return {
            ...review,
            isLiked: isLiked,
            likes: isLiked ? review.likes + 1 : review.likes - 1
          }
        }
        return review
      })
    )
  }

  const RatingDisplay = ({ review }: { review: Review }) => (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {ratingCategories.map(cat => (
        <div key={cat.key} className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{cat.label}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{review[cat.key]}</span>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          <h3>Reviews ({reviews.length})</h3>
        </div>
        <Dialog open={isWritingReview} onOpenChange={setIsWritingReview}>
          <DialogTrigger asChild>
            <Button>
              <Edit3 className="w-4 h-4 mr-2" />
              Escrever Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Escrever Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="review-title">Título da Review</Label>
                <Input
                  id="review-title"
                  placeholder="Título da sua review..."
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label>Avaliações por Categoria</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {ratingCategories.map(cat => (
                    <div key={cat.key} className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-sm">{cat.label}</Label>
                        <span className="text-sm">{reviewForm[cat.key]}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={reviewForm[cat.key]}
                        onChange={(e) => setReviewForm({ 
                          ...reviewForm, 
                          [cat.key]: parseInt(e.target.value) 
                        })}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{calculateOverallRating()}</div>
                <div className="text-sm text-muted-foreground">Nota Geral</div>
              </div>
              
              <div>
                <Label htmlFor="review-content">Sua Review</Label>
                <Textarea
                  id="review-content"
                  placeholder="Escreva sua review detalhada..."
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  className="min-h-[120px] resize-none"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsWritingReview(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmitReview}>
                  Publicar Review
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reviews List */}
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{formatDate(review.createdAt)}</span>
                  </div>
                  
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-sm mb-3">{review.content}</p>
                  
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground mb-2">
                      Ver avaliações detalhadas
                    </summary>
                    <RatingDisplay review={review} />
                  </details>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-auto p-0 ${review.isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                      onClick={() => toggleLike(review.id)}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {review.likes}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}