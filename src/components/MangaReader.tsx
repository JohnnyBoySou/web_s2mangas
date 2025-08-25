import { useState, useEffect } from "react"
import { ArrowLeft, Settings, ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut, Maximize, Home, BookOpen, Palette, Monitor, Sun, Moon, List, Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"

interface MangaReaderProps {
  mangaTitle: string
  chapterNumber: number
  totalChapters: number
  onBack?: () => void
  onChapterChange?: (chapter: number) => void
}

interface ReaderSettings {
  readingDirection: "ltr" | "rtl" | "vertical"
  theme: "dark" | "light" | "sepia" | "black"
  zoom: number
  pageSpacing: number
  autoAdvance: boolean
  fullscreen: boolean
  showUI: boolean
}

export function MangaReader({ 
  mangaTitle, 
  chapterNumber, 
  totalChapters, 
  onBack, 
  onChapterChange 
}: MangaReaderProps) {
  const [settings, setSettings] = useState<ReaderSettings>({
    readingDirection: "ltr",
    theme: "dark",
    zoom: 100,
    pageSpacing: 8,
    autoAdvance: false,
    fullscreen: false,
    showUI: true
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Mock pages for current chapter
  const pages = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=1200&fit=crop", 
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1606092677665-af9b18323013?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1518621012420-8ab3d0f82136?w=800&h=1200&fit=crop"
  ]

  const totalPages = pages.length

  // Theme styles
  const themeStyles = {
    dark: "bg-[#121212] text-white",
    light: "bg-white text-black", 
    sepia: "bg-[#f4f1e8] text-[#5c4b37]",
    black: "bg-black text-white"
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!settings.showUI) return
      
      switch (e.key) {
        case "ArrowLeft":
          if (settings.readingDirection === "rtl") {
            nextPage()
          } else {
            prevPage()
          }
          break
        case "ArrowRight":
          if (settings.readingDirection === "rtl") {
            prevPage()
          } else {
            nextPage()
          }
          break
        case "ArrowUp":
          if (settings.readingDirection === "vertical") {
            prevPage()
          }
          break
        case "ArrowDown":
          if (settings.readingDirection === "vertical") {
            nextPage()
          }
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
        case "s":
        case "S":
          setIsSettingsOpen(true)
          break
        case "Escape":
          if (settings.fullscreen) {
            toggleFullscreen()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [settings, currentPage])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else if (chapterNumber < totalChapters) {
      onChapterChange?.(chapterNumber + 1)
      setCurrentPage(1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (chapterNumber > 1) {
      onChapterChange?.(chapterNumber - 1)
      setCurrentPage(1) // Vai para a primeira página do capítulo anterior
    }
  }

  const nextChapter = () => {
    if (chapterNumber < totalChapters) {
      onChapterChange?.(chapterNumber + 1)
      setCurrentPage(1)
    }
  }

  const prevChapter = () => {
    if (chapterNumber > 1) {
      onChapterChange?.(chapterNumber - 1)
      setCurrentPage(1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setSettings(prev => ({ ...prev, fullscreen: true }))
    } else {
      document.exitFullscreen()
      setSettings(prev => ({ ...prev, fullscreen: false }))
    }
  }

  const toggleUI = () => {
    setSettings(prev => ({ ...prev, showUI: !prev.showUI }))
  }

  return (
    <div className={`flex h-screen overflow-hidden ${themeStyles[settings.theme]} transition-colors duration-300`}>
      {/* Top Bar */}
      {settings.showUI && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="text-white">
                <h1 className="font-medium">{mangaTitle}</h1>
                <p className="text-sm text-white/70">
                  Capítulo {chapterNumber} • Página {currentPage} de {totalPages}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleUI}
                className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
              >
                {settings.showUI ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>

              <Drawer open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-card border-border">
                  <DrawerHeader>
                    <DrawerTitle>Configurações do Reader</DrawerTitle>
                  </DrawerHeader>
                  
                  <ScrollArea className="max-h-[70vh] px-6 pb-6">
                    <div className="space-y-6">
                      {/* Reading Direction */}
                      <div className="space-y-3">
                        <Label>Direção de Leitura</Label>
                        <Select
                          value={settings.readingDirection}
                          onValueChange={(value: "ltr" | "rtl" | "vertical") =>
                            setSettings(prev => ({ ...prev, readingDirection: value }))
                          }
                        >
                          <SelectTrigger className="bg-muted/20 border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="ltr">Esquerda para Direita</SelectItem>
                            <SelectItem value="rtl">Direita para Esquerda</SelectItem>
                            <SelectItem value="vertical">Vertical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Theme */}
                      <div className="space-y-3">
                        <Label>Tema</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: "dark", label: "Escuro", icon: Moon },
                            { key: "light", label: "Claro", icon: Sun },
                            { key: "sepia", label: "Sépia", icon: Palette },
                            { key: "black", label: "Preto", icon: Monitor }
                          ].map(({ key, label, icon: Icon }) => (
                            <Button
                              key={key}
                              variant={settings.theme === key ? "default" : "outline"}
                              onClick={() => setSettings(prev => ({ ...prev, theme: key as any }))}
                              className={`justify-start gap-2 ${
                                settings.theme === key 
                                  ? "bg-green-500 text-black hover:bg-green-400" 
                                  : "border-border hover:bg-muted/20"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Zoom */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Zoom</Label>
                          <span className="text-sm text-muted-foreground">{settings.zoom}%</span>
                        </div>
                        <Slider
                          value={[settings.zoom]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, zoom: value }))}
                          min={50}
                          max={200}
                          step={10}
                          className="w-full"
                        />
                      </div>

                      {/* Page Spacing */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Espaçamento entre Páginas</Label>
                          <span className="text-sm text-muted-foreground">{settings.pageSpacing}px</span>
                        </div>
                        <Slider
                          value={[settings.pageSpacing]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, pageSpacing: value }))}
                          min={0}
                          max={32}
                          step={4}
                          className="w-full"
                        />
                      </div>

                      {/* Settings Toggles */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Avanço Automático</Label>
                          <Switch
                            checked={settings.autoAdvance}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ ...prev, autoAdvance: checked }))
                            }
                          />
                        </div>
                      </div>

                      {/* Keyboard Shortcuts */}
                      <Separator />
                      <div className="space-y-3">
                        <Label>Atalhos do Teclado</Label>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>← → : Navegar páginas</p>
                          <p>F : Tela cheia</p>
                          <p>S : Configurações</p>
                          <p>ESC : Sair da tela cheia</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="flex h-full items-center justify-center p-4">
          {settings.readingDirection === "vertical" ? (
            // Vertical Layout
            <ScrollArea className="h-full w-full max-w-4xl">
              <div 
                className="space-y-2"
                style={{ gap: `${settings.pageSpacing}px` }}
              >
                {pages.map((page, index) => (
                  <div key={index} className="flex justify-center">
                    <ImageWithFallback
                      src={page}
                      alt={`Página ${index + 1}`}
                      className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                      style={{ 
                        transform: `scale(${settings.zoom / 100})`,
                        marginBottom: `${settings.pageSpacing}px`
                      }}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            // Horizontal Layout
            <div className="relative w-full h-full flex items-center justify-center">
              <ImageWithFallback
                src={pages[currentPage - 1]}
                alt={`Página ${currentPage}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ transform: `scale(${settings.zoom / 100})` }}
              />
              
              {/* Navigation Areas */}
              <div 
                className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
                onClick={settings.readingDirection === "rtl" ? nextPage : prevPage}
              />
              <div 
                className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
                onClick={settings.readingDirection === "rtl" ? prevPage : nextPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      {settings.showUI && settings.readingDirection !== "vertical" && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevChapter}
                disabled={chapterNumber <= 1}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Cap. Anterior
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage <= 1 && chapterNumber <= 1}
                className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4 text-white">
              <span className="text-sm">
                {currentPage} / {totalPages}
              </span>
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= totalPages && chapterNumber >= totalChapters}
                className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextChapter}
                disabled={chapterNumber >= totalChapters}
                className="text-white hover:bg-white/20 rounded-full"
              >
                Próx. Cap.
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Center tap indicator */}
      {!settings.showUI && (
        <div 
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={toggleUI}
        />
      )}
    </div>
  )
}