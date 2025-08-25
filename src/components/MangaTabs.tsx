import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ChapterList } from "./ChapterList"
import { CommentsSection } from "./CommentsSection"
import { ReviewsSection } from "./ReviewsSection"
import { ScrollArea } from "./ui/scroll-area"

interface MangaTabsProps {
  onChapterClick: (mangaTitle: string, chapterNumber: number, totalChapters: number) => void
  mangaId?: string
}

export function MangaTabs({ onChapterClick, mangaId = "manga-1" }: MangaTabsProps) {
  return (
    <Tabs defaultValue="chapters" className="h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="chapters">Capítulos</TabsTrigger>
        <TabsTrigger value="comments">Comentários</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="info">Informações</TabsTrigger>
      </TabsList>
      
      <div className="flex-1 min-h-0">
        <TabsContent value="chapters" className="h-full mt-0">
          <ScrollArea className="h-full">
            <ChapterList 
              chapters={[
                {
                  id: "1",
                  number: 139,
                  title: "Rumo à Árvore Naquele Monte",
                  releaseDate: "9 Abr 2021",
                  readTime: "15",
                  isRead: false,
                  isLiked: true,
                  views: "12.5M"
                },
                {
                  id: "2", 
                  number: 138,
                  title: "Um Longo Sonho",
                  releaseDate: "9 Mar 2021",
                  readTime: "18",
                  isRead: true,
                  isLiked: false,
                  views: "11.2M"
                },
                {
                  id: "3",
                  number: 137,
                  title: "Titãs",
                  releaseDate: "9 Fev 2021", 
                  readTime: "20",
                  isRead: true,
                  isLiked: true,
                  views: "10.8M"
                },
                {
                  id: "4",
                  number: 136,
                  title: "Dedique Seu Coração",
                  releaseDate: "9 Jan 2021",
                  readTime: "17",
                  isRead: true,
                  isLiked: false,
                  views: "10.1M"
                },
                {
                  id: "5",
                  number: 135,
                  title: "Batalha dos Céus e da Terra",
                  releaseDate: "9 Dez 2020",
                  readTime: "22",
                  isRead: true,
                  isLiked: true,
                  views: "9.8M"
                },
                {
                  id: "6",
                  number: 134,
                  title: "Na Floresta dos Gigantes Árvores",
                  releaseDate: "9 Nov 2020",
                  readTime: "16",
                  isRead: true,
                  isLiked: false,
                  views: "9.3M"
                },
                {
                  id: "7",
                  number: 133,
                  title: "Pecador",
                  releaseDate: "9 Out 2020",
                  readTime: "19",
                  isRead: true,
                  isLiked: false,
                  views: "8.9M"
                },
                {
                  id: "8",
                  number: 132,
                  title: "Asas da Liberdade",
                  releaseDate: "9 Set 2020",
                  readTime: "21",
                  isRead: true,
                  isLiked: true,
                  views: "8.6M"
                }
              ]}
              onChapterClick={onChapterClick} 
              mangaTitle="Attack on Titan"
              totalChapters={139}
            />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="comments" className="h-full mt-0">
          <ScrollArea className="h-full">
            <div className="p-1">
              <CommentsSection mangaId={mangaId} />
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="reviews" className="h-full mt-0">
          <ScrollArea className="h-full">
            <div className="p-1">
              <ReviewsSection mangaId={mangaId} />
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="info" className="h-full mt-0">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-1">
              <div>
                <h4 className="mb-2">Sinopse</h4>
                <p className="text-muted-foreground">
                  Em um mundo onde a magia foi banida há séculos, um jovem descobre ter poderes místicos únicos. 
                  Agora ele deve escolher entre viver uma vida normal ou abraçar seu destino como o último mago.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2">Detalhes</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>Em andamento</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capítulos:</span>
                      <span>156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ano:</span>
                      <span>2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revista:</span>
                      <span>Weekly Shonen Jump</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-2">Gêneros</h4>
                  <div className="flex flex-wrap gap-1">
                    {["Ação", "Aventura", "Fantasia", "Sobrenatural"].map(genre => (
                      <span key={genre} className="px-2 py-1 bg-secondary rounded text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="mb-2">Autor</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span>AK</span>
                  </div>
                  <div>
                    <div>Akira Toriyama</div>
                    <div className="text-sm text-muted-foreground">Mangaká renomado</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </div>
    </Tabs>
  )
}