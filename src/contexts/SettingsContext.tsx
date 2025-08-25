import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeMode = 'dark' | 'light' | 'auto'
export type FontSize = 'small' | 'medium' | 'large' | 'extra-large'
export type AccentColor = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'pink'

interface SettingsContextType {
  // Theme settings
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  
  // Font settings
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  
  // Accent color
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  
  // Reading preferences
  autoMarkAsRead: boolean
  setAutoMarkAsRead: (enabled: boolean) => void
  
  // Notification preferences
  pushNotifications: boolean
  setPushNotifications: (enabled: boolean) => void
  emailNotifications: boolean
  setEmailNotifications: (enabled: boolean) => void
  
  // Privacy settings
  publicProfile: boolean
  setPublicProfile: (enabled: boolean) => void
  showReadingActivity: boolean
  setShowReadingActivity: (enabled: boolean) => void
  
  // Language
  language: string
  setLanguage: (lang: string) => void
  
  // Reset to defaults
  resetSettings: () => void
}

const defaultSettings = {
  themeMode: 'dark' as ThemeMode,
  fontSize: 'medium' as FontSize,
  accentColor: 'green' as AccentColor,
  autoMarkAsRead: true,
  pushNotifications: true,
  emailNotifications: false,
  publicProfile: true,
  showReadingActivity: true,
  language: 'pt-BR'
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultSettings.themeMode)
  const [fontSize, setFontSize] = useState<FontSize>(defaultSettings.fontSize)
  const [accentColor, setAccentColor] = useState<AccentColor>(defaultSettings.accentColor)
  const [autoMarkAsRead, setAutoMarkAsRead] = useState(defaultSettings.autoMarkAsRead)
  const [pushNotifications, setPushNotifications] = useState(defaultSettings.pushNotifications)
  const [emailNotifications, setEmailNotifications] = useState(defaultSettings.emailNotifications)
  const [publicProfile, setPublicProfile] = useState(defaultSettings.publicProfile)
  const [showReadingActivity, setShowReadingActivity] = useState(defaultSettings.showReadingActivity)
  const [language, setLanguage] = useState(defaultSettings.language)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('mangastream-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setThemeMode(parsed.themeMode || defaultSettings.themeMode)
        setFontSize(parsed.fontSize || defaultSettings.fontSize)
        setAccentColor(parsed.accentColor || defaultSettings.accentColor)
        setAutoMarkAsRead(parsed.autoMarkAsRead ?? defaultSettings.autoMarkAsRead)
        setPushNotifications(parsed.pushNotifications ?? defaultSettings.pushNotifications)
        setEmailNotifications(parsed.emailNotifications ?? defaultSettings.emailNotifications)
        setPublicProfile(parsed.publicProfile ?? defaultSettings.publicProfile)
        setShowReadingActivity(parsed.showReadingActivity ?? defaultSettings.showReadingActivity)
        setLanguage(parsed.language || defaultSettings.language)
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    } else {
      // If no saved settings, apply default theme immediately
      const root = document.documentElement
      if (defaultSettings.themeMode === 'dark') {
        root.classList.add('dark')
        root.classList.remove('light')
      } else {
        root.classList.add('light')
        root.classList.remove('dark')
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      themeMode,
      fontSize,
      accentColor,
      autoMarkAsRead,
      pushNotifications,
      emailNotifications,
      publicProfile,
      showReadingActivity,
      language
    }
    localStorage.setItem('mangastream-settings', JSON.stringify(settings))
  }, [themeMode, fontSize, accentColor, autoMarkAsRead, pushNotifications, emailNotifications, publicProfile, showReadingActivity, language])

  // Apply font size to CSS variable
  useEffect(() => {
    const fontSizeMap = {
      'small': '12px',
      'medium': '14px',
      'large': '16px',
      'extra-large': '18px'
    }
    document.documentElement.style.setProperty('--font-size', fontSizeMap[fontSize])
  }, [fontSize])

  // Apply accent color to CSS variables
  useEffect(() => {
    const accentColorMap = {
      'green': '#22c55e',
      'blue': '#3b82f6',
      'purple': '#8b5cf6',
      'red': '#ef4444',
      'orange': '#f97316',
      'pink': '#ec4899'
    }
    const color = accentColorMap[accentColor]
    document.documentElement.style.setProperty('--sidebar-primary', color)
    document.documentElement.style.setProperty('--accent-primary', color)
    
    // Set RGB values for use with opacity
    const rgbValues = {
      'green': '34, 197, 94',
      'blue': '59, 130, 246',
      'purple': '139, 92, 246',
      'red': '239, 68, 68',
      'orange': '249, 115, 22',
      'pink': '236, 72, 153'
    }
    document.documentElement.style.setProperty('--accent-primary-rgb', rgbValues[accentColor])
  }, [accentColor])

  // Apply theme mode
  useEffect(() => {
    const root = document.documentElement
    
    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const applyAutoTheme = () => {
        if (mediaQuery.matches) {
          root.classList.remove('light')
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
          root.classList.add('light')
        }
      }
      applyAutoTheme()
      mediaQuery.addEventListener('change', applyAutoTheme)
      return () => mediaQuery.removeEventListener('change', applyAutoTheme)
    } else if (themeMode === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
  }, [themeMode])

  const resetSettings = () => {
    setThemeMode(defaultSettings.themeMode)
    setFontSize(defaultSettings.fontSize)
    setAccentColor(defaultSettings.accentColor)
    setAutoMarkAsRead(defaultSettings.autoMarkAsRead)
    setPushNotifications(defaultSettings.pushNotifications)
    setEmailNotifications(defaultSettings.emailNotifications)
    setPublicProfile(defaultSettings.publicProfile)
    setShowReadingActivity(defaultSettings.showReadingActivity)
    setLanguage(defaultSettings.language)
  }

  return (
    <SettingsContext.Provider
      value={{
        themeMode,
        setThemeMode,
        fontSize,
        setFontSize,
        accentColor,
        setAccentColor,
        autoMarkAsRead,
        setAutoMarkAsRead,
        pushNotifications,
        setPushNotifications,
        emailNotifications,
        setEmailNotifications,
        publicProfile,
        setPublicProfile,
        showReadingActivity,
        setShowReadingActivity,
        language,
        setLanguage,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}