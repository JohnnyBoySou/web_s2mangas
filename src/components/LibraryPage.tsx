import { useState } from "react"
import { Search, Filter, Grid3X3, List, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { LibraryCard } from "./LibraryCard"
import { ScrollArea } from "./ui/scroll-area"

interface LibraryPageProps {
  onMangaClick?: () => void
}

export function LibraryPage({ onMangaClick }: LibraryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  
  // Dados mock para mangás curtidos
  const likedMangas = [
    {
      id: "1",
      title: "Attack on Titan",
      author: "Hajime Isayama",
      type: "liked" as const,
      gradient: "purple" as const
    },
    {
      id: "2", 
      title: "Demon Slayer",
      author: "Koyoharu Gotouge",
      type: "liked" as const,
      gradient: "orange" as const
    },
    {
      id: "3",
      title: "My Hero Academia", 
      author: "Kohei Horikoshi",
      type: "liked" as const,
      gradient: "blue" as const
    },
    {
      id: "4",
      title: "One Piece",
      author: "Eiichiro Oda", 
      type: "liked" as const,
      gradient: "red" as const
    }
  ]

  // Dados mock para mangás completos
  const completedMangas = [
    {
      id: "5",
      title: "Death Note",
      author: "Tsugumi Ohba",
      type: "completed" as const,
      totalChapters: 108,
      gradient: "purple" as const
    },
    {
      id: "6",
      title: "Fullmetal Alchemist",
      author: "Hiromu Arakawa",
      type: "completed" as const, 
      totalChapters: 108,
      gradient: "green" as const
    },
    {
      id: "7",
      title: "Tokyo Ghoul",
      author: "Sui Ishida",
      type: "completed" as const,
      totalChapters: 143,
      gradient: "red" as const
    }
  ]

  // Dados mock para mangás sendo seguidos
  const followingMangas = [
    {
      id: "8",
      title: "One Punch Man",
      author: "ONE",
      type: "following" as const,
      totalChapters: 180,
      gradient: "orange" as const
    },
    {
      id: "9",
      title: "Hunter x Hunter", 
      author: "Yoshihiro Togashi",
      type: "following" as const,
      totalChapters: 400,
      gradient: "green" as const
    },
    {
      id: "10",
      title: "Jujutsu Kaisen",
      author: "Gege Akutami",
      type: "following" as const, 
      totalChapters: 250,
      gradient: "pink" as const
    }
  ]

  // Dados mock para leitura atual
  const readingMangas = [
    {
      id: "11",
      title: "Chainsaw Man",
      author: "Tatsuki Fujimoto",
      type: "reading" as const,
      progress: 65,
      totalChapters: 97,
      currentChapter: 63,
      gradient: "red" as const
    },
    {
      id: "12",
      title: "Mob Psycho 100",
      author: "ONE", 
      type: "reading" as const,
      progress: 80,
      totalChapters: 101,
      currentChapter: 81,
      gradient: "blue" as const
    }
  ]

  const allMangas = [...likedMangas, ...completedMangas, ...followingMangas, ...readingMangas]

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Sua Biblioteca</h1>
            <p className="text-muted-foreground mt-2">
              {allMangas.length} mangás • Organizados por você
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full h-8 w-8 p-0 border-0"
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full border-0">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full h-8 w-8 p-0 border-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar na sua biblioteca..."
            className="w-full max-w-md bg-muted/20 border-border pl-10 text-foreground placeholder:text-muted-foreground focus:bg-muted/30 rounded-full"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-6">
        <Tabs defaultValue="all" className="space-y-8 pb-12">
          <TabsList className="bg-muted/20 border-border rounded-full">
            <TabsTrigger value="all" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Todos
            </TabsTrigger>
            <TabsTrigger value="reading" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Lendo
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Curtidos
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Completos
            </TabsTrigger>
            <TabsTrigger value="following" className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full">
              Seguindo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Continue Reading */}
            {readingMangas.length > 0 && (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Continue lendo</h2>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full border-0">
                    Ver todos
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {readingMangas.map((manga) => (
                    <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
                  ))}
                </div>
              </section>
            )}

            {/* Liked Mangas */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Mangás curtidos</h2>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full border-0">
                  Ver todos
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {likedMangas.slice(0, 4).map((manga) => (
                  <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
                ))}
              </div>
            </section>

            {/* Completed Mangas */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Leitura completa</h2>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-full border-0">
                  Ver todos
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {completedMangas.map((manga) => (
                  <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="reading">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {readingMangas.map((manga) => (
                <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {likedMangas.map((manga) => (
                <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {completedMangas.map((manga) => (
                <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {followingMangas.map((manga) => (
                <LibraryCard key={manga.id} {...manga} onClick={onMangaClick} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  )
}