import { useState, useEffect } from "react"
import { Sidebar } from "./components/Sidebar"
import { Header } from "./components/Header"
import { MainContent } from "./components/MainContent"
import { ReaderFooter } from "./components/ReaderFooter"
import { MangaDetailPage } from "./components/MangaDetailPage"
import { LibraryPage } from "./components/LibraryPage"
import { SearchPage } from "./components/SearchPage"
import { CollectionsPage } from "./components/CollectionsPage"
import { CreateCollectionPage } from "./components/CreateCollectionPage"
import { CollectionDetailPage } from "./components/CollectionDetailPage"
import { MangaReader } from "./components/MangaReader"
import { ProfilePage } from "./components/ProfilePage"
import { NotificationsPage } from "./components/NotificationsPage"
import { SettingsPage } from "./components/SettingsPage"
import { CategoryPage } from "./components/CategoryPage"
import { LoginPage } from "./components/LoginPage"
import { RegisterPage } from "./components/RegisterPage"
import { PlansPage } from "./components/PlansPage"
import { EditProfilePage } from "./components/EditProfilePage"
import { PlaylistsPage } from "./components/PlaylistsPage"
import { TrendingPage } from "./components/TrendingPage"
import { RecentlyReadPage } from "./components/RecentlyReadPage"
import { WallpapersPage } from "./components/WallpapersPage"
import { MangaListsPage } from "./components/MangaListsPage"
import { MangaListDetailPage } from "./components/MangaListDetailPage"
import { LandingPage } from "./components/LandingPage"
import { SettingsProvider } from "./contexts/SettingsContext"
import { UserProvider } from "./contexts/UserContext"
import { Toaster } from "./components/ui/sonner"

type ViewType = "landing" | "home" | "manga-detail" | "library" | "search" | "collections" | "create-collection" | "collection-detail" | "manga-reader" | "profile" | "notifications" | "settings" | "category" | "login" | "register" | "plans" | "edit-profile" | "playlists" | "trending" | "recent" | "wallpapers" | "manga-lists" | "manga-list-detail"

interface CurrentReading {
  mangaTitle: string
  chapterNumber: number
  totalChapters: number
}

