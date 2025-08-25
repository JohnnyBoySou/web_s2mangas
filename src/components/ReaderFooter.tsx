import { Play, Pause, SkipBack, SkipForward, Volume2, Bookmark, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function ReaderFooter() {
  return (
    <footer className="px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Current Reading */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=64&h=64&fit=crop"
            alt="Current manga"
            className="h-14 w-11 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <h4 className="truncate text-sm font-medium text-foreground">Attack on Titan</h4>
            <p className="truncate text-xs text-muted-foreground">Hajime Isayama • Capítulo 139</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0 rounded-full hover:bg-muted/20 border-0">
            <Heart className="h-4 w-4 text-green-500" fill="currentColor" />
          </Button>
        </div>

        {/* Reading Controls */}
        <div className="flex flex-col items-center gap-2 px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-muted/20 border-0">
              <SkipBack className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button size="sm" className="h-8 w-8 rounded-full bg-white p-0 hover:scale-105 text-black hover:bg-gray-200">
              <Play className="h-4 w-4" fill="currentColor" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-muted/20 border-0">
              <SkipForward className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
          </div>
          
          <div className="flex w-96 items-center gap-2 text-xs text-muted-foreground">
            <span>1:42</span>
            <Slider
              defaultValue={[25]}
              max={100}
              step={1}
              className="flex-1"
            />
            <span>5:32</span>
          </div>
        </div>

        {/* Volume and Options */}
        <div className="flex items-center gap-2 justify-end flex-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-muted/20 border-0">
            <Bookmark className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-muted/20 border-0">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Button>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}