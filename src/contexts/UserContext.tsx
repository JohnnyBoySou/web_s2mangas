import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type PlanType = 'starter' | 'plus' | 'premium'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  birthDate?: string
  location?: string
  website?: string
  plan: PlanType
  joinDate: string
  mangasRead: number
  collectionsCount: number
  followersCount: number
  followingCount: number
}

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  
  // Plan management
  plan: PlanType
  setPlan: (plan: PlanType) => void
  
  // Feature access based on plan
  canCreateUnlimitedCollections: boolean
  canAccessPremiumManga: boolean
  canDownloadManga: boolean
  maxCollections: number
  hasAdvancedReaderFeatures: boolean
  hasOfflineReading: boolean
  hasPrioritySupport: boolean
  
  // User actions
  updateProfile: (updates: Partial<UserProfile>) => void
  logout: () => void
}

const defaultUser: UserProfile = {
  id: '1',
  name: 'Usuário MangaStream',
  email: 'usuario@mangastream.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
  bio: 'Apaixonado por mangás e sempre em busca de novas histórias!',
  birthDate: '1995-06-15',
  location: 'São Paulo, Brasil',
  website: '',
  plan: 'starter',
  joinDate: '2023-01-15',
  mangasRead: 142,
  collectionsCount: 8,
  followersCount: 234,
  followingCount: 89
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

  // Load user data on mount
  useEffect(() => {
    const token = localStorage.getItem('mangastream-token')
    if (token) {
      const savedUser = localStorage.getItem('mangastream-user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('Error loading user:', error)
          setUser(defaultUser)
        }
      } else {
        setUser(defaultUser)
      }
    }
  }, [])

  // Save user data whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('mangastream-user', JSON.stringify(user))
    }
  }, [user])

  const plan = user?.plan || 'starter'

  const setPlan = (newPlan: PlanType) => {
    if (user) {
      const updatedUser = { ...user, plan: newPlan }
      setUser(updatedUser)
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mangastream-token')
    localStorage.removeItem('mangastream-user')
  }

  // Feature access based on plan
  const getFeatureAccess = (currentPlan: PlanType) => {
    switch (currentPlan) {
      case 'starter':
        return {
          canCreateUnlimitedCollections: false,
          canAccessPremiumManga: false,
          canDownloadManga: false,
          maxCollections: 5,
          hasAdvancedReaderFeatures: false,
          hasOfflineReading: false,
          hasPrioritySupport: false
        }
      case 'plus':
        return {
          canCreateUnlimitedCollections: false,
          canAccessPremiumManga: true,
          canDownloadManga: true,
          maxCollections: 25,
          hasAdvancedReaderFeatures: true,
          hasOfflineReading: true,
          hasPrioritySupport: false
        }
      case 'premium':
        return {
          canCreateUnlimitedCollections: true,
          canAccessPremiumManga: true,
          canDownloadManga: true,
          maxCollections: Infinity,
          hasAdvancedReaderFeatures: true,
          hasOfflineReading: true,
          hasPrioritySupport: true
        }
      default:
        return {
          canCreateUnlimitedCollections: false,
          canAccessPremiumManga: false,
          canDownloadManga: false,
          maxCollections: 5,
          hasAdvancedReaderFeatures: false,
          hasOfflineReading: false,
          hasPrioritySupport: false
        }
    }
  }

  const featureAccess = getFeatureAccess(plan)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        plan,
        setPlan,
        updateProfile,
        logout,
        ...featureAccess
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}