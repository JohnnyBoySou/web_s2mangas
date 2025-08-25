export interface Comment {
  id: string
  content: string
  mangaId: string
  parentId?: string | null
  userId: string
  userName: string
  userAvatar?: string
  createdAt: string
  replies?: Comment[]
}

export interface Rating {
  art: number
  story: number
  characters: number
  worldbuilding: number
  pacing: number
  emotion: number
  originality: number
  dialogues: number
  title: string
}

export interface Review {
  id: string
  mangaId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  content: string
  createdAt: string
  art: number
  story: number
  characters: number
  worldbuilding: number
  pacing: number
  emotion: number
  originality: number
  dialogues: number
  title: string
  likes: number
  isLiked?: boolean
}

export interface Wallpaper {
  id: string
  title: string
  mangaId: string
  mangaTitle: string
  imageUrl: string
  resolution: string
  downloadUrl: string
  tags: string[]
}

export interface WallpaperCollection {
  id: string
  mangaTitle: string
  mangaCover: string
  wallpapers: Wallpaper[]
}