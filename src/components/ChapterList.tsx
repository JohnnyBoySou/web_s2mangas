import { Play, Heart, MoreHorizontal, CheckCircle, Circle, BookOpen, Calendar, Clock } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { toast } from "sonner@2.0.3"
import { useState } from "react"

interface Chapter {
  id: string
  number: number
  title: string
  releaseDate: string
  readTime: string
  isRead: boolean
  isLiked: boolean
  views: string
}

interface ChapterListProps {
  chapters: Chapter[]
  onChapterClick?: (mangaTitle: string, chapterNumber: number, totalChapters: number) => void
  mangaTitle?: string
  totalChapters?: number
}

export function ChapterList({ chapters, onChapterClick, mangaTitle, totalChapters }: ChapterListProps) {
  const [likedChapters, setLikedChapters] = useState<Set<string>>(new Set())
  const [readChapters, setReadChapters] = useState<Set<string>>(new Set())

  const handleLikeChapter = (chapterId: string, chapterTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newLikedChapters = new Set(likedChapters)
    
    if (likedChapters.has(chapterId)) {
      newLikedChapters.delete(chapterId)
      toast.info("Curtida removida")
    } else {
      newLikedChapters.add(chapterId)
      toast.success(`Capítulo "${chapterTitle}" curtido!`, {
        description: "Adicionado à sua lista de favoritos."
      })
    }
    
    setLikedChapters(newLikedChapters)
  }

  const handleMarkAsRead = (chapterId: string, chapterTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newReadChapters = new Set(readChapters)
    
    if (readChapters.has(chapterId)) {
      newReadChapters.delete(chapterId)
      toast.info("Marcado como não lido")
    } else {
      newReadChapters.add(chapterId)
      toast.success(`Capítulo "${chapterTitle}" marcado como lido!`, {
        description: "Seu progresso foi salvo."
      })
    }
    
    setReadChapters(newReadChapters)
  }

  const handleLoadMore = () => {
    toast.info("Carregando mais capítulos...", {
      description: "Buscando capítulos adicionais."
    })
  }

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Capítulos</h2>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Mais recentes primeiro
          </Button>
          <span>{chapters?.length} capítulos</span>
        </div>
      </div>

      {/* Table Header */}
      <div className="mb-4 grid grid-cols-12 gap-4 px-4 text-sm text-gray-400 uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-6">Título</div>
        <div className="col-span-2">Data</div>
        <div className="col-span-2">Visualizações</div>
        <div className="col-span-1"></div>
      </div>

      <Separator className="mb-4 bg-gray-800" />

      {/* Chapter List */}
      <div className="space-y-1">
        {chapters && chapters.length > 0 ? chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            onClick={() => {
              console.log("ChapterList: Chapter clicked", { mangaTitle, chapterNumber: chapter.number, totalChapters })
              onChapterClick?.(mangaTitle || "", chapter.number, totalChapters || chapters.length)
            }}
            className="group grid grid-cols-12 gap-4 rounded-lg px-4 py-3 text-gray-300 transition-all hover:bg-gray-800/50 cursor-pointer"
          >
            {/* Chapter Number & Play Button */}
            <div className="col-span-1 flex items-center">
              <div className="relative">
                <span className="group-hover:opacity-0 transition-opacity">
                  {chapter.number.toString().padStart(2, '0')}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log("ChapterList: Play button clicked", { mangaTitle, chapterNumber: chapter.number, totalChapters })
                    onChapterClick?.(mangaTitle || "", chapter.number, totalChapters || chapters.length)
                  }}
                  className="absolute inset-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity p-0"
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                </Button>
              </div>
            </div>

            {/* Chapter Info */}
            <div className="col-span-6 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleMarkAsRead(chapter.id, chapter.title, e)}
                  className="transition-colors hover:scale-110"
                >
                  {(chapter.isRead || readChapters.has(chapter.id)) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-600 hover:text-green-400" />
                  )}
                </button>
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`truncate font-medium ${chapter.isRead ? 'text-gray-400' : 'text-white'} group-hover:text-green-400`}>
                    Capítulo {chapter.number}
                    {chapter.title && ` - ${chapter.title}`}
                  </h3>
                  {!chapter.isRead && (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                      Novo
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{chapter.readTime} min de leitura</span>
                </div>
              </div>
            </div>

            {/* Release Date */}
            <div className="col-span-2 flex items-center text-sm">
              {chapter.releaseDate}
            </div>

            {/* Views */}
            <div className="col-span-2 flex items-center text-sm">
              {chapter.views}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex items-center justify-end gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => handleLikeChapter(chapter.id, chapter.title, e)}
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className={`h-4 w-4 ${
                  (chapter.isLiked || likedChapters.has(chapter.id)) 
                    ? 'fill-green-500 text-green-500' 
                    : 'text-gray-400 hover:text-green-400'
                }`} />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        )) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-white mb-2">Nenhum capítulo disponível</h3>
            <p className="text-gray-400">
              Os capítulos aparecerão aqui quando estiverem disponíveis.
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          onClick={handleLoadMore}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Carregar mais capítulos
        </Button>
      </div>
    </div>
  )
}