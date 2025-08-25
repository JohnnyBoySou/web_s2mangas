import { useState, useEffect } from "react"
import { ArrowLeft, Upload, X, Camera, Image as ImageIcon, Lock, Users, Link, UserPlus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { ScrollArea } from "./ui/scroll-area"
import { Card } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { UserSearchDialog } from "./UserSearchDialog"
import { CollaboratorsManager } from "./CollaboratorsManager"
import { toast } from "sonner@2.0.3"

interface CreateCollectionPageProps {
  onBack?: () => void
  onSave?: (collection: CollectionData) => void
  collection?: CollectionData | null // Para modo de edição
  isEditing?: boolean
}

interface CollectionData {
  id?: string
  name: string
  description: string
  coverType: "upload" | "url" | "gradient" | "color"
  coverImage?: string
  coverUrl?: string
  coverGradient?: string
  coverColor?: string
  isPublic: boolean
  collaborators?: Collaborator[]
}

interface Collaborator {
  id: string
  name: string
  username: string
  avatar?: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: string
}

export function CreateCollectionPage({ onBack, onSave, collection, isEditing = false }: CreateCollectionPageProps) {
  const [formData, setFormData] = useState<CollectionData>({
    name: "",
    description: "",
    coverType: "gradient",
    coverGradient: "from-purple-500 to-pink-500",
    isPublic: true,
    collaborators: []
  })

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [coverUrl, setCoverUrl] = useState("")
  const [urlError, setUrlError] = useState("")

  // Mock current user
  const currentUser = {
    id: "current-user",
    name: "Usuário Atual",
    username: "usuario_atual"
  }

  // Initialize collaborators with current user as owner
  useEffect(() => {
    if (!isEditing && !collection) {
      setFormData(prev => ({
        ...prev,
        collaborators: [{
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          role: 'owner' as const,
          joinedAt: new Date().toISOString()
        }]
      }))
    }
  }, [isEditing, collection])

  // Preencher dados se estiver editando
  useEffect(() => {
    if (isEditing && collection) {
      setFormData({
        ...collection,
        collaborators: collection.collaborators || []
      })
      if (collection.coverUrl) {
        setCoverUrl(collection.coverUrl)
      }
      if (collection.coverImage) {
        setUploadedImage(collection.coverImage)
      }
    }
  }, [isEditing, collection])

  // Collaborators functions
  const handleAddCollaborator = (user: any, role: 'viewer' | 'editor') => {
    const newCollaborator: Collaborator = {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      role: role,
      joinedAt: new Date().toISOString()
    }
    
    setFormData(prev => ({
      ...prev,
      collaborators: [...(prev.collaborators || []), newCollaborator]
    }))
  }

  const handleRoleChange = (collaboratorId: string, newRole: 'editor' | 'viewer') => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators?.map(collab =>
        collab.id === collaboratorId ? { ...collab, role: newRole } : collab
      ) || []
    }))
  }

  const handleRemoveCollaborator = (collaboratorId: string) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators?.filter(collab => collab.id !== collaboratorId) || []
    }))
  }

  const gradientOptions = [
    "from-purple-500 to-pink-500",
    "from-blue-600 to-cyan-600", 
    "from-red-600 to-orange-600",
    "from-green-600 to-teal-600",
    "from-indigo-600 to-purple-600",
    "from-yellow-500 to-orange-500",
    "from-pink-600 to-rose-600",
    "from-gray-700 to-gray-900",
    "from-emerald-600 to-lime-600",
    "from-violet-600 to-fuchsia-600",
    "from-amber-600 to-red-600",
    "from-teal-600 to-blue-600"
  ]

  const colorOptions = [
    "#8B5CF6", "#3B82F6", "#EF4444", "#10B981", 
    "#F59E0B", "#EC4899", "#6B7280", "#84CC16"
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
        setFormData(prev => ({
          ...prev,
          coverType: "upload",
          coverImage: result,
          coverUrl: undefined
        }))
        toast.success("Imagem carregada com sucesso!")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (url: string) => {
    setCoverUrl(url)
    setUrlError("")
    
    if (url.trim()) {
      // Validação básica de URL
      try {
        new URL(url)
        setFormData(prev => ({
          ...prev,
          coverType: "url",
          coverUrl: url,
          coverImage: undefined
        }))
      } catch {
        setUrlError("URL inválida")
      }
    }
  }

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Nome da coleção é obrigatório")
      return
    }

    if (formData.coverType === "url" && urlError) {
      toast.error("Corrija a URL da capa antes de salvar")
      return
    }

    const collectionData = {
      ...formData,
      id: isEditing ? collection?.id : undefined
    }

    onSave?.(collectionData)
    
    if (isEditing) {
      toast.success("Coleção atualizada com sucesso!")
    } else {
      toast.success("Coleção criada com sucesso!")
    }
  }

  const renderCoverPreview = () => {
    switch (formData.coverType) {
      case "upload":
        return uploadedImage ? (
          <ImageWithFallback
            src={uploadedImage}
            alt="Cover preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-2" />
            <span className="text-sm">Nenhuma imagem</span>
          </div>
        )
      case "url":
        return formData.coverUrl && !urlError ? (
          <ImageWithFallback
            src={formData.coverUrl}
            alt="Cover preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-2" />
            <span className="text-sm">
              {urlError ? "URL inválida" : "Digite uma URL"}
            </span>
          </div>
        )
      case "gradient":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${formData.coverGradient} flex items-center justify-center`}>
            <div className="text-4xl text-white/80">📚</div>
          </div>
        )
      case "color":
        return (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: formData.coverColor }}
          >
            <div className="text-4xl text-white/80">📚</div>
          </div>
        )
      default:
        return null
    }
  }

  const pageTitle = isEditing ? "Editar Coleção" : "Criar Coleção"
  const pageDescription = isEditing 
    ? "Atualize os dados da sua coleção de mangás" 
    : "Organize seus mangás favoritos em coleções personalizadas"
  const buttonText = isEditing ? "Salvar Alterações" : "Criar Coleção"

  return (
    <div className="flex h-full flex-col text-foreground">
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
            <p className="text-muted-foreground">{pageDescription}</p>
          </div>

          {/* Cover and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cover Section */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Capa da Coleção</Label>
              
              {/* Cover Preview */}
              <Card className="aspect-square max-w-sm mx-auto lg:mx-0 overflow-hidden border-border">
                {renderCoverPreview()}
              </Card>

              {/* Cover Type Options */}
              <RadioGroup
                value={formData.coverType}
                onValueChange={(value: "upload" | "url" | "gradient" | "color") =>
                  setFormData(prev => ({ ...prev, coverType: value }))
                }
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload" className="flex items-center gap-2 cursor-pointer">
                    <Camera className="h-4 w-4" />
                    Fazer upload de imagem
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url" className="flex items-center gap-2 cursor-pointer">
                    <Link className="h-4 w-4" />
                    URL de imagem
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gradient" id="gradient" />
                  <Label htmlFor="gradient" className="cursor-pointer">Gradiente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="color" id="color" />
                  <Label htmlFor="color" className="cursor-pointer">Cor sólida</Label>
                </div>
              </RadioGroup>

              {/* Upload Button */}
              {formData.coverType === "upload" && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("cover-upload")?.click()}
                    className="w-full border-border hover:bg-muted/20"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Escolher Imagem
                  </Button>
                </div>
              )}

              {/* URL Input */}
              {formData.coverType === "url" && (
                <div className="space-y-2">
                  <Input
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={coverUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className={`bg-muted/20 border-border text-foreground placeholder:text-muted-foreground ${
                      urlError ? "border-destructive" : ""
                    }`}
                  />
                  {urlError && (
                    <p className="text-sm text-destructive">{urlError}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Digite a URL de uma imagem para usar como capa
                  </p>
                </div>
              )}

              {/* Gradient Options */}
              {formData.coverType === "gradient" && (
                <div className="grid grid-cols-4 gap-2">
                  {gradientOptions.map((gradient, index) => (
                    <button
                      key={index}
                      onClick={() => setFormData(prev => ({ ...prev, coverGradient: gradient }))}
                      className={`aspect-square rounded-lg bg-gradient-to-br ${gradient} border-2 transition-all ${
                        formData.coverGradient === gradient ? "border-green-500 scale-110" : "border-transparent hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Color Options */}
              {formData.coverType === "color" && (
                <div className="grid grid-cols-8 gap-2">
                  {colorOptions.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setFormData(prev => ({ ...prev, coverColor: color }))}
                      className={`aspect-square rounded-lg border-2 transition-all ${
                        formData.coverColor === color ? "border-green-500 scale-110" : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Nome da Coleção*</Label>
                <Input
                  id="name"
                  placeholder="Ex: Meus Mangás Favoritos"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-muted/20 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Adicione uma descrição para sua coleção..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-muted/20 border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              {/* Privacy Settings */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Privacidade</Label>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">Pública</div>
                        <div className="text-sm text-muted-foreground">
                          Qualquer pessoa pode ver esta coleção
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Privada</div>
                        <div className="text-sm text-muted-foreground">
                          Apenas você pode ver esta coleção
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={!formData.isPublic}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: !checked }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborators Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Colaboradores</Label>
                <p className="text-sm text-muted-foreground">
                  Adicione pessoas para colaborar nesta coleção
                </p>
              </div>
              
              <UserSearchDialog
                trigger={
                  <Button variant="outline" className="border-border hover:bg-muted/20">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Colaborador
                  </Button>
                }
                onAddCollaborator={handleAddCollaborator}
                existingCollaborators={formData.collaborators || []}
              />
            </div>

            <Card className="p-6 border-border">
              <CollaboratorsManager
                collaborators={formData.collaborators || []}
                currentUserId={currentUser.id}
                onRoleChange={handleRoleChange}
                onRemoveCollaborator={handleRemoveCollaborator}
                canManage={true}
              />
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-border hover:bg-muted/20"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name.trim() || (formData.coverType === "url" && urlError)}
              className="bg-green-500 text-black hover:bg-green-400 disabled:opacity-50 disabled:hover:bg-green-500"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}