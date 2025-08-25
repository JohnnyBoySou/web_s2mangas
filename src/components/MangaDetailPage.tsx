import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { MangaHeader } from "./MangaHeader"
import { MangaTabs } from "./MangaTabs"
import { ChapterList } from "./ChapterList"
import { ScrollArea } from "./ui/scroll-area"

interface MangaDetailPageProps {
  onBack: () => void
  onChapterClick?: (mangaTitle: string, chapterNumber: number, totalChapters: number) => void
  onCategoryClick?: (category: string) => void
}

export function MangaDetailPage({ onBack, onChapterClick, onCategoryClick }: MangaDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados mock do mangá
  const mangaData = {
    title: "Attack on Titan",
    author: "Hajime Isayama",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    status: "Concluído",
    genres: ["Ação", "Drama", "Fantasia", "Shounen", "Militar"],
    rating: 4.9,
    totalChapters: 139,
    monthlyReaders: "2.5M",
    description: "Há centenas de anos, a humanidade foi quase exterminada por gigantes humanoides chamados Titãs. Confinados dentro de três muralhas concêntricas, os humanos vivem em paz até que um Titã Colossal destrói a muralha mais externa, permitindo que outros Titãs invadam e devorem os habitantes."
  }

  // Dados mock dos capítulos
  const chaptersData = [
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
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Capítulos Populares */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-white">Capítulos Populares</h3>
                <div className="space-y-2">
                  {chaptersData.slice(0, 5).map((chapter, index) => (
                    <div 
                      key={chapter.id} 
                      onClick={() => {
                        console.log("MangaDetailPage: Chapter clicked", { title: mangaData.title, chapterNumber: chapter.number, totalChapters: mangaData.totalChapters })
                        onChapterClick?.(mangaData.title, chapter.number, mangaData.totalChapters)
                      }}
                      className="flex items-center gap-4 rounded-xl bg-gray-800/30 p-3 hover:bg-gray-800/50 transition-colors cursor-pointer group"
                    >
                      <span className="text-sm text-gray-400 w-6">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate group-hover:text-green-400">
                          Capítulo {chapter.number} - {chapter.title}
                        </h4>
                        <p className="text-sm text-gray-400">{chapter.views} visualizações</p>
                      </div>
                      <div className="text-sm text-gray-400">{chapter.readTime} min</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar com informações */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Sobre o Autor</h3>
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <h4 className="text-white font-medium">{mangaData.author}</h4>
                    <p className="text-sm text-gray-400 mt-2">
                      Mangaká japonês conhecido por criar Attack on Titan, uma das séries de mangá mais populares da década.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Estatísticas</h3>
                  <div className="bg-gray-800/30 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-white">{mangaData.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capítulos:</span>
                      <span className="text-white">{mangaData.totalChapters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avaliação:</span>
                      <span className="text-white">⭐ {mangaData.rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leitores/mês:</span>
                      <span className="text-white">{mangaData.monthlyReaders}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "chapters":
        return <ChapterList chapters={chaptersData} onChapterClick={onChapterClick} mangaTitle={mangaData.title} totalChapters={mangaData.totalChapters} />
      case "similar":
        return (
          <div className="px-6 py-6">
            <h3 className="text-xl font-bold text-white mb-4">Mangás Similares</h3>
            <p className="text-gray-400">Conteúdo em desenvolvimento...</p>
          </div>
        )
      case "reviews":
        return (
          <div className="px-6 py-6">
            <h3 className="text-xl font-bold text-white mb-4">Avaliações dos Leitores</h3>
            <p className="text-gray-400">Conteúdo em desenvolvimento...</p>
          </div>
        )
      case "info":
        return (
          <div className="px-6 py-6">
            <h3 className="text-xl font-bold text-white mb-4">Informações Detalhadas</h3>
            <p className="text-gray-400">Conteúdo em desenvolvimento...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-full flex-col text-white">
      <ScrollArea className="flex-1">
        {/* Manga Header */}
        <MangaHeader {...mangaData} onCategoryClick={onCategoryClick} />

        {/* Navigation Tabs */}
        <MangaTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollArea>
    </div>
  )
}