interface NavigationHistory {
  view: ViewType
  data?: any
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("landing") // Start with landing page
  const [selectedCollection, setSelectedCollection] = useState<any>(null)
  const [selectedMangaList, setSelectedMangaList] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [currentReading, setCurrentReading] = useState<CurrentReading | null>(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Navigation history for back/forward buttons
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('mangastream-token')
    if (token) {
      setIsAuthenticated(true)
      setCurrentView("home")
    }
  }, [])

  // Add to navigation history
  const addToHistory = (view: ViewType, data?: any) => {
    const newEntry = { view, data }
    const newHistory = navigationHistory.slice(0, currentHistoryIndex + 1)
    newHistory.push(newEntry)
    setNavigationHistory(newHistory)
    setCurrentHistoryIndex(newHistory.length - 1)
  }

  // Navigate with history tracking
  const navigateWithHistory = (view: ViewType, data?: any) => {
    console.log("Navigating to:", view, "from:", currentView, "with data:", data)
    
    if (view !== currentView) {
      addToHistory(view, data)
      setCurrentView(view)
      
      // Set specific data based on view
      if (view === "search" && data?.category) {
        setSelectedCategory(data.category)
      }
      
      console.log("Navigation complete. New view:", view)
    } else {
      console.log("Already on view:", view, "- no navigation needed")
    }
  }

  const handleMangaClick = () => {
    navigateWithHistory("manga-detail")
  }

  const handleBackToHome = () => {
    navigateWithHistory("home")
  }

  const handleNavigation = (view: string) => {
    if (view === "settings") {
      navigateWithHistory("settings")
    } else if (view === "playlists") {
      navigateWithHistory("playlists")
    } else if (view === "trending") {
      navigateWithHistory("trending")
    } else if (view === "recent") {
      navigateWithHistory("recent")
    } else if (view === "wallpapers") {
      navigateWithHistory("wallpapers")
    } else if (view === "manga-lists") {
      navigateWithHistory("manga-lists")
    } else {
      navigateWithHistory(view as ViewType)
    }
  }

  const handleCategoryClick = (category: string) => {
    navigateWithHistory("search", { category })
  }

  const handleCreateCollection = () => {
    navigateWithHistory("create-collection")
  }

  const handleBackToCollections = () => {
    navigateWithHistory("collections")
  }

  const handleCollectionClick = (collection: any) => {
    setSelectedCollection(collection)
    navigateWithHistory("collection-detail", { collection })
  }

  const handleMangaListClick = (mangaList: any) => {
    setSelectedMangaList(mangaList)
    navigateWithHistory("manga-list-detail", { mangaList })
  }

  const handleBackToMangaLists = () => {
    navigateWithHistory("manga-lists")
  }

  const handleSaveCollection = (collection: any) => {
    console.log("Collection saved:", collection)
    navigateWithHistory("collections")
  }

  const handleEditCollection = (collection?: any) => {
    navigateWithHistory("create-collection", { editingCollection: collection || selectedCollection })
  }

  const handleChapterClick = (mangaTitle: string, chapterNumber: number, totalChapters: number) => {
    console.log("Chapter clicked:", { mangaTitle, chapterNumber, totalChapters })
    
    const readingData = {
      mangaTitle,
      chapterNumber,
      totalChapters
    }
    
    setCurrentReading(readingData)
    navigateWithHistory("manga-reader")
  }

  const handleBackFromReader = () => {
    navigateWithHistory("manga-detail")
    setCurrentReading(null)
  }

  const handleChapterChange = (newChapter: number) => {
    if (currentReading) {
      setCurrentReading({
        ...currentReading,
        chapterNumber: newChapter
      })
    }
  }

  const handleNotificationsClick = () => {
    navigateWithHistory("notifications")
  }

  const handleProfileClick = () => {
    navigateWithHistory("profile")
  }

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // Navigation functions
  const handleNavigateBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1
      const historyEntry = navigationHistory[newIndex]
      setCurrentHistoryIndex(newIndex)
      setCurrentView(historyEntry.view)
      
      // Restore associated data
      if (historyEntry.data) {
        if (historyEntry.view === "category") {
          setSelectedCategory(historyEntry.data.category)
        } else if (historyEntry.view === "collection-detail") {
          setSelectedCollection(historyEntry.data.collection)
        } else if (historyEntry.view === "manga-list-detail") {
          setSelectedMangaList(historyEntry.data.mangaList)
        } else if (historyEntry.view === "search" && historyEntry.data.category) {
          setSelectedCategory(historyEntry.data.category)
        }
      }
    }
  }

  const handleNavigateForward = () => {
    if (currentHistoryIndex < navigationHistory.length - 1) {
      const newIndex = currentHistoryIndex + 1
      const historyEntry = navigationHistory[newIndex]
      setCurrentHistoryIndex(newIndex)
      setCurrentView(historyEntry.view)
      
      // Restore associated data
      if (historyEntry.data) {
        if (historyEntry.view === "category") {
          setSelectedCategory(historyEntry.data.category)
        } else if (historyEntry.view === "collection-detail") {
          setSelectedCollection(historyEntry.data.collection)
        } else if (historyEntry.view === "manga-list-detail") {
          setSelectedMangaList(historyEntry.data.mangaList)
        } else if (historyEntry.view === "search" && historyEntry.data.category) {
          setSelectedCategory(historyEntry.data.category)
        }
      }
    }
  }

  // Authentication functions
  const handleLogin = (email: string, password: string) => {
    // Simulate login
    console.log("Login:", { email, password })
    localStorage.setItem('mangastream-token', 'fake-token')
    setIsAuthenticated(true)
    setCurrentView("home")
    setNavigationHistory([])
    setCurrentHistoryIndex(-1)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulate registration
    console.log("Register:", { name, email, password })
    localStorage.setItem('mangastream-token', 'fake-token')
    setIsAuthenticated(true)
    setCurrentView("home")
    setNavigationHistory([])
    setCurrentHistoryIndex(-1)
  }

  const handleLogout = () => {
    localStorage.removeItem('mangastream-token')
    setIsAuthenticated(false)
    setCurrentView("landing")
    setNavigationHistory([])
    setCurrentHistoryIndex(-1)
  }

  const handleGoToLogin = () => {
    setCurrentView("login")
  }

  const handleGoToRegister = () => {
    setCurrentView("register")
  }

  const handleGetStarted = () => {
    setCurrentView("register")
  }

  const handleGoToLanding = () => {
    setCurrentView("landing")
  }

  // Check navigation capabilities
  const canNavigateBack = currentHistoryIndex > 0
  const canNavigateForward = currentHistoryIndex < navigationHistory.length - 1

  // Render authentication views
  if (!isAuthenticated) {
    if (currentView === "landing") {
      return (
        <SettingsProvider>
          <UserProvider>
            <LandingPage 
              onGetStarted={handleGetStarted}
              onLogin={handleGoToLogin}
            />
            <Toaster />
          </UserProvider>
        </SettingsProvider>
      )
    }
    
    if (currentView === "register") {
      return (
        <SettingsProvider>
          <UserProvider>
            <RegisterPage onRegister={handleRegister} onLogin={handleGoToLogin} />
            <Toaster />
          </UserProvider>
        </SettingsProvider>
      )
    }
    
    return (
      <SettingsProvider>
        <UserProvider>
          <LoginPage 
            onLogin={handleLogin} 
            onRegister={handleGoToRegister}
            onForgotPassword={() => console.log("Forgot password")}
          />
          <Toaster />
        </UserProvider>
      </SettingsProvider>
    )
  }

  // Render different views based on current view
  const renderContent = () => {
    const headerProps = {
      onNotificationsClick: handleNotificationsClick,
      onProfileClick: handleProfileClick,
      onNavigateBack: handleNavigateBack,
      onNavigateForward: handleNavigateForward,
      canNavigateBack,
      canNavigateForward
    }

    switch (currentView) {
      case "manga-detail":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <MangaDetailPage 
                onBack={handleBackToHome}
                onChapterClick={handleChapterClick}
                onCategoryClick={handleCategoryClick}
              />
            </div>
          </>
        )
      case "library":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <LibraryPage onMangaClick={handleMangaClick} />
            </div>
          </>
        )
      case "search":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <SearchPage 
                onCategoryClick={handleCategoryClick}
                onMangaClick={handleMangaClick}
                onUserClick={(userId) => navigateWithHistory("profile")}
                onCollectionClick={handleCollectionClick}
                initialCategory={selectedCategory}
              />
            </div>
          </>
        )
      case "collections":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <CollectionsPage 
                onCreateCollection={handleCreateCollection}
                onCollectionClick={handleCollectionClick}
              />
            </div>
          </>
        )
      case "create-collection":
        const editingCollection = navigationHistory[currentHistoryIndex]?.data?.editingCollection
        const isEditing = !!editingCollection
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <CreateCollectionPage 
                onBack={handleBackToCollections}
                onSave={handleSaveCollection}
                collection={editingCollection}
                isEditing={isEditing}
              />
            </div>
          </>
        )
      case "collection-detail":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <CollectionDetailPage
                collection={selectedCollection}
                onBack={handleBackToCollections}
                onMangaClick={handleMangaClick}
                onEdit={handleEditCollection}
              />
            </div>
          </>
        )
      case "manga-list-detail":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <MangaListDetailPage
                mangaList={selectedMangaList}
                onBack={handleBackToMangaLists}
                onMangaClick={handleMangaClick}
              />
            </div>
          </>
        )
      case "manga-reader":
        console.log("Rendering manga reader with data:", currentReading)
        return (
          <div className="h-full w-full">
            {currentReading ? (
              <MangaReader
                mangaTitle={currentReading.mangaTitle}
                chapterNumber={currentReading.chapterNumber}
                totalChapters={currentReading.totalChapters}
                onBack={handleBackFromReader}
                onChapterChange={handleChapterChange}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <p>Carregando leitor...</p>
              </div>
            )}
          </div>
        )
      case "profile":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <ProfilePage 
                onCollectionClick={handleCollectionClick}
                onMangaClick={handleMangaClick}
                onEditProfile={() => navigateWithHistory("edit-profile")}
                onPlansClick={() => navigateWithHistory("plans")}
                onLogout={handleLogout}
              />
            </div>
          </>
        )
      case "edit-profile":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <EditProfilePage 
                onBack={() => navigateWithHistory("profile")}
                onSave={() => navigateWithHistory("profile")}
              />
            </div>
          </>
        )
      case "notifications":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <NotificationsPage 
                onMangaClick={handleMangaClick}
                onUserClick={(userId) => console.log("User clicked:", userId)}
              />
            </div>
          </>
        )
      case "settings":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <SettingsPage />
            </div>
          </>
        )
      case "plans":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <PlansPage onBack={() => navigateWithHistory("profile")} />
            </div>
          </>
        )
      case "playlists":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <PlaylistsPage onPlaylistClick={(id) => console.log("Playlist clicked:", id)} />
            </div>
          </>
        )
      case "category":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <CategoryPage 
                category={selectedCategory}
                onBack={() => navigateWithHistory("search")}
                onMangaClick={handleMangaClick}
              />
            </div>
          </>
        )
      case "trending":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <TrendingPage onMangaClick={handleMangaClick} />
            </div>
          </>
        )
      case "recent":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <RecentlyReadPage onBack={handleBackToHome} onMangaClick={handleMangaClick} />
            </div>
          </>
        )
      case "wallpapers":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <WallpapersPage onBack={handleBackToHome} />
            </div>
          </>
        )
      case "manga-lists":
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <MangaListsPage onMangaListClick={handleMangaListClick} />
            </div>
          </>
        )
      case "home":
      default:
        return (
          <>
            <div className="shrink-0 bg-card rounded-lg overflow-visible">
              <Header {...headerProps} />
            </div>
            <div className="flex-1 min-h-0 bg-card rounded-lg overflow-hidden">
              <MainContent 
                onMangaClick={handleMangaClick} 
                onShowAllTrending={() => navigateWithHistory("trending")}
                onShowAllRecent={() => navigateWithHistory("library")}
                onShowAllAuthors={() => navigateWithHistory("search")}
                onPlaylistClick={() => navigateWithHistory("playlists")}
                onShowAllMangaLists={() => navigateWithHistory("manga-lists")}
                onMangaListClick={handleMangaListClick}
              />
            </div>
            <div className="shrink-0 bg-card rounded-lg overflow-hidden">
              <ReaderFooter />
            </div>
          </>
        )
    }
  }

  const sidebarWidth = isSidebarCollapsed ? "w-20" : "w-80"

  return (
    <SettingsProvider>
      <UserProvider>
        <div className="h-screen bg-background text-foreground overflow-hidden">
          <div className="flex h-full p-2 gap-2">
            {/* Sidebar - Hide in reader mode */}
            {currentView !== "manga-reader" && (
              <div className={`${sidebarWidth} shrink-0 bg-card rounded-lg overflow-hidden transition-all duration-300`}>
                <Sidebar 
                  onNavigate={handleNavigation} 
                  currentView={currentView}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={handleToggleSidebar}
                  onCollectionClick={handleCollectionClick}
                />
              </div>
            )}
            
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-hidden">
              {renderContent()}
            </div>
          </div>
          <Toaster />
        </div>
      </UserProvider>
    </SettingsProvider>
  )
}